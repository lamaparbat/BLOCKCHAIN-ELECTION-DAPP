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
import { getVoterDetails } from '../../utils/web3';
import { useTranslations } from 'next-intl';
import { getCurrentElection } from '../../utils/common';

export default function Home() {
  const [electionStatus, setElectionStatus] = useState(null);
  const [electionList, setElectionList] = useState([]);
  const [candidateLists, setCandidateLists] = useState([]);
  const [voterLists, setVoterLists] = useState([]);
  const [currentElection, setCurrentElection] = useState<any>([]);
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  let voteCastEvent = null;

  const dispatch = useDispatch();
  const districtT = useTranslations("district_result");


  const fetchData = async () => {
    const electionList = await getElectionList();
    const candidateLists = await getCandidateList();
    const voterLists = await getVoterList();
    const electionStatus = getElectionStatus("District", electionList);
    const currentElection: any = getCurrentElection(electionList);
    const groupByCandidates = _.groupBy(currentElection?.candidates, (candidate) => candidate.user.district);

    setElectionStatus(electionStatus);
    setCurrentElection(groupByCandidates);
    setVoterLists(voterLists);
    dispatch(setCandidateList(candidateLists));
    setElectionList(electionList);
  }

  useEffect(() => {
    fetchData();

    return () => {
      voteCastEvent && voteCastEvent?.unsubscribe();
    }
  }, []);

  const districts = Object.keys(currentElection ?? {});

  electionChannel.bind("start-election-event", () => {
    console.log("election started");
    setElectionStatus("LIVE");
  });

  electionChannel.bind("end-election-event", () => {
    console.log("election ended");
    setElectionStatus("ENDED")
  });



  const casteVote = async (_candidateID: string, _position?: string) => {
    try {
      const voterDetails = await getVoterDetails(loggedInAccountAddress);
      const electionAddress = electionList?.at(-1)?.startDate;
      let selectedCandidates = null;

      // vote limit count
      if (voterDetails.voteLimitCount === "3") return toast.info("You've exceed the vote limit count !");

      // verify one time vote on same party
      let isExit = false;
      districts.forEach((district) => {
        const candidatesByPositions = _.groupBy(currentElection[district], (candidate: any) => candidate.position);
        const { mayor, deput_mayor, ward_councilor } = candidatesByPositions;
        const isMayorVoted = _.some(mayor, (candidate: any) => candidate.votedVoterLists.includes(loggedInAccountAddress) && candidate.user._id !== _candidateID);
        const isDeputyMayorVoted = _.some(deput_mayor, (candidate: any) => candidate.votedVoterLists.includes(loggedInAccountAddress) && candidate.user._id !== _candidateID);
        const isWardCouncilorVoted = _.some(ward_councilor, (candidate: any) => candidate.votedVoterLists.includes(loggedInAccountAddress) && candidate.user._id !== _candidateID);
        if ((isMayorVoted && _position === "mayor") || (isDeputyMayorVoted && _position === "deput_mayor") || (isWardCouncilorVoted && _position === "ward_councilor")) {
          isExit = true;
          return toast.info("Cannot vote multiple of same seats !")
        };
      })

      if (isExit) return;

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

      await fetchData();
      toast.success("Vote caste successfully.");
    } catch (error) {
      console.log(error)
      toast.error(`Failed to caste vote !, ${getFormattedErrorMessage(error.message)}`, { toastId: 2 });
    }
  }

  return (
    <div>
      <Head>
        <title>{districtT("title")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      <div className='lg:px-4 sm:px-4 xsm:px-1 py-3 flex lg:justify-center sm:justify-start xsm:justify-start mt-1'>
        <div className='flex flex-column w-full'>

          {/* province level eleciton */}
          <div className='lg:w-[1100px] xsm:w-full xsm:px-2'>
            <div className='flex lg:flex-row lg:items-center sm:items-center xsm:items-start sm:flex-row xsm:flex-col'>
              <div className='py-1 pl-3 pr-5 mr-5 flex items-center bg-red-700 rounded-tr-full'>
                <span className='text-slate-100'>{districtT("title")}</span>
              </div>
              <div className='flex items-center sm:mt-1 xsm:mt-3'>
                <span className='ml-2 text-lg font-bold text-black'>{districtT("hot_seats")}</span>
                <GoPrimitiveDot className={`text-4xl ml-5 mr-1 ${electionStatus === 'LIVE' && "text-danger"}`} />
                <span className='text-[17px]'>{electionStatus}</span>
              </div>
            </div>
          </div>
          <div className='lg:w-[1100px] flex justify-around flex-wrap w-full'>
            {electionStatus && districts?.length > 0 && districts?.map((district: any) =>
              <LiveCounterCard type={district} data={currentElection[district]} electionStatus={electionStatus} casteVote={casteVote} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
