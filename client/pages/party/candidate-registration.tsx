import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Navbar from '../../components/Navbar';
import { PROVINCE, DISTRICT, MUNICIPALITY, WARD_NO, GENDER_OPTIONS, CANDIDATE_ELIGIBILITY_AGE } from '../../constants';
import { registerCandidate, getConvertedAge, getPartyList, getCandidateList } from '../../utils/index';
import { toast } from 'react-toastify';
import { SmartContract } from '../../constants';
import { PulseLoader } from 'react-spinners';
import _ from 'lodash';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const defaultOptions = { label: '', value: '' };
declare const window: any;

const CandidateRegistration = () => {
  const [translateProvinceOptions, setTranslateProvinceOptions] = useState([]);
  const [districtProvinceOptions, setDistrictProvinceOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [selectedProvince, setSelectProvince] = useState(defaultOptions);
  const [selectedDistrict, setSelectDistrict] = useState(defaultOptions);
  const [candidateLists, setCandidateLists] = useState([]);
  const [candidateDetails, setCandidateDetails] = useState({
    fullName: "", citizenshipNumber: "", province: "", district: "", municipality: "", ward: "",
    email: "", profile: null, agenda: "", age: 22, dob: null, partyName: null, address: null, gender: ""
  });
  const [partyList, setPartyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const voterT = useTranslations("voter_registration");
  const candidateT = useTranslations("candidate_registration");
  const commonT = useTranslations("common");
  const homepageTranslate = useTranslations("homepage");
  const officesTranslate = useTranslations("election_offices");
  const municipalityT = useTranslations("municipalities");
  const wardT = useTranslations("ward");
  const loggedInAccountAddress = useSelector((state: any) => state.loggedInUserReducer.address);

  const partyListOption = partyList?.map((d) => {
    return { label: d.name, value: d.name }
  });

  useEffect(() => {
    setTranslateProvinceOptions(PROVINCE.map((province: any) => ({ label: homepageTranslate(province.value), value: province.value })));
    setDistrictProvinceOptions(DISTRICT[selectedProvince?.value]?.map((district: any) => ({ label: officesTranslate(district.value.toLowerCase()), value: district.value })));
    setMunicipalityOptions(MUNICIPALITY[selectedDistrict?.value]?.map((municipality: any) => ({ label: municipalityT(municipality.label?.split(" ")[0].toLowerCase()), value: municipality.value })));
  }, [selectedProvince, selectedDistrict])

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
    if (!window?.ethereum) return toast.warn("Please install metamask wallet.");

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
        partyName, agenda, gender
      } = candidateDetails;

      // check if candidate already exists
      const isExits = _.includes(candidateLists, (candidate: any) => candidate.user.citizenshipNumber === citizenshipNumber);
      if (isExits) return toast.error("Candidate already exists on given citizenship nuber !");

      const age = getConvertedAge(dob);

      // age eligibility check
      if (age < CANDIDATE_ELIGIBILITY_AGE) return toast.error(`Candidate age must be greater or equal to ${CANDIDATE_ELIGIBILITY_AGE}`);

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
        ward, gender
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
      <Head>
        <title>{candidateT("title")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar /><br />
      <div className='w-full flex lg:justify-center sm:justify-center xsm:justify-start'>
        <div className={`lg:px-5 sm:px-3 xsm:px-3 pt-4 pb-5 w-[550px] h-fit flex-col justify-between rounded-[2px] flex-wrap text-[15px] bg-slate-100 shadow-sm`}>
          <h4 className='mt-2 mb-4'>{voterT("form_title")}</h4>
          <div className='flex justify-between'>
            <div className='w-100 text-[15px]'>
              <span>{voterT("citizenship_label")}</span>
              <input
                className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1 shadow-none outline-0 w-30'
                type="text"
                placeholder={commonT("uname_placeholder")}
                onChange={(e) => setCandidateDetails({ ...candidateDetails, fullName: e.target.value })}
              />
            </div>
          </div>
          <div className='flex lg:flex-row sm:flex-row xsm:flex-col justify-between items-center mt-4'>
            <div className='lg:w-[60%] sm:w-[60%] xsm:w-full'>
              <span>Enter Citizenship Number</span>
              <input
                className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1 shadow-none outline-0'
                type="number"
                placeholder={commonT("citizenship_placholder")}
                onChange={(e) => setCandidateDetails({ ...candidateDetails, citizenshipNumber: e.target.value })}
              />
            </div>
            <div className='lg:w-[35%] sm:w-[35%] xsm:w-full xsm:mt-4'>
              <span>{voterT("fullname_label")}</span>
              <Select className='mt-1' options={GENDER_OPTIONS.map((d) => ({ label: commonT(d.label.toLocaleLowerCase()), value: d.value }))} onChange={(option) => setCandidateDetails({ ...candidateDetails, gender: option.value })} placeholder={commonT("gender_placeholder")} />
            </div>
          </div>
          <div className='flex lg:flex-row sm:flex-row xsm:flex-col justify-between my-4'>
            <div>
              <span>{voterT("province_label")}</span>
              <Select
                options={translateProvinceOptions}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full mr-2 mt-1"
                placeholder={<div>{commonT("province_placeholder")}</div>}
                onChange={(item) => {
                  setSelectProvince(item);
                  setCandidateDetails({ ...candidateDetails, province: item.label })
                }}
              />
            </div>
            <div className='lg:mt-1 sm:mt-1 xsm:mt-5'>
              <span>{voterT("district_label")}</span>
              <Select
                options={districtProvinceOptions}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full mt-1"
                placeholder={<div>{commonT("district_placeholder")}</div>}
                onChange={(item: any) => {
                  setSelectDistrict(item);
                  setCandidateDetails({ ...candidateDetails, district: item.label })
                }}
                isDisabled={selectedProvince?.label ? false : true}
              />
            </div>
          </div>
          <div className='flex lg:flex-row sm:flex-row xsm:flex-col'>
            <div>
              <span>{voterT("municipality_label")}</span>
              <Select
                options={municipalityOptions}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full mr-2 mt-1"
                placeholder={<div>{commonT("municipality_placeholder")}</div>}
                onChange={(item: any) => {
                  setCandidateDetails({ ...candidateDetails, municipality: item.label })
                }}
                isDisabled={candidateDetails?.district ? false : true}
              />
            </div>
            <div>
              <span>{voterT("ward_label")}</span>
              <Select
                options={WARD_NO.map((d) => ({ label: wardT(`w${d.label}`), value: d.value }))}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full mt-1"
                placeholder={<div>{commonT("ward_placeholder")}</div>}
                onChange={(item: any) => {
                  setCandidateDetails({ ...candidateDetails, ward: item.label })
                }}
                isDisabled={candidateDetails?.municipality ? false : true}
              />
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100'>
              <span>{voterT("email_label")}</span>
              <input
                className='overrideInputStyle form-control py-[10px] rounded-1 mt-1 shadow-none outline-0'
                type="email"
                onChange={(e) => setCandidateDetails({ ...candidateDetails, email: e.target.value })}
              />
            </div>
          </div>
          <div className='flex lg:flex-row sm:flex-row xsm:flex-col justify-between items-center my-4'>
            <div className='lg:w-[220px] sm:w-[220px] xsm:w-full'>
              <span>{voterT("fullname_label")}</span>
              <input
                className='form-control shadow-none outline-0 font-monospace'
                type="datetime-local"
                onChange={(e) => setCandidateDetails({ ...candidateDetails, dob: e.target.value })}
              />
            </div>
            <div className='w-full ml-2 lg:mt-1 sm:mt-1 xsm:mt-5'>
              <span>{candidateT("party_label")}</span>
              <Select
                options={partyListOption}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full"
                placeholder={<div>{candidateT("party_placeholder")}</div>}
                onChange={(item: any) => {
                  setSelectProvince(item);
                  setCandidateDetails({ ...candidateDetails, partyName: item.label })
                }}
              />
            </div>
          </div>
          <div className='mt-4'>
            <span>{candidateT("agenda_label")}</span>
            <textarea
              className='form-control shadow-none outline-0 h-[200px]'
              onChange={(e) => setCandidateDetails({ ...candidateDetails, agenda: e.target.value })}
            ></textarea>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100'>
              <span>{voterT("photo_label")}</span>
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
                  <PulseLoader color='#dedede' size={9} className='mr-3' /> {candidateT("registering_label")}
                </span> :
                <>{candidateT("register_btn")}</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateRegistration;
