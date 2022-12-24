import React from 'react';
import Avatar from './Avatar';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import { PartyStruct } from '../interfaces';

const UserCard: React.FC<PartyStruct> = (props): React.ReactElement => {
 const {
  lists: { partyName, totalMembers, agenda, logo }
 } = props;
 console.log(partyName, totalMembers, agenda, logo)

 return (
  <div className='user__card flex justify-around items-center h-[170px] w-[340px] px-3 mb-3  max-[500px]:w-[500px] max-[400px]:w-full bg-slate-100 rounded-[12px] cursor-pointer hover:drop-shadow-md hover:bg-red-200 transition ease-in-out'>
   <div className='col1 flex-col justify'>
    <Avatar src={logo} className={''} alt={'img'} size={'xl'} border={0} />
    <div className='social__media flex justify-center mt-3'>
     <BsFacebook className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
     <BsInstagram className='mx-4 cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
     <BsTwitter className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
    </div>
   </div>
   <div className='col2 h-fit flex-xl-column text-[15px] ml-3'>
    <div>Party Name: {partyName}</div>
    <div>Total Members: {totalMembers}</div>
    <div>Agenda: {agenda}</div>
   </div>
  </div>
 )
}

export default UserCard;
