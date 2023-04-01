import React from 'react';

const ElectionUserCard = ({ label, value, Icon }) => {
  return (
    <div className='flex min-sm:px-3 min-sm:pr-5 py-1 mb-2 xsm:px-2 bg-slate-100 min-sm:w-[250px] xsm:w-[160px] overflow-hidden items-center rounded-1'>
      <div className='min-sm:p-2 xsm:p-0 border-4 border-blue-900 rounded-circle'>{Icon}</div>
      <div className='min-sm:mx-3 xsm:ml-2 flex flex-column'>
        <span className='min-sm:text-[18px] xsm:text-[13px] text-blue-900 relative top-3'>{label}</span>
        <span className='min-sm:text-[45px] xsm:text-[27px] text-red-700 mt-1'>{value}</span>
      </div>
    </div>
  )
}

export default ElectionUserCard;
