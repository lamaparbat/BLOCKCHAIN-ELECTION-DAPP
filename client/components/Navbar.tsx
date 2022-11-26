import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AiOutlineMail, AiOutlineSearch } from 'react-icons/ai';
import _ from 'lodash';
import Avatar from './Avatar';
import { LANGUAGES } from '../constants/index';
import { LanguageStruct } from '../interfaces';

const Navbar: React.FC = (): ReactElement => {
 const [selectedLanguage, setSelectedLanguage] = useState({ label: 'english', value: 'ENGLISH' });
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

 // on language select
 const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
  const val: LanguageStruct | undefined = _.find(LANGUAGES, { value: e.target.value });
  setSelectedLanguage(val ?? selectedLanguage);
 };

 return (
  <div className='navbar__container'>
   <div className='navbar__top py-2 w-full flex justify-end bg-slate-100 px-2'>
    <div className='items w-[450px] flex justify-around items-center text-slate-600'>
     <span className='pr-4 text-sm cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={() => navigate("/FAQ")}>FAQ</span>
     <select className='text-sm cursor-pointer hover:opacity-70 bg-slate-100 outline-0' onChange={onLanguageChange}>
      {LANGUAGES.map((d, i) => <option key={i} value={d.value}>{d.label}</option>)}
     </select>
     <span className='px-4 cursor-pointer hover:opacity-70 border-r-2 border-slate-400 border-l-2 border-slate-400' onClick={() => navigate("mail")}><AiOutlineMail className='text-lg' /></span>
     <span className='pl-1 pr-4 cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={openSearchModal}><AiOutlineSearch className='text-xl' /></span>
     <div className='flex justify-between items-center cursor-pointer hover:opacity-60' onClick={openProfile}>
      <Avatar className='avatar' src="/images/parbat.png" alt="profile" size='sm' border={1} />
      <span className='mx-2'>Parbat Lama</span>
     </div>
    </div>
   </div>
   <div className='flex justify-center'>
    <div className='navbar__bottom lg:w-[1100px] w-full max-[1100px]:px-5  flex items-center justify-between pt-2'>
     <Image src='/images/govLogo.jpeg' height={100} width={100} alt="election-logo" />
     <div className='center__content text-center text-red-700 -ml-[15px]'>
      <h3 className='max-[500px]:text-[22px]'>{selectedLanguage && selectedLanguage.label === 'ENGLISH' ? 'Election Commission Nepal' : 'निर्वाचन आयोग नेपाल'}</h3>
      <h5 >{selectedLanguage && selectedLanguage.label === 'ENGLISH' ? 'Kantipath, Kathmandu' : 'कान्तिपथ, काठमाण्डौ'}</h5>
     </div>
     <Image src='/images/flag.png' height={40} width={50} alt="nepal-flag" />
    </div>
   </div>
  </div>
 )
}

export default Navbar;
