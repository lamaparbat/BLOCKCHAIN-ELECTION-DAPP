import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import Avatar from './Avatar';
import { UserCardStruct } from '../interfaces';
import moment from 'moment';

const UserCard: React.FC<UserCardStruct> = (props): React.ReactElement => {
  const {
    details,
    type,
    onCandidateSelected,
    currentElection,
    isElected
  }: any = props;
  const formattedEmail = details?.user?.email.split("@")[0];
  const isElectionLive = currentElection ? moment(currentElection?.startDate).format("YYYY") === new Date().getFullYear().toString() : false;
  return (
    <div className='user__card h-[180px] w-[350px] px-2 mb-3  max-[500px]:w-[500px] max-[400px]:w-full bg-slate-100 rounded-[12px] hover:bg-red-20'>
      {isElectionLive &&
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
