import React, { ReactElement, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMail, AiOutlineSearch, AiOutlineLogout, AiOutlineUserSwitch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import ElectionModal from './ElectionModal';
import Avatar from './Avatar';
import { LANGUAGES, responsive, sub_navbar_items, sub_navbar_style, sub_navbar_items_style } from '../constants/index';
import { LanguageStruct } from '../interfaces';
import { getStorage, setStorage } from '../services';
import { setWalletDetails } from '../redux/WalletDetailsReducer';
import Dropdown from './Dropdown';
import MarqueeBar from './MarqueeBar';
import SearchModal from './SearchModal';

declare var window: any;

const Navbar: React.FC = (): ReactElement => {
  const [selectedLanguage, setSelectedLanguage] = useState({ label: 'english', value: 'ENGLISH' });
  const [openVerticalNavbar, setOpenVerticalNavbar] = useState(false);
  const [openTopVerticalNavbar, setOpenTopVerticalNavbar] = useState(false);
  const [showCreateElectionModal, setShowCreateElectionModal] = useState(false);
  const [isSearchModalOpen, setOpenSearchModal] = useState(false);
  const [loggedInAccountAddress, setLoggedInAccountAddress] = useState(null);
  const [userCache, setUserCache] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const dispatch = useDispatch();


  const route = useRouter();
  const electionTimeCounterData = useSelector((state: any) => state?.electionTimeCounterReducer.timer);

  // on didmount
  useEffect(() => {
    const loggedInAccountAddressCache = getStorage("loggedInAccountAddress");
    setLoggedInAccountAddress(loggedInAccountAddressCache);
  }, [])

  // open new page
  const navigate = (path: string) => {
    path !== "mail" ? route.push(path) : window.open(process.env.NEXT_PUBLIC_GMAIL_REDIRECT_URL, "_blank");
  }

  // open search modal form
  const openSearchModal = () => {
    setOpenSearchModal(!isSearchModalOpen)
  }

  // open profile component
  const openProfile = () => {
    setOpenProfileDropdown(!openProfileDropdown)
  }

  // on language select
  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const val: LanguageStruct | undefined = _.find(LANGUAGES, { value: e.target.value });
    setSelectedLanguage(val ?? selectedLanguage);
  };

  // create new election
  const onCreateElection = () => {
    setShowCreateElectionModal(!showCreateElectionModal);
  }


  const connectWallet = async () => {
    setLoading(true);

    try {
      if (window?.ethereum?.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const loggedInAccountAddress = Web3.utils.toChecksumAddress(accounts[0]);
        dispatch(setWalletDetails(loggedInAccountAddress));
        setLoggedInAccountAddress(loggedInAccountAddress);
        setStorage("loggedInAccountAddress", loggedInAccountAddress);
      } else {
        toast.info("Please install MetaMask wallet first !", { toastId: 3 })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    setStorage("loggedInAccountAddress", null)
    setLoggedInAccountAddress(null);
  }

  return (
    <div className='navbar__container'>
      {electionTimeCounterData.startDate && <MarqueeBar counterData={electionTimeCounterData} />}
      <div className='navbar__top py-2 w-full flex justify-end items-center bg-slate-100 px-2'>
        <div
          className={`${sub_navbar_style} ${responsive} min-[800px]:hidden max-[800px]:flex relative`}
          onClick={() => setOpenTopVerticalNavbar(!openTopVerticalNavbar)}
        >
          <GiHamburgerMenu className='text-dark text-lg cursor-pointer' />
        </div>
        <div className={`absolute left-0 ml-[25px] mt-[50px] z-50 flex lg:hidden ${openTopVerticalNavbar ? 'block' : 'hidden'}`}>
          <div className={`py-2 ${sub_navbar_style} w-[220px] h-[100px] bg-blue-800 flex-col justify-around absolute rounded-b-[5px]`}>
            <div className={sub_navbar_items_style} onClick={() => navigate("/")}>CREATE ELECTION</div>
            <div className={sub_navbar_items_style} onClick={() => navigate("/FAQ")}>FAQ</div>
            <select className='text-sm cursor-pointer hover:opacity-70 bg-slate-100 outline-0' onChange={onLanguageChange}>
              {LANGUAGES.map((d, i) => <option key={i} value={d.value}>{d.label}</option>)}
            </select>
            <span className='px-4 cursor-pointer hover:opacity-70 border-r-2 border-slate-400 border-l-2 border-slate-400' onClick={() => navigate("mail")}><AiOutlineMail className='text-lg' /></span>
            <span className='pl-1 pr-4 cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={openSearchModal}><AiOutlineSearch className='text-xl' /></span>
          </div>
        </div>
        <span className='pr-5 text-sm cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={onCreateElection}>CREATE ELECTION</span>
        <div className='items w-[450px] flex justify-around items-center text-slate-600'>
          <span className='pr-4 text-sm cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={() => navigate("/FAQ")}>FAQ</span>
          <select className='text-sm cursor-pointer hover:opacity-70 bg-slate-100 outline-0' onChange={onLanguageChange}>
            {LANGUAGES.map((d, i) => <option key={i} value={d.value}>{d.label}</option>)}
          </select>
          <span className='px-4 cursor-pointer hover:opacity-70 border-r-2 border-slate-400 border-l-2 border-slate-400' onClick={() => navigate("mail")}><AiOutlineMail className='text-lg' /></span>
          <span className='pl-1 pr-4 cursor-pointer hover:opacity-70 border-r-2 border-slate-400' onClick={openSearchModal}><AiOutlineSearch className='text-xl' /></span>
          {
            loggedInAccountAddress ?
              <div className='flex justify-between items-center cursor-pointer hover:opacity-60' onClick={openProfile}>
                <Avatar className='avatar' src="/images/parbat.png" alt="profile" size='sm' border={1} />
                <span className='mx-2'>Parbat Lama</span>
              </div> :
              <button
                className='px-1 py-[3px] rounded-1 border-light flex items-center bg-blue-900 text-light text-sm'
                onClick={connectWallet}
              >
                <img className='mx-1' src={"/images/metamask.png"} height="20" width="20" />
                <span className='mr-2 text-light text-[14px]'>{loading ? "Connecting" : "Connect Wallet"}</span>
              </button>
          }
          {
            openProfileDropdown && loggedInAccountAddress &&
            <div className='profile__dropdown position-absolute bg-slate-100 py-2 px-1 mr-1 right-0 mt-[130px] shadow-sm'>
              <div className='profile__dropdown__items flex flex-column'>
                <span className='flex items-center'><AiOutlineUserSwitch className='mr-3' /> Switch Account</span>
                <span className='flex items-center' onClick={logout}><AiOutlineLogout className='mr-3' /> Logout</span>
              </div>
            </div>
          }
        </div>
      </div>
      <div className='flex justify-center'>
        <div className={`navbar__bottom ${responsive} flex items-center justify-between pt-2 px-3`}>
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
          <GiHamburgerMenu className='text-white text-lg cursor-pointer ml-3' />
        </div>

        <div className={`${sub_navbar_style} ${responsive} max-[800px]:hidden text-slate-200`}>
          <div onClick={() => navigate("/")}>Home</div>
          <div><Dropdown title="About us" items={sub_navbar_items.aboutItems} /></div>
          <div><Dropdown title="Electoral Framework" items={sub_navbar_items.electoralItems} /></div>
          <div><Dropdown title="Voter Education" items={sub_navbar_items.voterItems} /></div>
          <div><Dropdown title="Political Party" items={sub_navbar_items.politicalItems} /></div>
          <div><Dropdown title="Election Result" items={sub_navbar_items.electionResultTypes} /></div>
        </div>
      </div>
      <div className={`absolute h-full w-full flex z-40 lg:hidden ${openVerticalNavbar ? 'block' : 'hidden'}`}>
        <div className={`py-3 ${sub_navbar_style} w-[240px] h-[350px] bg-blue-800 flex-col justify-around absolute rounded-b-[5px]`}>
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
