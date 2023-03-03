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

let originalVoterList = [];
let voterEvent: any = null;

const Details: React.FC = (): React.ReactElement => {
  const [voterLists, setVoterLists] = useState([]);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
      <div className='w-full flex justify-center px-5'>
        <div className={`${responsive} flex-col justify-start rounded-1`}>
          <BreadCrumb routes={["Voter Education", ["Voter Roll"]]} />
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-black mt-4'>Voter Roll</p>
            <Sortbar
              openSortModal={openSortModal}
              setOpenSortModal={setOpenSortModal}
              stateLists={voterLists}
              setStateList={setVoterLists}
              originalList={originalVoterList}
              showPartyOptions={false}
            />
          </div><br />
          <div className='voter__container flex flex-wrap justify-between'>
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
