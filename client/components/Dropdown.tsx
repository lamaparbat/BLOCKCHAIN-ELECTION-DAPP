import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ title, items }) => {
 const [openModal, setOpenModal] = useState(false);
 const router = useRouter();

 useEffect(() => {
  !window || window.addEventListener("click", (e: any) => {
   return e.target.className !== "subnav__title" && setOpenModal(false);
  })
 }, []);

 const navigate = (path) => {
  router.push(path);
 }

 return (
  <div className='text-sm'>
   <div className='relative flex-col'>
    <div className='subnav__title' onClick={() => setOpenModal(!openModal)}>{title}  &nbsp; <FaChevronDown /></div>
    <div className={`item__list p-2 w-[230px] max-[1100px]:ml-[100px] flex-col justify-start bg-blue-900 absolute mt-[25px] rounded-b-[8px] z-40 ${!openModal && 'invisible'}`}>
     {
      items.map((val, index) =>
       <span
        className='w-full py-2 pl-4 text-slate-100 border-1 border-blue-100 rounded-2 hover:bg-red-800'
        key={index} onClick={() => navigate(val)}>{val}</span>)
     }
    </div>
   </div>
  </div>
 )
}

export default Dropdown;
