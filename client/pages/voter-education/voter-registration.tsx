import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb';
import Navbar from '../../components/Navbar';
import { responsive, PROVINCE, DISTRICT, MUNICIPALITY, WARD_NO, SmartContract, GENDER_OPTIONS, VOTE_ELIBILITY_AGE } from '../../constants';
import { registerVoter } from '../../utils/action';
import { toast } from 'react-toastify';
import { getConvertedAge, getFormattedErrorMessage, getVoterList } from '../../utils';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import _ from 'lodash';
import { PulseLoader } from 'react-spinners';

const defaultOptions = { label: '', value: '' };
declare const window: any;

const VoterRegistration = () => {
  const [voterLists, setVoterLists] = useState([]);
  const [translateProvinceOptions, setTranslateProvinceOptions] = useState([]);
  const [districtProvinceOptions, setDistrictProvinceOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [selectedProvince, setSelectProvince] = useState(defaultOptions);
  const [selectedDistrict, setSelectDistrict] = useState(defaultOptions);
  const [voterDetails, setVoterDetails] = useState({
    fullName: "", citizenshipNumber: "", province: "", district: "", municipality: "", ward: "",
    email: "", profileUrl: null, dob: null, gender: ""
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);

  const loggedInAccountAddress = useSelector((state: any) => state.loggedInUserReducer.address);
  const voterT = useTranslations("voter");
  const VoterRegistrationT = useTranslations("voter_registration");
  const commonT = useTranslations("common");
  const homepageTranslate = useTranslations("homepage");
  const officesTranslate = useTranslations("election_offices");
  const municipalityT = useTranslations("municipalities");
  const wardT = useTranslations("ward");

  useEffect(() => {
    (async () => {
      const voterlists = await getVoterList();
      setVoterLists(voterlists);
    })();
  }, []);

  useEffect(() => {
    setTranslateProvinceOptions(PROVINCE.map((province: any) => ({ label: homepageTranslate(province.value), value: province.value })));
    setDistrictProvinceOptions(DISTRICT[selectedProvince?.value]?.map((district: any) => ({ label: officesTranslate(district.value.toLowerCase()), value: district.value })));
    setMunicipalityOptions(MUNICIPALITY[selectedDistrict?.value]?.map((municipality: any) => ({ label: municipalityT(municipality.label?.split(" ")[0].toLowerCase()), value: municipality.value })));
  }, [selectedProvince, selectedDistrict]);

  useEffect(() => {
    const {
      fullName,
      citizenshipNumber,
      province,
      district,
      municipality,
      ward, email,
      dob, gender
    } = voterDetails;

    if (!fullName || !citizenshipNumber || !province || !district ||
      !municipality || !ward || !email || !dob || !gender) setIsSubmitBtnDisabled(true);
    else setIsSubmitBtnDisabled(false);
  }, [voterDetails]);

  // upload voterDetails
  const onSubmit = async () => {
    try {
      if (!window?.ethereum) return toast.warn("Please install metamask wallet.");

      setLoading(true);
      setIsSubmitBtnDisabled(true);

      const formData = new FormData();
      const {
        fullName,
        citizenshipNumber,
        province,
        district,
        municipality,
        ward, email,
        profileUrl, dob, gender
      } = voterDetails;

      formData.append("fullName", fullName);
      formData.append("citizenshipNumber", citizenshipNumber);
      formData.append("province", province);
      formData.append("district", district);
      formData.append("municipality", municipality);
      formData.append("ward", ward);
      formData.append("email", email);
      formData.append("profile", profileUrl);

      const age = getConvertedAge(dob);

      // age eligibility check
      if (age < VOTE_ELIBILITY_AGE) return toast.error(`Voter age must be greater or equal to ${VOTE_ELIBILITY_AGE}`);


      // email format validation
      if (!(email.indexOf("@") > 0 && email.indexOf(".") > 0)) {
        setLoading(false);
        return toast.error("Email format is wrong !");
      }

      // check if candidate already exists
      const isExits = voterLists?.find((d: any) => d.user?.citizenshipNumber?.includes(citizenshipNumber));
      if (isExits) throw new Error("Voter already exists on given citizenship nuber !");

      // check if duplicate email
      const isDuplicate = voterLists?.find((d: any) => d.user?.email?.toLowerCase()?.includes(email?.toLowerCase()));
      if (isDuplicate) throw new Error("Given email address is already registered !");

      const { profile }: any = await registerVoter(formData);

      await SmartContract.methods.addVoter(
        fullName,
        citizenshipNumber,
        age,
        dob,
        email,
        profile,
        province,
        district,
        municipality,
        ward,
        gender
      ).send({ from: loggedInAccountAddress });

      toast.success("New Voter registered successfully");
      setLoading(false);
      setIsSubmitBtnDisabled(true);
    } catch (error) {
      let errorMsg = getFormattedErrorMessage(error.message);
      errorMsg = errorMsg.length > 0 ? errorMsg : error.message;
      console.error({ errorMsg })

      toast.error(errorMsg, { toastId: 2 });
      setLoading(false);
      setIsSubmitBtnDisabled(true);
    }

  }
  return (
    <div className='mb-[50px]'>
      <Head>
        <title>{voterT("title")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar /><br />
      <div className='w-full flex lg:justify-center xsm:justify-start'>
        <div className={`${responsive} flex justify-start rounded-1 px-2`}>
          <BreadCrumb routes={[voterT("breadcumb2"), voterT("breadcumb4")]} />
        </div>
      </div><br /><br />
      <div className='w-full flex justify-center'>
        <div className={`lg:px-5 md:px-5 sm:px-3 xsm:px-3 pt-4 pb-5 lg:w-[550px] md:w-[550px] sm:w-full xsm:w-full h-fit flex-col justify-between rounded-[2px] flex-wrap text-[15px] bg-slate-100 shadow-sm`}>
          <h4 className='mt-2 mb-4'>{VoterRegistrationT("form_title")}</h4>
          <div className='flex justify-between'>
            <div className='w-100 text-[15px]'>
              <span>{VoterRegistrationT("fullname_label")}</span>
              <input
                className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1'
                type="text"
                placeholder={commonT("uname_placeholder")}
                onChange={(e) => setVoterDetails({ ...voterDetails, fullName: e.target.value })}
              />
            </div>
          </div>
          <div className='flex lg:flex-row md:flex-row sm:flex-row xsm:flex-col justify-between items-center mt-4'>
            <div className='lg:w-[60%] sm:w-[60%] xsm:w-full'>
              <span>{VoterRegistrationT("citizenship_label")}</span>
              <input
                className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1 shadow-none outline-0'
                type="number"
                placeholder={commonT("citizenship_placholder")}
                onChange={(e) => setVoterDetails({ ...voterDetails, citizenshipNumber: e.target.value })}
              />
            </div>
            <div className='lg:w-[35%] sm:w-[35%] xsm:w-full sm:mt-0 xsm:mt-4'>
              <span>{VoterRegistrationT("gender_label")}</span>
              <Select
                className='mt-1'
                options={GENDER_OPTIONS.map((d) => ({ label: commonT(d.label.toLocaleLowerCase()), value: d.value }))}
                onChange={(option) => setVoterDetails({ ...voterDetails, gender: option.value })}
                placeholder={commonT("gender_placeholder")} />
            </div>
          </div>
          <div className='flex lg:flex-row sm:flex-row xsm:flex-col justify-between my-4'>
            <div>
              <span>{VoterRegistrationT("province_label")}</span>
              <Select
                options={translateProvinceOptions}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full mr-2 mt-1"
                placeholder={<div>{commonT("province_placeholder")}</div>}
                onChange={(item) => {
                  setSelectProvince(item);
                  setVoterDetails({ ...voterDetails, province: item.value })
                }}
              />
            </div>
            <div className='lg:mt-1 sm:mt-1 xsm:mt-5'>
              <span>{VoterRegistrationT("district_label")}</span>
              <Select
                options={districtProvinceOptions}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full sm:mt-0 xsm:mt-1"
                placeholder={<div>{commonT("district_placeholder")}</div>}
                onChange={(item: any) => {
                  setSelectDistrict(item);
                  setVoterDetails({ ...voterDetails, district: item.value })
                }}
                isDisabled={selectedProvince?.label ? false : true}
              />
            </div>
          </div>
          <div className='flex lg:flex-row sm:flex-row xsm:flex-col justify-between'>
            <div>
              <span>{VoterRegistrationT("municipality_label")}</span>
              <Select
                options={municipalityOptions}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full mr-2 mt-1"
                placeholder={<div>{commonT("municipality_placeholder")}</div>}
                onChange={(item: any) => {
                  setVoterDetails({ ...voterDetails, municipality: item.value })
                }}
                isDisabled={voterDetails?.district ? false : true}
              />
            </div>
            <div className='lg:mt-1 sm:mt-1 xsm:mt-5'>
              <span>{VoterRegistrationT("ward_label")}</span>
              <Select
                options={WARD_NO.map((d) => ({ label: wardT(`w${d.label}`), value: d.value }))}
                className="lg:w-[220px] sm:w-[220px] xsm:w-full xsm:mt-1 sm:mt-0 xsm:mt-1"
                placeholder={<div>{commonT("ward_placeholder")}</div>}
                onChange={(item: any) => {
                  setVoterDetails({ ...voterDetails, ward: item.value })
                }}
                isDisabled={voterDetails?.municipality ? false : true}
              />
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100'>
              <span>{VoterRegistrationT("dob_label")}</span>
              <input
                className='form-control shadow-none outline-0 font-monospace'
                type="datetime-local"
                onChange={(e) => setVoterDetails({ ...voterDetails, dob: e.target.value })}
              />
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100'>
              <span>{VoterRegistrationT("email_label")}</span>
              <input
                className='overrideInputStyle form-control py-[10px] rounded-1 mt-1'
                type="email"
                onChange={(e) => setVoterDetails({ ...voterDetails, email: e.target.value })}
              />
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100'>
              <span>{VoterRegistrationT("photo_label")}</span>
              <input
                className='overrideInputStyle form-control py-[10px] rounded-1 mt-1'
                type="file"
                name="file"
                accept='image/*, image/jpeg, image/png, image/gif'
                onChange={(e) => setVoterDetails({ ...voterDetails, profileUrl: e.target.files[0] })}
              />
            </div>
          </div>
          <div className='flex justify-between mt-[30px] mb-1'>
            <button
              className={`btn bg-btnColor text-light h-[45px] w-100 rounded-[5px] ${!loading ? "hover:opacity-75" : "bg-blue-600"}`}
              onClick={onSubmit}
              disabled={isSubmitBtnDisabled}
            >
              {loading ?
                <span className='text-slate-300 flex justify-center items-center'>
                  <PulseLoader color='#dedede' size={9} className='mr-3' /> {VoterRegistrationT("registering_label")}
                </span> :
                <>{VoterRegistrationT("button_label")}</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoterRegistration;
