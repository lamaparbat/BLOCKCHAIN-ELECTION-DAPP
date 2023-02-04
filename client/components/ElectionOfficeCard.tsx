import React from 'react';

const ElectionOfficeCard = ({ officeName }) => {
  return (
    <div className='transition delay-5 ease-in-out py-2 px-5 mb-4 bg-slate-100 shadow-md text-slate-700 hover:cursor-pointer hover:bg-blue-100 hover:-translate-y-100 hover:scale-110'>
      {officeName}
    </div>
  )
}

export default ElectionOfficeCard;
