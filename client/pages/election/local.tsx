import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { GoPrimitiveDot } from 'react-icons/go';
import Navbar from '../../components/Navbar';
import LiveCounterCard from '../../components/LiveCounterCard/LiveCounterCard';
import electionChannel from "../../services/pusher-events";
import { getCandidateList, getElectionList, getElectionStatus, getFormattedErrorMessage, getVoterList } from '../../utils';
import _ from 'lodash';
import { SmartContract } from '../../constants';
import { getStorage } from '../../services';
import { setCandidateList } from '../../redux/reducers/candidateReducer';
import { toast } from 'react-toastify';

export default function Home() {
  const [electionStatus, setElectionStatus] = useState(null);
  const [electionList, setElectionList] = useState([]);
  const [candidateLists, setCandidateLists] = useState([]);
  const [voterLists, setVoterLists] = useState([]);
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  let voteCastEvent = null;

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const electionList = await getElectionList();
      const candidateLists = await getCandidateList();
      const voterLists = await getVoterList();
      const electionStatus = getElectionStatus("Local", electionList);

      setElectionStatus(electionStatus);
      setCandidateLists(candidateLists);
      setVoterLists(voterLists);
      dispatch(setCandidateList(candidateLists));
      setElectionList(electionList);
    })();

    return () => {
      voteCastEvent && voteCastEvent?.unsubscribe();
    }
  }, []);

  const filteredElectionsList = _.map(electionList, (election: any, i: number) => {
    if (electionList.length - 1 !== i) return;
    const allSelectedCandidates = _.filter(candidateLists, (candidate: any) => {
      return election?.selectedCandidates.includes(candidate?.user?._id);
    })
    return { ...election, selectedCandidates: allSelectedCandidates }
  });
  const currentElection = filteredElectionsList.length > 0 && filteredElectionsList?.at(-1);
  const electionCandidates = currentElection ? _.groupBy(currentElection?.selectedCandidates, (candidate) => candidate.user.municipality) : [];
  const electionCandidatesArray = electionCandidates ? Object.entries(electionCandidates) : [];

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
      const casteCandidateDetails = _.find(candidateLists, (candidate) => candidate.user._id === _candidateID);
      const isAlreadyVoted = casteCandidateDetails?.votedVoterLists?.includes(loggedInAccountAddress);
      if (isAlreadyVoted) return toast.info("You've already casted vote !");

      await SmartContract.methods.vote(_candidateID).send({ from: loggedInAccountAddress });
      toast.success("Vote caste successfully.");
    } catch (error) {
      toast.error(`Failed to caste vote !, ${getFormattedErrorMessage(error.message)}`, { toastId: 2 });
    }
  }

  return (
    <div>
      <Head>
        <title>Local Election</title>
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
                <span className='text-slate-100'>Local Election</span>
              </div>
              <span className='ml-2 text-lg font-bold text-black'>Hot Seats</span>
              <GoPrimitiveDot className={`text-4xl ml-5 mr-1 ${electionStatus === 'LIVE' && "text-danger"}`} />
              <span className='text-[17px]'>{electionStatus}</span>
            </div>
          </div>
          <div className='lg:w-[1100px] flex justify-around flex-wrap'>
            {currentElection.electionType != "Province" && currentElection.electionType != "District" && electionStatus && electionList?.length > 0 && electionCandidatesArray.length > 0 && electionCandidatesArray?.map(([key, value]: any) =>
              <LiveCounterCard type={key} data={value} key={key} electionStatus={electionStatus} casteVote={casteVote} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}