import React from 'react';
import Navbar from '../../components/Navbar';
import BreadCrumb from '../../components/BreadCrumb';
import { responsive } from '../../constants';

const Details: React.FC = (): React.ReactElement => {

 return (
  <div className='mb-[50px]'>
   <Navbar /><br />
   <div className='w-full flex justify-center'>
    <div className={`${responsive} flex justify-start rounded-1`}>
     <BreadCrumb routes={["Voter Education", ["Voter Eligibility"]]} />
    </div>
   </div><br />
   <div className='w-full flex justify-center'>
    <div className={`${responsive} flex justify-between rounded-1 flex-wrap text-[17px]`}>
     <p className='text-black'>Voter registration is one of the main functions of the Commission. The registration is fully based on technology and biometrics. ECN has the following features/ className='text-black-300'rovisions for voter registration:</p>
     <h2 className='mt-4 mb-2'><b>About Voter Registration</b></h2>
     <div className='text-black font-normal'>
      <p className='my-3 text-black'>Voter registration is continuous throughout the year.</p>
      Nepalese citizen aged 16 or above can register their names in the voter roll in all the 77 District Election Offices
      and District Administration Offices and voter registration mobile teams as announced by the Commission. However,
      to be eligible voters, they have to be at the age of 18 or  above.<br />
      <p className='my-3 text-black'>Citizenship certificate is required document for the registration,</p>
      <p className='my-3 text-black'>Special registration programs are also conducted depending on the need assessment,</p>
      <p className='my-3 text-black'>Name list of registered voters are integrated and de-duplicated in the central server in the ECN headquarters and segregated data is distributed to the District Election Offices,</p>
      <p className='my-3 text-black'>The matured data, after undergoing all the processes including verification, claims and objection, is produced as the voter roll.</p>
      <p className='my-3 text-black'>Voter's Identity Card is produced and distributed on the basis of the voter roll.</p>
     </div>
    </div>
   </div>
  </div >
 )
}

export default Details;
