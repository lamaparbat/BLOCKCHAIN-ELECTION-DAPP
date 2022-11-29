import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ title, items }) => {
 const [openModal, setOpenModal] = useState(false);

 useEffect(() => {
  !window || window.addEventListener("click", (e: any) => {
   return e.target.className !== "subnav__title" && setOpenModal(false);
  })
 }, []);

 return (
  <div className='text-sm'>
   <div className='relative flex-col'>
    <div className='subnav__title' onClick={() => setOpenModal(!openModal)}>{title}  &nbsp; <FaChevronDown /></div>
    <div className={`item__list p-2 w-[230px] ml-[145px] flex-col justify-start bg-blue-900 absolute mt-[25px] rounded-b-[8px] z-40 ${!openModal && 'invisible'}`}>
     {
      items.map((val, index) => <span className='w-full py-2 pl-4 text-slate-100 border-1 border-blue-100 rounded-2 hover:bg-red-700' key={index}>{val}</span>)
     }
    </div>
   </div>
  </div>
 )
}

export default Dropdown;
