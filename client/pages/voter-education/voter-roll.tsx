import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import BreadCrumb from '../../components/BreadCrumb';
import { responsive, SmartContract } from '../../constants';
import UserCard from '../../components/UserCard';
import { getVoterList } from '../../utils';
import Sortbar from '../../components/Sortbar';
import { useTranslations } from 'next-intl';
import _ from 'lodash';
import { BsSearch } from 'react-icons/bs';

let originalVoterList = [];
let voterEvent: any = null;

const Details: React.FC = (): React.ReactElement => {
  const [voterLists, setVoterLists] = useState([]);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const voterT = useTranslations("voter");
  const voterRollT = useTranslations("voter_roll");


  const fetchAllData = async () => {
    try {
      setLoading(true);
      const res = await getVoterList();

      if (res) {
        originalVoterList = res;
        setVoterLists(res);
      }


    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {

    fetchAllData();

    voterEvent = SmartContract.events?.VoterCreated().on("data", (event: any) => {
      fetchAllData();
    }).on("error", () => console.error("VoterCreated Event Error !"));

    return () => {
      voterEvent && voterEvent?.unsubscribe();
    }
  }, []);

  const onHandleSearch = (keyword: string) => {
    if (keyword.length === 0) return setVoterLists(originalVoterList);
    const filterSearch = originalVoterList.filter((candidate) => candidate.user.fullName.toUpperCase().includes(keyword.toUpperCase()));
    setVoterLists(filterSearch);
  }

  return (
    <div className='mb-[50px]'>
      <Navbar /><br />
      <div className='w-full flex lg:justify-center lg:px-5 sm:justify-start xsm:px-3'>
        <div className={`${responsive} flex-col justify-start rounded-1 sm:w-full xsm:w-full`}>
          <BreadCrumb routes={[voterT("breadcumb2"), voterRollT("title")]} />
          <div className='flex items-center justify-between'>

            <div className='text-2xl text-black mt-4 relative'>
              {voterRollT("title")}
              {true &&
                <span className='h-[24px] w-6 text-[14px] flex justify-center items-center rounded-circle bg-blue-800 text-slate-100 shadow-lg absolute -top-2 -right-7'>
                  {voterLists?.length ?? 0}
                </span>
              }
            </div>
            <div className='flex'>
              <div className='mx-3 flex items-center bg-slate-100 border border-1 rounded-sm'>
                <input
                  type="search"
                  className='pl-3 form-control outline-0 shadow-none border-0 rounded-0'
                  placeholder={voterRollT("search_placeholder")}
                  onChange={(e: any) => onHandleSearch(e.target.value)}
                  onKeyDown={(e: any) => onHandleSearch(e.target.value)}
                />
                <BsSearch className='mx-3 text-xl' />
              </div>
              <Sortbar
                openSortModal={openSortModal}
                setOpenSortModal={setOpenSortModal}
                stateLists={voterLists}
                setStateList={setVoterLists}
                originalList={originalVoterList}
                showPartyOptions={false}
              />
            </div>
          </div><br />
          <div className='voter__container flex flex-wrap md:justify-between sm:justify-center xsm:justify-center'>
            {loading && <VoterCardSkeleton repeatCount={12} />}
            {
              voterLists ?
                voterLists.map((voterDetails, i) => <UserCard details={voterDetails} type="voter" key={i} />) :
                "No Voters Available !"
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;
