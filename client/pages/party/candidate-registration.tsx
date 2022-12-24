import React, { useState } from 'react';
import Select from 'react-select'
import Navbar from '../../components/Navbar';
import { responsive, PROVINCE, DISTRICT, MUNICIPALITY, WARD_NO } from '../../constants';
import { registerCandidate } from '../../utils/action';
import { toast } from 'react-toastify';

const VoterRegistration = () => {
 const [selectedProvince, setSelectProvince] = useState({ label: '', value: '' });
 const [candidateDetails, setCandidateDetails] = useState({
  fullName: "", citizenshipNo: "", province: "", district: "", municipality: "", ward: "",
  email: "", profile: null
 });

 // upload candidateDetails
 const onSubmit = async () => {
  try {
   const formData = new FormData();
   formData.append("fullName", candidateDetails.fullName);
   formData.append("citizenshipNumber", candidateDetails.citizenshipNo);
   formData.append("province", candidateDetails.province);
   formData.append("district", candidateDetails.district);
   formData.append("municipality", candidateDetails.municipality);
   formData.append("ward", candidateDetails.ward);
   formData.append("email", candidateDetails.email);
   formData.append("profile", candidateDetails.profile);

   await registerCandidate(formData);

   toast.success("Candidate registered successfully", { toastId: 1 });
  } catch (error) {
   toast.error("Failed to register !", { toastId: 2 });
  }

 }

 return (
  <div className='mb-[50px]'>
   <Navbar /><br />
   <div className='w-full flex justify-center'>
    <div className={`px-5 pt-4 pb-5 w-[550px] h-fit flex-col justify-between rounded-[2px] flex-wrap text-[15px] bg-slate-100 shadow-sm`}>
     <h4 className='mt-2 mb-4'>Fillup Details</h4>
     <div className='flex justify-between'>
      <div className='w-100 text-[15px]'>
       <span>Full Name &nbsp; &nbsp;(Acc. to Citizenship)</span>
       <input
        className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1'
        type="text"
        placeholder="E.g  John Doe"
        onChange={(e) => setCandidateDetails({ ...candidateDetails, fullName: e.target.value })}
       />
      </div>
     </div>
     <div className='flex justify-between mt-4'>
      <div className='w-100'>
       <span>Enter Citizenship Number</span>
       <input
        className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1'
        type="text"
        placeholder="E.g  0054-2334"
        onChange={(e) => setCandidateDetails({ ...candidateDetails, citizenshipNo: e.target.value })}
       />
      </div>
     </div>
     <div className='flex justify-between my-4'>
      <div>
       <span>Province</span>
       <Select
        options={PROVINCE}
        className="w-[220px] mr-2 mt-1"
        placeholder={<div>Select Province</div>}
        onChange={(item) => {
         setSelectProvince(item);
         setCandidateDetails({ ...candidateDetails, province: item.label })
        }}
       />
      </div>
      <div>
       <span>District</span>
       <Select
        options={DISTRICT[selectedProvince.value]}
        className="w-[220px] mt-1"
        placeholder={<div>Select District</div>}
        onChange={(item: any) => {
         setSelectProvince(item);
         setCandidateDetails({ ...candidateDetails, district: item.label })
        }}
        isDisabled={selectedProvince?.label ? false : true}
       />
      </div>
     </div>
     <div className='flex justify-between'>
      <div>
       <span>Municipality</span>
       <Select
        options={MUNICIPALITY[selectedProvince.value]}
        className="w-[220px] mr-2 mt-1"
        placeholder={<div>Select Municipality</div>}
        onChange={(item: any) => {
         setSelectProvince(item);
         setCandidateDetails({ ...candidateDetails, municipality: item.label })
        }}
        isDisabled={candidateDetails?.district ? false : true}
       />
      </div>
      <div>
       <span>Ward Number</span>
       <Select
        options={WARD_NO}
        className="w-[220px] mt-1"
        placeholder={<div>Select Ward</div>}
        onChange={(item: any) => {
         setSelectProvince(item);
         setCandidateDetails({ ...candidateDetails, ward: item.label })
        }}
        isDisabled={candidateDetails?.municipality ? false : true}
       />
      </div>
     </div>
     <div className='flex justify-between mt-4'>
      <div className='w-100'>
       <span>Email Address</span>
       <input
        className='overrideInputStyle form-control py-[10px] rounded-1 mt-1'
        type="email"
        onChange={(e) => setCandidateDetails({ ...candidateDetails, email: e.target.value })}
       />
      </div>
     </div>
     <div className='flex justify-between mt-4'>
      <div className='w-100'>
       <span>Choose Voter Photo</span>
       <input
        className='overrideInputStyle form-control py-[10px] rounded-1 mt-1'
        type="file"
        name="file"
        onChange={(e) => setCandidateDetails({ ...candidateDetails, profile: e.target.files[0] })}
       />
      </div>
     </div>
     <div className='flex justify-between mt-[30px] mb-1'>
      <button className='bg-blue-900 text-light py-2 w-100 rounded-[5px] hover:opacity-75' onClick={onSubmit}>Register</button>
     </div>
    </div>
   </div>
  </div>
 )
}

export default VoterRegistration;
