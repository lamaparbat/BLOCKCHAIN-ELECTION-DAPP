import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Navbar from '../../components/Navbar';
import { PROVINCE, DISTRICT, MUNICIPALITY, WARD_NO } from '../../constants';
import { registerCandidate, getConvertedAge, getPartyList, getCandidateList } from '../../utils/index';
import { toast } from 'react-toastify';
import { SmartContract } from '../../constants';
import { getStorage } from '../../services';
import { PulseLoader } from 'react-spinners';
import _ from 'lodash';

const CandidateRegistration = () => {
  const [selectedProvince, setSelectProvince] = useState({ label: '', value: '' });
  const [candidateLists, setCandidateLists] = useState([]);
  const [candidateDetails, setCandidateDetails] = useState({
    fullName: "", citizenshipNumber: "", province: "", district: "", municipality: "", ward: "",
    email: "", profile: null, agenda: "", age: 22, dob: null, partyName: null, address: null
  });
  const [partyList, setPartyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  const partyListOption = partyList?.map((d) => {
    return { label: d.name, value: d.name }
  });

  useEffect(() => {
    (async () => {
      const partyList = await getPartyList();
      const candidates = await getCandidateList();

      setCandidateLists(candidates);
      setPartyList(partyList);
    })();
  }, [])

  // upload candidateDetails
  const onSubmit = async () => {
    try {
      // setLoading(true);
      const {
        fullName,
        citizenshipNumber,
        province,
        district,
        municipality,
        ward, email,
        profile, dob,
        partyName, agenda
      } = candidateDetails;

      // check if candidate already exists
      const isExits = _.includes(candidateLists, (candidate: any) => candidate.user.citizenshipNumber === citizenshipNumber);
      if (isExits) return toast.error("Candidate already exists on given citizenship nuber !");

      const age = getConvertedAge(dob);
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("citizenshipNumber", citizenshipNumber);
      formData.append("province", province);
      formData.append("district", district);
      formData.append("municipality", municipality);
      formData.append("ward", ward);
      formData.append("email", email);
      formData.append("profile", profile);

      const { profile: profileUrl } = await registerCandidate(formData);

      if (!profile) throw new Error("Failed to upload image !");

      await SmartContract.methods.addCandidate(
        fullName,
        citizenshipNumber,
        age,
        agenda,
        dob,
        email,
        profileUrl,
        partyName,
        province,
        district,
        municipality,
        ward
      ).send({ from: loggedInAccountAddress });

      toast.success("New candidate registered successfully");
      setLoading(false);
    } catch (error) {
      console.error(error)
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
                className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1 shadow-none outline-0'
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
                className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1 shadow-none outline-0'
                type="number"
                placeholder="E.g  0054-2334"
                onChange={(e) => setCandidateDetails({ ...candidateDetails, citizenshipNumber: e.target.value })}
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
                className='overrideInputStyle form-control py-[10px] rounded-1 mt-1 shadow-none outline-0'
                type="email"
                onChange={(e) => setCandidateDetails({ ...candidateDetails, email: e.target.value })}
              />
            </div>
          </div>
          <div className='flex justify-between items-center my-4'>
            <div className='w-[220px]'>
              <span>DOB</span>
              <input
                className='form-control shadow-none outline-0 font-monospace'
                type="datetime-local"
                onChange={(e) => setCandidateDetails({ ...candidateDetails, dob: e.target.value })}
              />
            </div>
            <div className='w-full ml-2'>
              <span>Party Name</span>
              <Select
                options={partyListOption}
                className="w-[220px]"
                placeholder={<div>Select Party</div>}
                onChange={(item: any) => {
                  setSelectProvince(item);
                  setCandidateDetails({ ...candidateDetails, partyName: item.label })
                }}
              />
            </div>
          </div>
          <div className='mt-4'>
            <span>Agenda</span>
            <textarea
              className='form-control shadow-none outline-0 h-[200px]'
              onChange={(e) => setCandidateDetails({ ...candidateDetails, agenda: e.target.value })}
            ></textarea>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100'>
              <span>Choose Voter Photo</span>
              <input
                className='overrideInputStyle form-control py-[10px] rounded-1 mt-1'
                type="file"
                name="file"
                accept='image/*, image/jpeg, image/png, image/gif'
                onChange={(e) => setCandidateDetails({ ...candidateDetails, profile: e.target.files[0] })}
              />
            </div>
          </div>
          <div className='flex justify-between mt-[30px] mb-1'>
            <button
              className={`bg-blue-900 text-light py-2 w-100 rounded-[5px] ${!loading ? "hover:opacity-75" : "bg-blue-600"}`}
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ?
                <span className='text-slate-300 flex justify-center items-center'>
                  <PulseLoader color='#dedede' size={9} className='mr-3' /> Registering
                </span> : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateRegistration;
