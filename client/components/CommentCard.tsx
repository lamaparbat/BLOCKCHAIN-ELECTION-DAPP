import moment from 'moment';
import React from 'react';
import { getStorage } from '../services';

const CommentCard = ({ address, comment, date }) => {
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  const isMe = loggedInAccountAddress === address;

  return (
    <div className='ml-3 my-3 flex flex-column border border-slate-100 px-3 py-2'>
      <strong>Address: {isMe ? "Me" : address}</strong>
      <span className='py-2'>{comment}</span>
      <div className='footer flex justify-end'>
        <span className='text-sm'>{moment(date).format("lll")}</span>
      </div>
    </div>
  )
}

export default CommentCard;
