import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AiOutlineMail, AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import _ from 'lodash';
import Avatar from './Avatar';
import { LANGUAGES, responsive, sub_navbar_style, sub_navbar_items_style } from '../constants/index';
import { LanguageStruct } from '../interfaces';
import Dropdown from './Dropdown';

const Navbar: React.FC = (): ReactElement => {
 const [selectedLanguage, setSelectedLanguage] = useState({ label: 'english', value: 'ENGLISH' });
 const [openModal, setOpenModal] = useState(false);
 const [openVerticalNavbar, setOpenVerticalNavbar] = useState(false);

 const route = useRouter();

 // open new page
 const navigate = (path: string) => {
  path !== "mail" ? route.push(path) : window.open("https://gmail.com/", "_blank");
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

 const aboutItems = ["Constitutional Provision", "Privacy Policy", "Former Election Commissioners"]
 const electoralItems = ["Electoral Framework Overview", "Election Related Laws", "Election Legislation"]
 const voterItems = ["Resource material", "Videos", "Voter Roll", "Register to vote", "FAQs on Voter Registration"]
 const politicalItems = ["Party Registration Guide", "Register Party Form"]
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
    <div className={`navbar__bottom ${responsive} flex items-center justify-between pt-2`}>
     <Image className='cursor-pointer' src='/images/govLogo.jpeg' height={100} width={100} alt="election-logo" onClick={() => navigate("/")} />
     <div className='center__content text-center text-red-700 -ml-[15px]'>
      <h3 className='max-[1100px]:text-[23px]'>{selectedLanguage && selectedLanguage.label === 'ENGLISH' ? 'Election Commission Nepal' : 'निर्वाचन आयोग नेपाल'}</h3>
      <h6 className='max-[1100px]:text-md'>{selectedLanguage && selectedLanguage.label === 'ENGLISH' ? 'Kantipath, Kathmandu' : 'कान्तिपथ, काठमाण्डौ'}</h6>
     </div>
     <Image src='/images/flag.png' height={40} width={50} alt="nepal-flag" />
    </div>
   </div>
   <div className='py-[12px] flex justify-center items-center bg-blue-900'>
    <div
     className={`${sub_navbar_style} ${responsive} min-[800px]:hidden max-[800px]:flex relative`}
     onClick={() => setOpenVerticalNavbar(!openVerticalNavbar)}
    >
     <GiHamburgerMenu className='text-white text-lg cursor-pointer' />
    </div>

    <div className={`${sub_navbar_style} ${responsive} max-[800px]:hidden text-slate-200`}>
     <div>Home</div>
     <div><Dropdown title="About us" items={aboutItems} /></div>
     <div><Dropdown title="Electoral Framework" items={electoralItems} /></div>
     <div><Dropdown title="Voter Education" items={voterItems} /></div>
     <div><Dropdown title="Political Party" items={politicalItems} /></div>
     <div>Election Result</div>
    </div>
   </div>
   <div className={`absolute h-full w-full flex z-40 lg:hidden ${openVerticalNavbar ? 'block' : 'hidden'}`}>
    <div className={`py-3 ${sub_navbar_style} w-[240px] h-[350px] bg-blue-800 flex-col justify-around absolute rounded-b-[5px]`}>
     <div className={sub_navbar_items_style}>Home</div>
     <div className={sub_navbar_items_style}><Dropdown title="About us" items={aboutItems} /></div>
     <div className={sub_navbar_items_style}><Dropdown title="Electoral Framework" items={electoralItems} /></div>
     <div className={sub_navbar_items_style}><Dropdown title="Voter Education" items={voterItems} /></div>
     <div className={sub_navbar_items_style}><Dropdown title="Political Party" items={politicalItems} /></div>
     <div className={sub_navbar_items_style}>Election Result</div>
    </div>
   </div>
  </div>
 )
}

export default Navbar;
