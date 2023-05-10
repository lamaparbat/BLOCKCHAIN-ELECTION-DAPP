import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineReload } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import Select from 'react-select';
import { DISTRICT, MUNICIPALITY, PROVINCE, WARD_NO } from '../constants';
import { getPartyList, getPartyListOptions } from '../utils';
import { useTranslations } from 'next-intl';
import _ from 'lodash';

const defaultOptions = { label: '', value: '' };

const Sortbar = ({
  openSortModal, setOpenSortModal,
  stateLists, setStateList, originalList, showPartyOptions }) => {
  const [partyList, setPartyList] = useState([]);
  const [selectedProvince, setSelectProvince] = useState(defaultOptions);
  const [selectedDistrict, setSelectDistrict] = useState(defaultOptions);
  const [selectedMunicipality, setSelectMunicipality] = useState(defaultOptions);
  const [selectedWard, setSelectWard] = useState(defaultOptions);
  const [selectedParty, setSelectedParty] = useState(defaultOptions);
  const [translateProvinceOptions, setTranslateProvinceOptions] = useState([]);
  const [districtProvinceOptions, setDistrictProvinceOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);

  const t = useTranslations("sortComp");
  const homepageTranslate = useTranslations("homepage");
  const officesTranslate = useTranslations("election_offices");
  const municipalyTranslate = useTranslations("municipalities");
  const wardT = useTranslations("ward")
  const sortCompT = useTranslations("sortComp");
  const partyT = useTranslations("party");

  useEffect(() => {
    (async () => {
      const partyList = await getPartyList();

      setPartyList(partyList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let sortResult = originalList;

      if (selectedProvince.label.length > 0)
        sortResult = originalList.filter((candidate: any) => candidate.user.province.toUpperCase().includes(selectedProvince.value.toUpperCase()));

      if (selectedDistrict.value.length > 0)
        sortResult = sortResult.filter((candidate: any) => candidate.user.district.toUpperCase().includes(selectedDistrict.value.toUpperCase()));

      if (selectedMunicipality.value.length > 0)
        sortResult = sortResult.filter((candidate: any) => candidate.user.municipality.toUpperCase().includes(selectedMunicipality.value.toUpperCase()));

      if (selectedWard.value.length > 0)
        sortResult = sortResult.filter((candidate: any) => candidate.user.ward.toUpperCase().includes(selectedWard.value.toUpperCase()));

      if (selectedParty.value.length > 0)
        sortResult = sortResult.filter((candidate: any) => candidate.partyName.toUpperCase().includes(selectedParty.value.toUpperCase()));

      setStateList(sortResult);
    })();
  }, [selectedProvince, selectedDistrict, selectedMunicipality, selectedWard, selectedParty]);

  useEffect(() => {
    setTranslateProvinceOptions(PROVINCE.map((province: any) => ({ label: homepageTranslate(province.value), value: province.value })));
    setDistrictProvinceOptions(DISTRICT[selectedProvince?.value]?.map((district: any) => ({ label: officesTranslate(district.value.toLowerCase()), value: district.value })));
    setMunicipalityOptions(MUNICIPALITY[selectedDistrict?.value]?.map((municipality: any) => ({ label: municipalyTranslate(municipality.label?.split(" ")[0].toLowerCase()), value: municipality.value })));
  }, [selectedProvince, selectedDistrict])

  const resetSorting = () => {
    setSelectProvince(defaultOptions);
    setSelectDistrict(defaultOptions);
    setSelectMunicipality(defaultOptions);
    setSelectWard(defaultOptions);
    setSelectedParty(defaultOptions);
    setStateList(originalList);
  }

  return (
    <div className='filter--section'>
      <div
        className={`px-3 py-2 flex items-center rounded-[2px] ${openSortModal ? "bg-red-500 text-slate-100" : "bg-slate-100"} shadow-md hover:cursor-pointer hover:opacity-70`}
        onClick={() => setOpenSortModal(!openSortModal)}
      >
        {!openSortModal ? <>{t("sort")} <BsFilter className='text-2xl ml-2' /></> :
          <>{t("cancel")} <AiOutlineClose className='text-1xl ml-2' /></>}
      </div>
      <div className={`absolute px-3 py-2 flex flex-column bg-white shadow-lg mt-3 sm:w-[500px] xsm:w-[350px] sm:-ml-[400px] xsm:-ml-[230px] z-50 ${!openSortModal && "hidden"}`}>
        <h5 className='mt-3 mb-3'>{t("address")}</h5>
        <div className='flex justify-center items-center sm:flex-row xsm:flex-col'>
          <Select
            options={translateProvinceOptions}
            className="w-100"
            placeholder={<div>{t("select_province")}</div>}
            onChange={(item) => {
              setSelectProvince(item);
            }}
            value={!selectedProvince.label ? { ...defaultOptions, label: t("select_province") } : selectedProvince}
          />
          <Select
            options={districtProvinceOptions}
            className="w-100 mx-2 sm:mt-0 xsm:mt-3"
            placeholder={<div>{t("select_district")}</div>}
            onChange={(item: any) => {
              setSelectDistrict(item);
            }}
            isDisabled={selectedProvince?.label ? false : true}
            value={!selectedDistrict.label ? { ...defaultOptions, label: t("select_district") } : selectedDistrict}
          />
        </div>
        <div className='flex my-3 sm:flex-row xsm:flex-col'>
          <Select
            options={municipalityOptions}
            className="sm:w-50 xsm:w-100"
            placeholder={<div>{t("select_municipality")}</div>}
            onChange={(item: any) => {
              setSelectMunicipality(item);
            }}
            isDisabled={selectedDistrict?.label ? false : true}
            value={!selectedMunicipality.label ? { ...defaultOptions, label: t("select_municipality") } : selectedMunicipality}
          />
          <Select
            options={WARD_NO.map((d) => ({ label: wardT(`w${d.label}`), value: d.value }))}
            className="sm:w-50 xsm:w-100 sm:mx-2 xsm:mx-0 sm:mt-0 xsm:mt-3"
            placeholder={<div>{t("select_ward")}</div>}
            onChange={(item: any) => {
              setSelectWard(item);
            }}
            isDisabled={selectedMunicipality?.label ? false : true}
            value={!selectedWard.label ? { ...defaultOptions, label: t("select_ward") } : selectedWard}
          />
        </div>
        {showPartyOptions &&
          <>
            <h5 className='mt-3 mb-3'>{partyT("title")}</h5>
            <div className='flex'>
              <Select
                options={_.unionBy(getPartyListOptions(partyList), "value")}
                className="w-50"
                placeholder={<div>{sortCompT("select_party")}</div>}
                onChange={(item: any) => {
                  setSelectedParty(item);
                }}
                value={!selectedParty.label ? { ...defaultOptions, label: sortCompT("select_party") } : selectedParty}
              />
            </div>
          </>}

        <div className=' px-2 my-3 flex justify-between items-center'>
          {openSortModal && <span>{t("result")}: {
            (!selectedProvince.label && !selectedDistrict.label && !selectedMunicipality.label && !selectedWard.label && !selectedParty.label)
              ? 0 : stateLists.length}</span>}
          <button
            className='px-2 py-1 rounded-1 bg-blue-900 shadow-md text-slate-200 flex items-center justify-center'
            onClick={resetSorting}
          >
            {t("reset")} <AiOutlineReload className='ml-2' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sortbar;
