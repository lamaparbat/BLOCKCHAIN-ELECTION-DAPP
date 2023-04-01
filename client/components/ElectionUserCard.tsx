import React from 'react';

const ElectionUserCard = ({ label, value, Icon }) => {
  return (
    <div className='flex px-3 bg-slate-100 lg:w-[250px] md:w-[250px] sm:w-[250px] xsm:w-full overflow-hidden pr-5 py-1 mb-2 items-center rounded-1'>
      <div className='p-2 border-4 border-blue-900 rounded-circle'>{Icon}</div>
      <div className='mx-3 flex flex-column'>
        <span className='text-[18px] text-blue-900 relative top-3'>{label}</span>
        <span className='text-[45px] text-red-700 mt-1'>{value}</span>
      </div>
    </div>
  )
}

export default ElectionUserCard;
