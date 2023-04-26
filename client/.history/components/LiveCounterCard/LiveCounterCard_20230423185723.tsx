import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import _ from 'lodash';
import { FaRegDotCircle } from 'react-icons/fa';
import AnimatedAvatar from '../AnimatedAvatar';
import CandidateCard from './CandidateCard';
import { BTM_BORDER_STYLE, DISTRICT } from '../../constants';
import { LiveCounterCardStruct } from '../../interfaces/index';
import TickCircleIcon from '../TickCircleIcon';

const LiveCounterCard: React.FC<LiveCounterCardStruct> = ({ type, data, electionStatus, casteVote }): ReactElement => {
  const router = useRouter();
  const loggedInAccountAddress = useSelector((state: any) => state?.loggedInUserReducer?.address);
  const isElectionStart = electionStatus === "LIVE";
  const isElectionEnd = electionStatus === "ENDED";

  const navigateTo = (route: string) => {
    router.push(`/election/district/${route}`)
  }

  // group candidate by positions
  const candidatesByPositions = _.groupBy(data, (candidate: any) => candidate.position);

  const leadingCandidate = _.maxBy(data, "voteCount");

  return (
    <div
      className={`card__container ${isElectionEnd && 'bg-celebrationGif'} h-fit sm:w-[520px] max-[1140px]:w-full mt-3 border border-1 border-slate-300 rounded-1 overflow-hidden mr-3`}>
      <div
        className='card__title pl-4 pt-2 flex items-center bg-slate-100 border-l-0 border-r-0 border-t-0 border-b-2 border-black-500 cursor-pointer'
        onClick={() => navigateTo(type)}
      >
        <h6>{type}</h6>
      </div>
      <div className={`card__body pt-3 pb-2 ${isElectionStart && 'animatedBorder'}`}>
        <div className='card__body__hot px-4 mb-3 flex'>
          <AnimatedAvatar src={leadingCandidate?.user?.profile} />
          <div className='details pt-2 pl-3 mx-3'>
            <div className='flex items-center'>
              <span className='text-xl me-4'>{leadingCandidate?.user?.fullName}</span>
              {isElectionEnd && <TickCircleIcon />}
              {isElectionStart && <FaRegDotCircle className='animate-ping text-danger absolute lg:ml-[200px] max-[1100px]:ml-[100px]' />}
            </div>
            <h1 id='count'>{leadingCandidate?.votedVoterLists?.length}</h1>
          </div>
        </div>
        <div className='candidate_row px-3'>
          <h5 className='text-lg text-dark mt-3 ml-1'>Mayors</h5>
          {
            _.orderBy(candidatesByPositions?.mayor, ["voteCount"], "desc")?.map((candidate: any) =>
              <CandidateCard details={candidate} border={BTM_BORDER_STYLE} ishighlighted={true} casteVote={casteVote} voted={candidate?.votedVoterLists?.includes(loggedInAccountAddress)} />
            )
          }
          <h5 className='text-lg text-dark mt-3 ml-1'>Deputy Mayors</h5>
          {
            candidatesByPositions?.deput_mayor?.map((candidate: any) =>
              <CandidateCard details={candidate} border={BTM_BORDER_STYLE} ishighlighted={true} casteVote={casteVote} voted={candidate?.votedVoterLists?.includes(loggedInAccountAddress)} />
            )
          }
          <h5 className='text-lg text-dark mt-3 ml-1'>Ward Councilor</h5>
          {
            candidatesByPositions?.ward_councilor?.map((candidate: any) =>
              <CandidateCard details={candidate} border={BTM_BORDER_STYLE} ishighlighted={true} casteVote={casteVote} voted={candidate?.votedVoterLists?.includes(loggedInAccountAddress)} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default LiveCounterCard
