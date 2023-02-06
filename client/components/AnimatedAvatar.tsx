import React from 'react';
import Avatar from './Avatar';

const AnimatedAvatar: any = ({ src }) => {
  return (
    <div className='d-flex w-fit h-fit items-end '>
      <Avatar className='avatar' src={src} alt="profile" size='xl' border={8} />
    </div>
  )
}

export default AnimatedAvatar;
