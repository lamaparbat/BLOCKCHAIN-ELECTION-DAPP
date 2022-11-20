import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Avatar from './Avatar';
import { AiOutlineMail, AiOutlineSearch } from 'react-icons/ai';

const Navbar: React.FC = (): ReactElement => {
 const route = useRouter();

 // open new page
 const navigate = (path: string) => {
  path !== "mail" ? route.push(path) : window.open("https://gmail.com/", "_blank");
 }

 // switch language
 const changeLanguage = () => {
 }

 // open search modal form
 const openSearchModal = () => {
 }

 // open profile component
 const openProfile = () => {
 }

 return (
  <div className='navbar'>
   <div className='navbar__top py-2 w-full flex justify-end bg-slate-100'>
    <div className='items w-[500px] flex justify-around items-center text-slate-600'>
     <span className='text-sm cursor-pointer hover:opacity-60' onClick={() => navigate("/FAQ")}>FAQ</span>
     <span className='text-sm cursor-pointer hover:opacity-60' onClick={changeLanguage}>ENGLISH</span>
     <span className='cursor-pointer hover:opacity-60' onClick={() => navigate("mail")}><AiOutlineMail className='text-lg' /></span>
     <span className='cursor-pointer hover:opacity-60' onClick={openSearchModal}><AiOutlineSearch className='text-xl' /></span>
     <div className='flex justify-between items-center cursor-pointer hover:opacity-60' onClick={openProfile}>
      <Avatar className='avatar' src="/images/parbat.png" alt="profile" />
      <span className='mx-4'>Parbat Lama</span>
     </div>
    </div>
   </div>
   <div className='navbar__bottom'></div>
  </div>
 )
}

export default Navbar;
