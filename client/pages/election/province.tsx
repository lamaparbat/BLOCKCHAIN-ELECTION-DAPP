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
import { getVoterDetails } from '../../utils/web3';
import { useTranslations } from 'next-intl';

export default function Home() {
  const [electionStatus, setElectionStatus] = useState(null);
  const [electionList, setElectionList] = useState([]);
  const [candidateLists, setCandidateLists] = useState([]);
  const [currentElection, setCurrentElection] = useState<any>({});
  const loggedInAccountAddress = useSelector((state: any) => state.loggedInUserReducer.address);
  let voteCastEvent = null;

  const dispatch = useDispatch();
  const provinceResultT = useTranslations("province_result");

  useEffect(() => {
    (async () => {
      const electionList = await getElectionList();
      const candidateLists = await getCandidateList();
      const { currentElection, electionCandidatesArray } = getSortedCandidatesList(electionList, candidateLists);
      const electionStatus = getElectionStatus("Province", currentElection);

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

        // setCandidateLists(electionCandidatesArray);
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
      // restrict voting before electin start and end


      const voterDetails = await getVoterDetails(loggedInAccountAddress);
      const electionAddress = electionList?.at(-1)?.startDate;
      let selectedCandidates = null;

      // vote limit count
      if (voterDetails.voteLimitCount === "3") return toast.info("You've exceed the vote limit count !");

      for (let i = 0; i < candidateLists.length; i++) {
        for (let j = 0; j < candidateLists[i][1].length; j++) {
          if (candidateLists[i][1][j].user._id === _candidateID) {
            selectedCandidates = candidateLists[i][1][j];
            break;
          }
          if (selectedCandidates) break;
        }
      }
      const isAlreadyVoted = selectedCandidates?.votedVoterLists?.includes(loggedInAccountAddress) ?? false;

      if (isAlreadyVoted) return toast.error("You've already casted vote !");

      await SmartContract.methods.vote(_candidateID, electionAddress).send({ from: loggedInAccountAddress });

      const _candidateLists = await getCandidateList();
      const { electionCandidatesArray } = getSortedCandidatesList(electionList, _candidateLists);
      setCandidateLists(electionCandidatesArray);

      toast.success("Vote caste successfully.");
    } catch (error) {
      console.log(error)
      toast.error(`Failed to caste vote !, ${getFormattedErrorMessage(error.message)}`, { toastId: 2 });
    }
  }
  console.log({ electionList })
  return (
    <div>
      <Head>
        <title>{provinceResultT("title")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      <div className='lg:px-4 sm:px-4 xsm:px-1 py-3 flex lg:justify-center sm:justify-start xsm:justify-start mt-1'>
        <div className='flex flex-column'>

          {/* province level elections */}
          <div className='lg:w-[1100px] xsm:w-full sm:px-4 xsm:px-2'>

            {/* hotlist */}
            <div className='flex lg:flex-row lg:items-center sm:items-center xsm:items-start sm:flex-row xsm:flex-col'>
              <div className='py-1 pl-3 pr-5 mr-5 flex items-center bg-red-700 rounded-tr-full'>
                <span className='text-slate-100'>{provinceResultT("title")}</span>
              </div>
              <div className='flex items-center sm:mt-1 xsm:mt-3'>
                <span className='ml-2 text-lg font-bold text-black'>{provinceResultT("hot_seats")}</span>
                <GoPrimitiveDot className={`text-4xl ml-5 mr-1 ${electionStatus === 'LIVE' && "text-danger"}`} />
                <span className='text-[17px]'>{electionStatus}</span>
              </div>
            </div>
            <div className='flex flex-wrap'>
              {currentElection.electionType === "Province" && electionStatus && electionList?.length > 0 && candidateLists.length > 0 && candidateLists?.map(([key, value]: any) =>
                <LiveCounterCard type={key} data={_.orderBy(value, ["votedVoterLists.length"], ["desc"])} key={key} electionStatus={electionStatus} casteVote={casteVote} />
              )}
            </div>

            {/* candidate lists */}
            <div className='flex flex-wrap'>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
