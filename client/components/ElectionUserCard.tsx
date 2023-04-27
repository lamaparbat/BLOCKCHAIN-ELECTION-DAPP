import React from 'react';

const ElectionUserCard = ({ label, value, Icon }) => {
  return (
    <div className='bg-slate-100 sm:w-[260px] xsm:w-[170px] flex sm:px-3 py-1 mb-2 xsm:px-2 overflow-hidden items-center rounded-1'>
      <div className='sm:p-2 xsm:p-0 border-4 border-blue-900 rounded-circle'>{Icon}</div>
      <div className='sm:ml-4 xsm:ml-2 flex flex-column'>
        <span className='sm:text-[18px] xsm:text-[13px] text-blue-900 relative top-3'>{label}</span>
        <span className='sm:text-[45px] xsm:text-[27px] text-red-700 mt-1'>{value}</span>
      </div>
    </div>
  )
}

export default ElectionUserCard;
