import React, { ReactElement, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { AiOutlineMail, AiOutlineSearch, AiOutlineLogout, AiOutlineUserSwitch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiCopy } from 'react-icons/bi';
import _ from 'lodash';
import Web3 from 'web3';
import ElectionModal from './ElectionModal';
import Avatar from './Avatar';
import { LANGUAGES, responsive, sub_navbar_items, sub_navbar_style, sub_navbar_items_style } from '../constants/index';
import { LanguageStruct } from '../interfaces';
import { getStorage, setStorage } from '../services';
import Dropdown from './Dropdown';
import MarqueeBar from './MarqueeBar';
import SearchModal from './SearchModal';
import { trimAddress } from '../utils';

declare var window: any;

const Navbar: React.FC = (): ReactElement => {
  const [selectedLanguage, setSelectedLanguage] = useState({ label: 'english', value: 'ENGLISH' });
  const [openVerticalNavbar, setOpenVerticalNavbar] = useState(false);
  const [openTopVerticalNavbar, setOpenTopVerticalNavbar] = useState(false);
  const [showCreateElectionModal, setShowCreateElectionModal] = useState(false);
  const [isSearchModalOpen, setOpenSearchModal] = useState(false);
  const [loggedInAccountAddress, setLoggedInAccountAddress] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);


  const route = useRouter();
  const electionData = useSelector((state: any) => state?.electionReducer);

  // on mount
  useEffect(() => {
    if (window.ethereum) {
      setLoggedInAccountAddress(getStorage("loggedInAccountAddress"));
      window.ethereum.enable().then(handleLogin);
    }
  }, [])

  // redirect to gmail
  const navigate = (path: string) => {
    path !== "mail" ? route.push(path) : window.open(process.env.NEXT_PUBLIC_GMAIL_REDIRECT_URL, "_blank");
  }

  const openSearchModal = () => {
    setOpenSearchModal(!isSearchModalOpen)
  }

  const openProfile = () => {
    setOpenProfileDropdown(!openProfileDropdown)
  }

  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const val: LanguageStruct | undefined = _.find(LANGUAGES, { value: e.target.value });
    setSelectedLanguage(val ?? selectedLanguage);
  };

  const onCreateElection = () => {
    setShowCreateElectionModal(!showCreateElectionModal);
  }

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const loggedInAccountAddress = Web3.utils.toChecksumAddress(accounts[0]);
        setLoggedInAccountAddress(loggedInAccountAddress);
        setIsLoggedIn(true);
        setStorage("loggedInAccountAddress", loggedInAccountAddress);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLogout = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setLoggedInAccountAddress(null);
        setIsLoggedIn(false);
        setStorage("loggedInAccountAddress", null)
      } catch (error) {
        console.error(error);
      }
    }
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(isAddressCopied ? " " : loggedInAccountAddress);
    setIsAddressCopied(!isAddressCopied);
  }


  return (
    <div className='navbar__container'>
      {electionData && electionData.startDate && <MarqueeBar counterData={electionData} />}
      <div className='navbar__top py-2 w-full flex lg:justify-end sm:justify-start items-center bg-slate-100 px-2'>

        {/* sidebar */}
        <div
          className={`${sub_navbar_style} ${responsive} lg:hidden sm:flex relative`}
          onClick={() => setOpenTopVerticalNavbar(!openTopVerticalNavbar)}
        >
          <GiHamburgerMenu className='text-dark text-lg cursor-pointer' />
        </div>


        {/*  vertical-top-navbar */}
        <div className={`vertical__navbar absolute left-0 ml-[25px] mt-[40px] shadow-inner z-50 flex lg:hidden ${openTopVerticalNavbar ? 'block' : 'hidden'}`}>
          <div className={`px-4 pt-3 pb-4 w-[220px] h-[240px] bg-slate-100 absolute rounded-b-[5px] text-slate-600 text-[16px]`}>
            <div onClick={() => navigate("/")}>CREATE ELECTION</div>
            <div className="my-[18px]" onClick={() => navigate("/FAQ")}>FAQ</div>
            <select className='form-control py-1 cursor-pointer hover:opacity-70 outline-0' onChange={onLanguageChange}>
              {LANGUAGES.map((d, i) => <option className='text-[14px]' key={i} value={d.value}>{d.label}</option>)}
            </select>
            <div className='my-[18px] cursor-pointer hover:opacity-70 flex items-center' onClick={() => navigate("mail")}>Gmail <AiOutlineMail className='text-lg ml-3' /></div>
            <div className='cursor-pointer hover:opacity-70 flex items-center' onClick={openSearchModal}>Search <AiOutlineSearch className='text-xl ml-3' /></div>
          </div>
        </div>


        {/*  */}
        <div className='items w-[600px] justify-around items-center text-slate-600 lg:flex sm:hidden'>
          <span className='pr-5 text-sm cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={onCreateElection}>CREATE ELECTION</span>
          <span className='pr-4 text-sm cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={() => navigate("/FAQ")}>FAQ</span>
          <select className='text-sm cursor-pointer hover:opacity-70 bg-slate-100 outline-0' onChange={onLanguageChange}>
            {LANGUAGES.map((d, i) => <option key={i} value={d.value}>{d.label}</option>)}
          </select>
          <span className='px-4 cursor-pointer hover:opacity-70 border-r-2 border-slate-400 border-l-2 border-slate-400' onClick={() => navigate("mail")}><AiOutlineMail className='text-lg' /></span>
          <span className='pl-1 pr-4 cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={openSearchModal}><AiOutlineSearch className='text-xl' /></span>
          {
            isLoggedIn ?
              <div className='flex items-center cursor-pointer hover:opacity-60' onClick={openProfile}>
                {/* <Avatar className='avatar' src="/images/parbat.png" alt="profile" size='sm' border={1} /> */}
                <span className=''>{trimAddress(loggedInAccountAddress)}</span>
              </div> :
              <button
                className='px-1 py-[3px] rounded-1 border-light flex items-center bg-blue-900 text-light text-sm'
                onClick={handleLogin}
              >
                <img className='mx-1' src={"/images/metamask.png"} height="20" width="20" />
                <span className='mr-2 text-light text-[14px]'>{loading ? "Connecting" : "Connect Wallet"}</span>
              </button>
          }
          {
            openProfileDropdown && isLoggedIn &&
            <div className='profile__dropdown position-absolute bg-slate-100 py-2 px-2 mr-1 right-0 mt-[165px] shadow-sm'>
              <div className='profile__dropdown__items flex flex-column'>
                <span className='flex items-center'><AiOutlineUserSwitch className='mr-3' /> Switch Account</span>
                <span className={`flex items-center ${isAddressCopied && "bg-red-100 hover:bg-red-100"}`} onClick={copyToClipboard}><BiCopy className='mr-3' />{isAddressCopied ? "Copied" : "Copy Address"}</span>
                <span className='flex items-center' onClick={handleLogout}><AiOutlineLogout className='mr-3' /> Logout</span>
              </div>
            </div>
          }
        </div>
      </div>


      <div className='flex justify-center'>
        <div className={`navbar__bottom ${responsive} w-full flex items-center justify-content-between pt-2 md:px-3 sm:p-0`}>
          <Image className='cursor-pointer sm:p-3' src='/images/govLogo.jpeg' height={100} width={100} alt="election-logo" onClick={() => navigate("/")} />
          <div className='center__content text-center text-red-700 -ml-[15px]'>
            <h4 className='lg:text-3xl sm:text-2xl'>{selectedLanguage && selectedLanguage.label === 'ENGLISH' ? 'Election Commission Nepal' : 'निर्वाचन आयोग नेपाल'}</h4>
            <h6 className='lg:text-lg sm:text-lg'>{selectedLanguage && selectedLanguage.label === 'ENGLISH' ? 'Kantipath, Kathmandu' : 'कान्तिपथ, काठमाण्डौ'}</h6>
          </div>
          <Image className='sm:p-1' src='/images/flag.png' height={40} width={50} alt="nepal-flag" />
        </div>
      </div>


      {/* bottom navbar */}
      <div className='py-[12px] w-full flex lg:justify-center sm:justify-start items-center bg-blue-900'>
        <div
          className={`${sub_navbar_style} ${responsive} lg:hidden sm:flex relative`}
          onClick={() => setOpenVerticalNavbar(!openVerticalNavbar)}
        >
          <GiHamburgerMenu className='text-white text-lg cursor-pointer ml-3' />
        </div>

        <div className={`${sub_navbar_style} ${responsive} lg:flex sm:hidden text-slate-200`}>
          <div onClick={() => navigate("/")}>Home</div>
          <div><Dropdown title="About us" items={sub_navbar_items.aboutItems} /></div>
          <div><Dropdown title="Electoral Framework" items={sub_navbar_items.electoralItems} /></div>
          <div><Dropdown title="Voter Education" items={sub_navbar_items.voterItems} /></div>
          <div><Dropdown title="Political Party" items={sub_navbar_items.politicalItems} /></div>
          <div><Dropdown title="Election Result" items={sub_navbar_items.electionResultTypes} /></div>
        </div>
      </div>
      <div className={`absolute h-full w-full flex z-40 lg:hidden ${openVerticalNavbar ? 'block' : 'hidden'}`}>
        <div className={`py-3 ${sub_navbar_style} w-[240px] h-[350px] bg-blue-900 flex-col justify-around absolute rounded-b-[5px]`}>
          <div className={sub_navbar_items_style} onClick={() => navigate("/")}>Home</div>
          <div className={sub_navbar_items_style}><Dropdown title="About us" items={sub_navbar_items.aboutItems} /></div>
          <div className={sub_navbar_items_style}><Dropdown title="Electoral Framework" items={sub_navbar_items.electoralItems} /></div>
          <div className={sub_navbar_items_style}><Dropdown title="Voter Education" items={sub_navbar_items.voterItems} /></div>
          <div className={sub_navbar_items_style}><Dropdown title="Political Party" items={sub_navbar_items.politicalItems} /></div>
          <div className={sub_navbar_items_style}><Dropdown title="Election Result" items={sub_navbar_items.electionResultTypes} /></div>
        </div>
      </div>
      <ElectionModal show={showCreateElectionModal} setShowCreateElectionModal={setShowCreateElectionModal} />
      <SearchModal show={isSearchModalOpen} setOpenSearchModal={setOpenSearchModal} />
    </div>
  )
}

export default Navbar;
