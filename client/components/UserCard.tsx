import React, { useState } from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import Avatar from './Avatar';
import { UserCardStruct } from '../interfaces';
import { TiLockClosed } from 'react-icons/ti';
import { getStorage } from '../services';
import { Modal } from 'react-bootstrap';
import { BiCheck, BiCopy } from 'react-icons/bi';

const UserCard: React.FC<UserCardStruct> = (props): React.ReactElement => {
  const [previewModal, showPreviewModal] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const {
    details,
    type,
    onCandidateSelected,
    currentElection,
    isElected,
    casteVote
  }: any = props;

  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  const formattedEmail = details?.user?.email.split("@")[0];
  const isVoted = details?.votedVoterLists?.includes(loggedInAccountAddress);
  const isVoterRole = type === "voter";

  const redirect = (link: string) => window.open(link, "_blank");

  const showPreview = (e: any) => {
    showPreviewModal(!previewModal);
    e.stopPropagation();
  }

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(isAddressCopied ? " " : loggedInAccountAddress);
    setIsAddressCopied(!isAddressCopied);
  }

  return (
    <div
      className='user__card h-[180px] w-[350px] px-2 mb-3  max-[500px]:w-[500px] max-[400px]:w-full bg-slate-100 rounded-[12px] hover:bg-red-20 cursor-pointer hover:bg-red-100'
      onClick={showPreview}>
      {!casteVote && currentElection &&
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
            <BsFacebook className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' onClick={() => redirect(`https://www.facebook.com/${details?.user?.fullName}`)} />
            <BsInstagram className='mx-4 cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' onClick={() => redirect(`https://www.instagram.com/${details?.user?.fullName}`)} />
            <BsTwitter className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' onClick={() => redirect(`https://www.twitter.com/${details?.user?.fullName}`)} />
          </div>
        </div>
        <div className='col2 pr-1 h-fit flex-xl-column text-[15px] ml-1'>
          <div>Name: {details?.user?.fullName}</div>
          <div>Citizenship No: {details?.user?.citizenshipNumber}</div>
          <div>Age: {details?.user?.age}</div>
          {!isVoterRole && <div>Party: {details?.partyName}</div>}
          {isVoterRole && <div>Province: {details?.user.province}</div>}
          <div>Email: {formattedEmail}@..com</div>
        </div>
      </div>
      <Modal show={previewModal} onClick={(e: any) => e.stopPropagation()}>
        <Modal.Body className='p-4'>
          <div className='flex justify-center mb-3'>
            <Avatar src={details?.user?.profile} className={''} alt={'img'} size={'2xl'} border={0} />
          </div>
          <div className='pl-2 my-4 shadow-inner bg-slate-100 flex items-center justify-between rounded-1 w-full'>
            <span className='pr-2'>{details?.user?._id}</span>
            <div className={`pl-[30px] pr-[35px] py-[20px] cursor-pointer flex justify-center items-center rounded-br-md rounded-tr-md ${isAddressCopied ? "bg-success" : "bg-btnColor"}`} onClick={copyToClipboard}>
              {isAddressCopied ? <BiCheck className='text-light text-4xl absolute ml-2' /> : <BiCopy className='text-light text-2xl absolute ml-2' />}
            </div>
          </div>
          <div className='flex justify-between mb-2'>
            <div>Name: {details?.user?.fullName}</div>
            <div>Citizenship No: {details?.user?.citizenshipNumber}</div>
          </div>
          <div className='flex justify-between mb-2'>
            <div>Age: {details?.user?.age}</div>
            <div>Email:{details?.user?.email}</div>
          </div>
          <div className='flex justify-between mb-2'>
            <div>Province: {details?.user.province}</div>
            <div>District: {details?.user?.district}</div>
          </div>
          <div className='flex justify-between mb-2'>
            <div>Ward: {details?.user?.ward}</div>
            {!isVoterRole && <div>Party: {details?.partyName}</div>}
          </div>
          {!isVoterRole && <div className='mt-2'><b>Agenda:</b> {details?.agenda}</div>}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UserCard;
