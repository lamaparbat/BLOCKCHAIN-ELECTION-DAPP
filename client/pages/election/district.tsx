import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GoPrimitiveDot } from 'react-icons/go';
import Navbar from '../../components/Navbar';
import LiveCounterCard from '../../components/LiveCounterCard/LiveCounterCard';
import electionChannel from "../../services/pusher-events";
import { getElectionList, getElectionStatus, getFormattedErrorMessage } from '../../utils';
import _ from 'lodash';
import { SmartContract } from '../../constants';
import { getStorage } from '../../services';
import { toast } from 'react-toastify';
import { getVoterDetails } from '../../utils/web3';
import { useTranslations } from 'next-intl';


declare const window: any;

export default function Home() {
  const [electionStatus, setElectionStatus] = useState(null);
  const [currentElection, setCurrentElection] = useState<any>([]);
  const [candidateLists, setCandidateLists] = useState([]);
  const [electionList, setElectionList] = useState([]);
  let voteCastEvent = null;

  const districtT = useTranslations("district_result");


  const fetchData = async () => {
    const electionList = await getElectionList();
    const currentElection: any = electionList.at(-1);
    const electionStatus = getElectionStatus("District", currentElection);
    const groupByCandidates = _.groupBy(currentElection?.candidates, (candidate) => candidate.votingBooth);

    //extract candidate from district
    const _totalCandidates = [];
    Object.keys(groupByCandidates).forEach((district: string) => {
      groupByCandidates[district]?.forEach((candidate) => {
        _totalCandidates.push(candidate);
      });
    });

    setElectionList(electionList);
    setCandidateLists(_totalCandidates);
    setElectionStatus(electionStatus);
    setCurrentElection(groupByCandidates);
  }

  useEffect(() => {
    fetchData();

    window?.ethereum?.on("accountsChanged", (accounts: any) => {
      fetchData();
    })

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
      const _loggedInAccountAddress = getStorage("loggedInAccountAddress");

      // restrict voting before electin start and end
      if (electionStatus == "ENDED") return toast.warn("Election is over !")
      if (electionStatus !== "LIVE") return toast.warn("Cannot vote before election !");


      const selectedCandidates = candidateLists?.find((candidate) => candidate.user._id === _candidateID);

      // restrict candidate to not vote more than one time
      const isCandidate = candidateLists.find((candidate: any) => candidate?.votedVoterLists?.includes(_candidateID));
      if (isCandidate) {
        const isAlreadyVoted = candidateLists.some((candidate: any) => candidate.votedVoterLists.includes(_loggedInAccountAddress));
        if (isAlreadyVoted) return toast.error("Candidate can only vote once !")
      }

      const voterDetails = await getVoterDetails(_loggedInAccountAddress);
      const electionAddress = electionList.at(-1)?.startDate;

      // vote limit count
      if (voterDetails.voteLimitCount === "3") return toast.info("You've exceed the vote limit count !");

      // verify one time vote on same party
      let isExit = false;
      districts.forEach((district) => {
        const candidatesByPositions = _.groupBy(currentElection[district], (candidate: any) => candidate.position);
        const { mayor, deput_mayor, ward_councilor } = candidatesByPositions;
        const isMayorVoted = _.some(mayor, (candidate: any) => candidate.votedVoterLists.includes(_loggedInAccountAddress) && candidate.user._id !== _candidateID);
        const isDeputyMayorVoted = _.some(deput_mayor, (candidate: any) => candidate.votedVoterLists.includes(_loggedInAccountAddress) && candidate.user._id !== _candidateID);
        const isWardCouncilorVoted = _.some(ward_councilor, (candidate: any) => candidate.votedVoterLists.includes(_loggedInAccountAddress) && candidate.user._id !== _candidateID);
        if ((isMayorVoted && _position === "mayor") || (isDeputyMayorVoted && _position === "deput_mayor") || (isWardCouncilorVoted && _position === "ward_councilor")) {
          isExit = true;
          return toast.info("Cannot vote multiple of same seats !")
        };
      })

      if (isExit) return;

      const isAlreadyVoted = selectedCandidates?.votedVoterLists?.includes(_loggedInAccountAddress) ?? false;

      if (isAlreadyVoted) return toast.error("You've already casted vote !");

      await SmartContract.methods.vote(_candidateID, electionAddress).send({ from: _loggedInAccountAddress });

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
        <div className='flex flex-column'>

          {/* province level eleciton */}
          <div className='lg:w-[1100px] xsm:w-full sm:px-4 xsm:px-2'>
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
          <div className='lg:w-[1100px] flex justify-around flex-wrap'>
            {electionStatus && districts?.length > 0 && districts?.map((district: any) =>
              <LiveCounterCard type={district} data={currentElection[district]} electionStatus={electionStatus} casteVote={casteVote} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
