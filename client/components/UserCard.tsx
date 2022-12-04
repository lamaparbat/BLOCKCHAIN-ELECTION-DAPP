import React from 'react';
import Avatar from './Avatar';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import { UserCardStruct } from '../interfaces';

const UserCard: React.FC<UserCardStruct> = (props): React.ReactElement => {
 const {
  details: { citizenship, name, dob, profileSrc, education, address, contact, email },
  type
 } = props;

 return (
  <div className='user__card flex justify-around items-center h-[170px] w-[340px] px-3 mb-3  max-[500px]:w-[500px] max-[400px]:w-full bg-slate-100 rounded-[12px] cursor-pointer hover:drop-shadow-md hover:bg-red-200 transition ease-in-out'>
   <div className='col1 flex-col justify'>
    <Avatar src={profileSrc} className={''} alt={'img'} size={'xl'} border={0} />
    <div className='social__media flex justify-center mt-2'>
     <BsFacebook className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
     <BsInstagram className='mx-4 cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
     <BsTwitter className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
    </div>
   </div>
   <div className='col2 h-fit flex-xl-column text-[15px]'>
    <div>Name: {name}</div>
    <div>Citizenship No: {citizenship}</div>
    <div>Date of birth: {dob}</div>
    <div>Email: {email}</div>
   </div>
  </div>
 )
}

export default UserCard;
