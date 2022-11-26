import React from 'react';
import Avatar from './Avatar';

const AnimatedAvatar = () => {
  return (
    <div className='d-flex w-fit h-fit items-end '>
      <Avatar className='avatar' src="/images/parbat.png" alt="profile" size='xl' border={8} />
    </div>
  )
}

export default AnimatedAvatar;
