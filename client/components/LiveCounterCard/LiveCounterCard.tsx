import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { FaRegDotCircle } from 'react-icons/fa';
import AnimatedAvatar from '../AnimatedAvatar';
import CandidateCard from './CandidateCard';
import { BTM_BORDER_STYLE } from '../../constants';
import { LiveCounterCardStruct } from '../../interfaces/index';
import TickCircleIcon from '../TickCircleIcon';
import { getStorage } from '../../services';
import _ from 'lodash';

const LiveCounterCard: React.FC<LiveCounterCardStruct> = ({ type, data, electionStatus, casteVote }): ReactElement => {
  const {list} = useSelector((state:any) => state.candidateReducer)
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  const isElectionStart = electionStatus === "start";
  const isElectionEnd = electionStatus === "end";
  let { agenda, partyName, voteCount, user, votedVoterLists }: any = data[0];
  const { fullName, profile }: any = user;
  const filter = _.map(data, (candidate:any) => {
    const isFound = _.find(list, (d:any) => d.user._id === candidate.user._id);
    if(isFound) return {...candidate, votedVoterLists: isFound.votedVoterLists}
    else return {...candidate};
  });

  const isAlreadyVoted1 = filter[0]?.votedVoterLists.includes(loggedInAccountAddress);
  const isAlreadyVoted2 = filter[1]?.votedVoterLists.includes(loggedInAccountAddress);
  const isAlreadyVoted3 = filter[2]?.votedVoterLists.includes(loggedInAccountAddress);

  return (
    <div
      className={`card__container ${isElectionEnd && 'bg-celebrationGif'} h-fit min-[1140px]:w-[530px] max-[1140px]:w-full mt-3 border border-1 border-slate-300 rounded-1 overflow-hidden`}>
      <div className='card__title pl-4 pt-2 flex items-center bg-slate-100 border-l-0 border-r-0 border-t-0 border-b-2 border-black-500'>
        <h6>{type}</h6>
      </div>
      <div className={`card__body pt-3 pb-2 ${isElectionStart && 'animatedBorder'}`}>
        <div className='card__body__hot px-4 mb-3 flex'>
          <AnimatedAvatar src={profile} />
          <div className='details pt-2 pl-3 mx-3'>
            <div className='flex items-center'>
              <span className='text-xl me-4'>{fullName}</span>
              {isElectionEnd && <TickCircleIcon />}
              {isElectionStart && <FaRegDotCircle className='animate-ping text-danger absolute lg:ml-[200px] max-[1100px]:ml-[100px]' />}
            </div>
            <h1 id='count'>{votedVoterLists?.length}</h1>
          </div>
        </div>
        <div className='candidate_row px-3'>
          {data[0] && <CandidateCard details={data[0]} border={BTM_BORDER_STYLE} ishighlighted={true} casteVote={casteVote} voted={isAlreadyVoted1} />}
          {data[1] && <CandidateCard details={data[1]} border={BTM_BORDER_STYLE} ishighlighted={false} casteVote={casteVote} voted={isAlreadyVoted2} />}
          {data[2] &&<CandidateCard details={data[2]} border={null} ishighlighted={false} casteVote={casteVote} voted={isAlreadyVoted3} />}
        </div>
      </div>
    </div>
  )
}

export default LiveCounterCard
