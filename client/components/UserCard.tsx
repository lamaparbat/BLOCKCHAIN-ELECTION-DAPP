import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import Avatar from './Avatar';
import { UserCardStruct } from '../interfaces';

const UserCard: React.FC<UserCardStruct> = (props): React.ReactElement => {
  const {
    details: {
      citizenshipNo,
      fullName,
      dob,
      profile,
      education,
      address,
      contact,
      email
    },
    type
  } = props;

  return (
    <div className='user__card flex justify-around items-center h-[170px] w-[350px] px-2 mb-3  max-[500px]:w-[500px] max-[400px]:w-full bg-slate-100 rounded-[12px] cursor-pointer hover:drop-shadow-md hover:bg-red-200 transition ease-in-out'>
      <div className='col1 flex-col justify'>
        <Avatar src={profile} className={''} alt={'img'} size={'xl'} border={0} />
        <div className='social__media flex justify-center mt-2'>
          <BsFacebook className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
          <BsInstagram className='mx-4 cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
          <BsTwitter className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
        </div>
      </div>
      <div className='col2 h-fit flex-xl-column text-[15px] ml-1'>
        <div>Name: {fullName}</div>
        <div>Citizenship No: {citizenshipNo}</div>
        <div>DOB: {dob}</div>
        <div>Email: {email}</div>
      </div>
    </div>
  )
}

export default UserCard;
