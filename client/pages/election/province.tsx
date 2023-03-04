import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { GoPrimitiveDot } from 'react-icons/go';
import Navbar from '../../components/Navbar';
import LiveCounterCard from '../../components/LiveCounterCard/LiveCounterCard';
import electionChannel from "../../services/pusher-events";
import { getCandidateList, getElectionList, getElectionStatus, getFormattedErrorMessage, getSortedCandidatesList, getVoterList } from '../../utils';
import _ from 'lodash';
import { SmartContract } from '../../constants';
import { setCandidateList } from '../../redux/reducers/candidateReducer';
import { toast } from 'react-toastify';

export default function Home() {
  const [electionStatus, setElectionStatus] = useState(null);
  const [electionList, setElectionList] = useState([]);
  const [candidateLists, setCandidateLists] = useState([]);
  const [currentElection, setCurrentElection] = useState<any>({});
  const loggedInAccountAddress = useSelector((state: any) => state.loggedInUserReducer.address);
  let voteCastEvent = null;

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const electionList = await getElectionList();
      const candidateLists = await getCandidateList();
      const electionStatus = getElectionStatus("Province", electionList);
      const { currentElection, electionCandidatesArray } = getSortedCandidatesList(electionList, candidateLists);

      setElectionStatus(electionStatus);
      setCandidateLists(electionCandidatesArray);
      setCurrentElection(currentElection);
      dispatch(setCandidateList(candidateLists));
      setElectionList(electionList);

      voteCastEvent = SmartContract.events.VoteCast().on("data", (event: any) => {
        const votedCandidateDetails = event.returnValues[0];
        let filterCandidates = candidateLists.map((d: any) => {
          return d.user._id === votedCandidateDetails.user._id ? { ...votedCandidateDetails } : { ...d };
        });
        const { electionCandidatesArray } = getSortedCandidatesList(electionList, filterCandidates);
        setCandidateLists(electionCandidatesArray);
      });
    })();

    return () => {
      voteCastEvent && voteCastEvent?.unsubscribe();
    }
  }, []);


  electionChannel.bind("start-election-event", () => {
    console.log("election started");
    setElectionStatus("LIVE");
  });

  electionChannel.bind("end-election-event", () => {
    console.log("election ended");
    setElectionStatus("ENDED")
  });



  const casteVote = async (_candidateID: string) => {
    try {
      const casteCandidateDetails = _.find(candidateLists, (elections) => {
        elections[1].find(((candidate: any) => candidate.user._id === _candidateID))
      });
      const isAlreadyVoted = casteCandidateDetails?.votedVoterLists?.includes(loggedInAccountAddress);
      if (isAlreadyVoted) return toast.info("You've already casted vote !");

      await SmartContract.methods.vote(_candidateID).send({ from: loggedInAccountAddress });
      toast.success("Vote caste successfully.");
    } catch (error) {
      console.log(error)
      toast.error(`Failed to caste vote !, ${getFormattedErrorMessage(error.message)}`, { toastId: 2 });
    }
  }

  return (
    <div>
      <Head>
        <title>DAPP VOTING</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      <div className='px-4 py-3 flex justify-center mt-1'>
        <div className='flex flex-column justify-between'>

          {/* province level eleciton */}
          <div className='lg:w-[1100px] w-full lg:px-2 max-[1100px]:px-1'>
            <div className='flex items-center'>
              <div className='py-1 pl-3 pr-5 mr-5 flex items-center bg-red-700 rounded-tr-full'>
                <span className='text-slate-100'>Province Election</span>
              </div>
              <span className='ml-2 text-lg font-bold text-black'>Hot Seats</span>
              <GoPrimitiveDot className={`text-4xl ml-5 mr-1 ${electionStatus === 'LIVE' && "text-danger"}`} />
              <span className='text-[17px]'>{electionStatus}</span>
            </div>
          </div>
          <div className='lg:w-[1100px] flex justify-around flex-wrap'>
            {currentElection.electionType === "Province" && electionStatus && electionList?.length > 0 && candidateLists.length > 0 && candidateLists?.map(([key, value]: any) =>
              <LiveCounterCard type={key} data={_.orderBy(value, ["votedVoterLists.length"], ["desc"])} key={key} electionStatus={electionStatus} casteVote={casteVote} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
