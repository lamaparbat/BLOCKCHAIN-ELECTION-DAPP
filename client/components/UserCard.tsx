import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import Avatar from './Avatar';
import { UserCardStruct } from '../interfaces';
import moment from 'moment';
import { TiLockClosed } from 'react-icons/ti';
import { getStorage } from '../services';

const UserCard: React.FC<UserCardStruct> = (props): React.ReactElement => {
  const {
    details,
    type,
    onCandidateSelected,
    currentElection,
    isElected,
    casteVote 
  }: any = props;
  const formattedEmail = details?.user?.email.split("@")[0];
  const isElectionLive = currentElection ? moment(currentElection?.startDate).format("YYYY") === new Date().getFullYear().toString() : false;
  const isVoted = details?.votedVoterLists?.includes(getStorage("loggedInAccountAddress"));

  return (
    <div className='user__card h-[180px] w-[350px] px-2 mb-3  max-[500px]:w-[500px] max-[400px]:w-full bg-slate-100 rounded-[12px] hover:bg-red-20'>
      {!casteVote && isElectionLive &&
        <div className='absolute m-2 p-2 bg-white shadow-lg border-[1px] border-slate-500 rounded-circle h-[45px] w-[45px] flex justify-center items-center'>
          <input
            className='h-[20px] w-[20px] cursor-pointer'
            type="checkbox"
            value={isElected}
            onClick={(e: any) => {
              onCandidateSelected(e.target.checked, details);
            }}
            key={details?.user?.citizenshipNumber}
          />
        </div>
      }

      {casteVote &&
        <button
            className={`absolute flex justify-center items-center bg-white  ${!isVoted && "shadow-md"} m-2 py-2 px-4 rounded-pill text-sm ${isVoted && "text-slate-500 cursor-default"} border-[1px] border-slate-500 `}
            onClick={() => !isVoted && casteVote(details?.user?._id)}
            disabled={isVoted}
          >
            {
              isVoted && <span className='absolute -top-1 -left-2 p-1 rounded-circle bg-slate-200 shadow-md cursor-default'>
                <TiLockClosed className='text-slate-500' />
              </span>
            }
            Vote
          </button>
      }
      <div className='flex justify-around items-center mt-4'>
        <div className='col1 flex-col'>
          <Avatar src={details?.user?.profile} className={''} alt={'img'} size={'xl'} border={0} />
          <div className='social__media flex justify-center mt-3'>
            <BsFacebook className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
            <BsInstagram className='mx-4 cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
            <BsTwitter className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
          </div>
        </div>
        <div className='col2 pr-1 h-fit flex-xl-column text-[15px] ml-1'>
          <div>Name: {details?.user?.fullName}</div>
          <div>Citizenship No: {details?.user?.citizenshipNumber}</div>
          <div>Age: {details?.user?.age}</div>
          <div>Party: {details?.partyName}</div>
          <div>Email: {formattedEmail}</div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;
