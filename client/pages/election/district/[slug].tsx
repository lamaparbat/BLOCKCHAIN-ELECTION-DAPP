import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../../components/Navbar';
import electionChannel from "../../../services/pusher-events";
import { getCandidateList, getElectionList, getElectionStatus, getFormattedErrorMessage, getSortedCandidatesList, getVoterList } from '../../../utils';
import _ from 'lodash';
import { BTM_BORDER_STYLE, SmartContract } from '../../../constants';
import { setCandidateList } from '../../../redux/reducers/candidateReducer';
import { toast } from 'react-toastify';
import UserCard from '../../../components/UserCard';
import { getVoterDetails } from '../../../utils/web3';
import CandidateCard from '../../../components/LiveCounterCard/CandidateCard';

export default function Home({ districtName }) {
  const [electionStatus, setElectionStatus] = useState(null);
  const [electionList, setElectionList] = useState([]);
  const [candidateLists, setCandidateLists] = useState([]);
  const [currentElection, setCurrentElection] = useState<any>({});
  const loggedInAccountAddress = useSelector((state: any) => state.loggedInUserReducer.address);

  let voteCastEvent = null;

  const router = useRouter();
  const dispatch = useDispatch();


  const fetchData = async () => {
    const electionList = await getElectionList();
    const candidateLists = await getCandidateList();
    const electionStatus = getElectionStatus("Province", electionList?.at(-1));
    const groupByCandidates = _.groupBy(electionList.at(-1)?.candidates, (candidate) => candidate.votingBooth);

    setElectionStatus(electionStatus);
    setCandidateLists(groupByCandidates[districtName]);
    setCurrentElection(groupByCandidates);
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
      // restrict voting before electin start and end

      const voterDetails = await getVoterDetails(loggedInAccountAddress);
      const electionAddress = electionList?.at(-1)?.startDate;

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
      });

      if (isExit) return;

      const selectedCandidates = candidateLists.find((candidate) => candidate.user._id === _candidateID);

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

  const navigateTo = () => router.push("/election/district");


  // group candidate by positions
  const candidatesByPositions = _.groupBy(candidateLists, (candidate: any) => candidate.position);
  const leadingCandidate = _.maxBy(candidateLists, "voteCount");

  return (
    <div>
      <Head>
        <title>District Election</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      <div className='px-4 py-3 flex justify-center mt-1'>
        <div className='flex flex-column justify-between'>

          {/* province level elections */}
          <div className='lg:w-[1100px] w-full lg:px-2 max-[1100px]:px-1'>

            <div className='flex items-center h-fit mt-3 mb-4'>
              <div className='w-fit py-1 pl-3 pr-10 mr-5 flex items-center bg-red-700 rounded-tr-full text-slate-100'>
                <span className='text-slate-100 mr-2 cursor-pointer' onClick={navigateTo}>District</span> /
                <span className='text-slate-100 ml-2'>{districtName}</span>
              </div>
              <span className='ml-2 text-lg font-bold text-black'>Total Candidates: {currentElection[districtName] && (currentElection[districtName]?.length ?? 0)}</span>
            </div>

            {/* candidate lists */}
            <div className='candidate_row'>
              <h5 className='text-lg text-dark mt-3 ml-1'>Mayors</h5>
              <div className='flex flex-wrap justify-between'>
                {
                  _.orderBy(candidatesByPositions?.mayor, ["voteCount"], "desc")?.map((candidate: any, i: number) =>
                    <UserCard
                      details={candidate}
                      type="candidate"
                      key={i}
                      currentElection={currentElection}
                      casteVote={casteVote}
                    />
                  )
                }
              </div>
              <h5 className='text-lg text-dark mt-3 ml-1'>Deputy Mayors</h5>
              <div className='flex flex-wrap justify-between'>
                {
                  _.orderBy(candidatesByPositions?.deput_mayor, ["voteCount"], "desc")?.map((candidate: any, i: number) =>
                    <UserCard
                      details={candidate}
                      type="candidate"
                      key={i}
                      currentElection={currentElection}
                      casteVote={casteVote}
                    />
                  )
                }
              </div>
              <h5 className='text-lg text-dark mt-3 ml-1'>Ward Councilor</h5>
              <div className='flex flex-wrap justify-between'>
                {
                  _.orderBy(candidatesByPositions?.ward_councilor, ["voteCount"], "desc")?.map((candidate: any, i: number) =>
                    <UserCard
                      details={candidate}
                      type="candidate"
                      key={i}
                      currentElection={currentElection}
                      casteVote={casteVote}
                    />
                  )
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return {
      redirect: {
        permanent: false,
        destination: ""
      }
    }
  }

  return {
    props: { districtName: slug }
  }
}
