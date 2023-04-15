import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import BreadCrumb from '../../components/BreadCrumb';
import { responsive, SmartContract } from '../../constants';
import UserCard from '../../components/UserCard';
import { getVoterList } from '../../utils';
import { setCandidateList } from '../../redux/reducers/candidateReducer';
import Sortbar from '../../components/Sortbar';
import { useTranslations } from 'next-intl';
import _ from 'lodash';

let originalVoterList = [];
let voterEvent: any = null;

const Details: React.FC = (): React.ReactElement => {
  const [voterLists, setVoterLists] = useState([]);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const voterT = useTranslations("voter");
  const voterRollT = useTranslations("voter_roll");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getVoterList();

        if (res) {
          originalVoterList = res;
          setVoterLists(res);
        }

        voterEvent = SmartContract.events?.VoterCreated().on("data", (event: any) => {
          let tempArray = [...voterLists, event.returnValues[0]];

          tempArray = _.uniqBy(tempArray, (candidate) => {
            return candidate.user.citizenshipNumber;
          });
          setVoterLists(tempArray);
          dispatch(setCandidateList([...voterLists, event.returnValues[0]]));
        }).on("error", () => console.error("VoterCreated Event Error !"));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    })();

    return () => {
      voterEvent && voterEvent?.unsubscribe();
    }
  }, []);

  return (
    <div className='mb-[50px]'>
      <Navbar /><br />
      <div className='w-full flex lg:justify-center lg:px-5 sm:justify-start xsm:px-3'>
        <div className={`${responsive} flex-col justify-start rounded-1 sm:w-full xsm:w-full`}>
          <BreadCrumb routes={[voterT("breadcumb2"), voterRollT("title")]} />
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-black mt-4'>{voterRollT("title")}</p>
            <Sortbar
              openSortModal={openSortModal}
              setOpenSortModal={setOpenSortModal}
              stateLists={voterLists}
              setStateList={setVoterLists}
              originalList={originalVoterList}
              showPartyOptions={false}
            />
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
