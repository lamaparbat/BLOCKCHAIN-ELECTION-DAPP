import moment from 'moment';
import React from 'react';

const CommentCard = ({ address, comment, date }) => {
  return (
    <div className='ml-3 my-3 flex flex-column border border-slate-100 px-3 py-2'>
      <strong>Address: {address}</strong>
      <span className='py-2'>{comment}</span>
      <div className='footer flex justify-end'>
        <span className='text-sm'>{moment(date).format("lll")}</span>
      </div>
    </div>
  )
}

export default CommentCard;
