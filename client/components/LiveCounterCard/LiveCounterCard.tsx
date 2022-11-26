import React, { ReactElement } from 'react';
import { FaRegDotCircle } from 'react-icons/fa';
import AnimatedAvatar from '../AnimatedAvatar';
import CandidateCard from './CandidateCard';
import { BTM_BORDER_STYLE } from '../../constants';
import { LiveCounterCardStruct } from '../../interfaces/index';

const LiveCounterCard: React.FC<LiveCounterCardStruct> = ({ type, data }): ReactElement => {
 return (
  <div className='card__container h-fit min-[1140px]:w-[530px] max-[1140px]:w-100 mt-3 border border-1 border-slate-300 rounded-1 overflow-hidden'>
   <div className='card__title pl-4 pt-2 flex items-center bg-slate-100 border-l-0 border-r-0 border-t-0 border-b-2 border-black-500'>
    <h6>{type}</h6>
   </div>
   <div className='card__body pt-3 pb-2'>
    <div className='card__body__hot px-4 mb-3 flex'>
     <AnimatedAvatar />
     <div className='details pt-2 pl-3 mx-3'>
      <FaRegDotCircle className='animate-ping text-danger absolute ml-[200px] mt-2' />
      <span className='text-xl'>{data[0].candidateName}</span>
      <h1 id='count'>{data[0].count}</h1>
     </div>
    </div>
    <div className='candidate_row px-3'>
     <CandidateCard details={data[0]} border={BTM_BORDER_STYLE} ishighlighted={true} />
     <CandidateCard details={data[1]} border={BTM_BORDER_STYLE} ishighlighted={false} />
     <CandidateCard details={data[2]} border={null} ishighlighted={false} />
    </div>
   </div>
  </div>
 )
}

export default LiveCounterCard
