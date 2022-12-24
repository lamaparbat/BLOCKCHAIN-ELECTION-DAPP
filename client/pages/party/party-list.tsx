import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import { responsive } from '../../constants';
import PartyCard from '../../components/PartyCard';
import { getPartyLists } from './actions';

const Details: React.FC = (): React.ReactElement => {
  const [partyList, setPartyLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getPartyLists({ skip: 0 });
        res && setPartyLists(res?.data.data)
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className='mb-[50px]'>
      <Navbar /><br />
      <div className='w-full flex justify-center px-5'>
        <div className={`${responsive} flex-col justify-start rounded-1`}>
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-black mt-4'>Party List</p>
            <div className='flex justify-between my-4'>
              <input type='search' className='form-control' placeholder='Search parties' />
            </div>
          </div><br />
          <div className='voter__container flex flex-wrap justify-between'>
            {loading && <VoterCardSkeleton repeatCount={12} />}
            {
              partyList ?
                partyList.map((partyList, i) => <PartyCard lists={partyList} key={i} />) :
                "No Party Available !"
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;
