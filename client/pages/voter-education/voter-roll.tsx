import React from 'react';
import Select from 'react-select';
import Navbar from '../../components/Navbar';
import BreadCrumb from '../../components/BreadCrumb';
import { responsive } from '../../constants';
import UserCard from '../../components/UserCard';

const Details: React.FC = (): React.ReactElement => {
 const userDetails = {
  citizenship: "12-323023",
  name: "Parbat Lama",
  dob: "2057-34-23",
  profileSrc: "/images/parbat.png",
  education: "Bsc Computer Science",
  district: "Kathmandu",
  address: "Kapan, Kathmandu",
  contact: "9818232343",
  email: "parbat@gmail.com"
 }

 return (
  <div className='mb-[50px]'>
   <Navbar /><br />
   <div className='w-full flex justify-center px-5'>
    <div className={`${responsive} flex justify-start rounded-1`}>
     <BreadCrumb routes={["Voter Education", ["Voter Roll"]]} />
    </div>
   </div><br />
   <div className='w-full flex justify-center px-5'>
    <div className={`${responsive} text-[17px]`}>
     <div className='title___bar flex justify-between items-center'>
      <p className='text-2xl text-black mt-2'>Voter Roll</p>
      <div className='flex'>
       <Select className='w-[200px] mr-4' options={[{ label: "Province 1", value: "Province 1" }]} placeholder={<div>Province</div>} />
       <Select className='w-[200px]' options={[{ label: "District", value: "District" }]} placeholder={<div>District</div>} />
      </div>
     </div><br />
     <div className='voter__container flex flex-wrap justify-between'>
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
      <UserCard details={userDetails} type="voter" />
     </div>
    </div>
   </div>
  </div >
 )
}

export default Details;
