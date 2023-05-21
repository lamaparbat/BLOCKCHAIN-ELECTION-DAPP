import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter, BsEye } from 'react-icons/bs';
import Avatar from './Avatar';
import { PartyStruct } from '../interfaces';

const UserCard: React.FC<PartyStruct> = (props): React.ReactElement => {
  const {
    lists: { name, totalMember, logoUrl },
    openAgendaPreview
  } = props;

  const redirect = (link: string) => window.open(link, "_blank");

  return (
    <div className='user__card flex justify-around items-center h-[170px] w-[360px] px-3 mb-3  max-[500px]:w-[500px] max-[400px]:w-full bg-slate-100 rounded-[12px] cursor-pointer hover:drop-shadow-md hover:bg-red-200 transition ease-in-out'>
      <div className='col1 flex-col justify'>
        <Avatar src={logoUrl} className={''} alt={'img'} size={'xl'} border={0} />
        <div className='social__media flex justify-center mt-3'>
          <BsFacebook className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' onClick={() => redirect(`https://www.facebook.com/${name}`)} />
          <BsInstagram className='mx-4 cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' onClick={() => redirect(`https://www.instagram.com/${name}`)} />
          <BsTwitter className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' onClick={() => redirect(`https://www.twitter.com/${name}`)} />
        </div>
      </div>
      <div className='col2 h-fit flex-xl-column text-[15px] ml-3'>
        <div>Leader: {name}</div>
        <div>Party Name: {name}</div>
        <div className='my-2'>Total Members: {totalMember}</div>
        <div className='flex items-center'>
          Agenda:
          <div className='ml-3' onClick={() => openAgendaPreview(props.lists)}>
            <BsEye className='text-lg mt-1' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;
