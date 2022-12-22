import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Navbar from '../../components/Navbar';
import BreadCrumb from '../../components/BreadCrumb';
import { DISTRICT, PROVINCE, WARD_NO, responsive } from '../../constants';
import UserCard from '../../components/UserCard';
import { getVoterLists } from './actions';
import { AxiosResponse } from 'axios';

const Details: React.FC = (): React.ReactElement => {
 const [selectedProvince, setSelectProvince] = useState({ label: '', value: '' });
 const [voterLists, setVoterLists] = useState([]);

 useEffect(() => {
  (async () => {
   try {
    const res = await getVoterLists({ skip: 0 });
    res && setVoterLists(res?.data.data)
   } catch (error) {
    console.error(error);
   }

  })();
 }, []);

 return (
  <div className='mb-[50px]'>
   <Navbar /><br />
   <div className='w-full flex justify-center px-5'>
    <div className={`${responsive} flex-col justify-start rounded-1`}>
     <BreadCrumb routes={["Voter Education", ["Voter Roll"]]} />
     <div className='flex items-center justify-between'>
      <p className='text-2xl text-black mt-4'>Voter Roll</p>
      <div className='flex justify-between my-4'>
       <Select
        options={PROVINCE}
        className="w-[180px] mt-1"
        placeholder={<div>Select Province</div>}
        onChange={(item) => {
         setSelectProvince(item);
        }}
       />
       <Select
        options={DISTRICT[selectedProvince.value]}
        className="w-[180px] mx-2 mt-1"
        placeholder={<div>Select District</div>}
        onChange={(item: any) => {
         setSelectProvince(item);
        }}
       />
       <Select
        options={PROVINCE}
        className="w-[180px] mt-1"
        placeholder={<div>Select Municip...</div>}
        onChange={(item: any) => {
         setSelectProvince(item);
        }}
       />
       <Select
        options={WARD_NO}
        className="w-[150px] mx-2 mt-1"
        placeholder={<div>Select Ward</div>}
        onChange={(item: any) => {
         setSelectProvince(item);
        }}
       />
      </div>
     </div><br />
     <div className='voter__container flex flex-wrap justify-between'>
      {
       voterLists && voterLists.map((voterDetails, i) => <UserCard details={voterDetails} type="voter" key={i} />)
      }
     </div>
    </div>
   </div>
  </div>
 )
}

export default Details;
