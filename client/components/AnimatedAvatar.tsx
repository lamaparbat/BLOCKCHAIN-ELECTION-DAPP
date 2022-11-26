import React from 'react';
import Avatar from './Avatar';
import { AiOutlineUp } from 'react-icons/ai';

const AnimatedAvatar = () => {
  return (
    <div className='d-flex w-fit h-fit items-end'>
      <Avatar className='avatar' src="/images/parbat.png" alt="profile" size='xl' border={8} />
      <div className='h-[30px] w-[30px] text-3xl -top-[20px] -left-[20px] position-relative bg-green-300 rounded-full d-flex justify-center items-center border-2 border-white-100'>
        <div>
          <AiOutlineUp className='text-sm -mt-[5px]' />
          <AiOutlineUp className='text-sm position-absolute -mt-[8px]' />
        </div>
      </div>
    </div>
  )
}

export default AnimatedAvatar;
