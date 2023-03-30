import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

const Dropdown = ({ title, items }) => {
   const [openModal, setOpenModal] = useState(false);
   const router = useRouter();
   const t = useTranslations("navbar");

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
            <div className='subnav__title' onClick={() => setOpenModal(!openModal)} onMouseOver={() => setOpenModal(true)} onMouseOut={() => setOpenModal(false)}>
               {title}  &nbsp;
               {openModal ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div
               className={`item__list p-2 w-[230px] max-[1100px]:ml-[100px] flex-col justify-start bg-blue-900 absolute mt-[20px] rounded-b-[8px] z-40 shadow-md ${!openModal && 'invisible'}`}
               onMouseOver={() => setOpenModal(true)}
               onMouseOut={() => setOpenModal(false)}
            >
               {
                  items.map((item: any, index: number) =>
                     <a
                        className='w-full py-2 pl-4 text-slate-100 border-1 border-blue-100 rounded-2 hover:bg-red-800 no-underline hover:text-slate-100'
                        key={index}
                        onClick={() => navigate(item.value)}
                        onMouseOver={() => setOpenModal(true)}
                        onMouseOut={() => setOpenModal(false)}
                     >
                        {t(item.id)}
                     </a>)
               }
            </div>
         </div>
      </div>
   )
}

export default Dropdown;
