import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Navbar from '../../components/Navbar';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import BreadCrumb from '../../components/BreadCrumb';
import { DISTRICT, PROVINCE, MUNICIPALITY, WARD_NO, responsive, SmartContract } from '../../constants';
import UserCard from '../../components/UserCard';
import { getCandidateList } from '../../utils';

const Details: React.FC = (): React.ReactElement => {
  const [candidateList, setCandidateList] = useState([]);
  const [selectedProvince, setSelectProvince] = useState({ label: '', value: '' });
  const [selectedDistrict, setSelectDistrict] = useState({ label: '', value: '' });
  const [selectedMunicipality, setSelectMunicipality] = useState({ label: '', value: '' });
  const [selectedWard, setSelectWard] = useState({ label: '', value: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let eventInstance: any = null;
    (async () => {
      const list = await getCandidateList();
      setCandidateList(list);

      eventInstance = SmartContract.events?.CandidateCreated().on("data", (event: any) => {
        const {
          address_name: address,
          age,
          agenda,
          citizenshipNumber: citizenshipNo,
          dob,
          email,
          fullName,
          partyName: party,
          profile,
          voteCount
        } = event.returnValues[0];
        const newCandidate = {
          address_name: address,
          age,
          agenda,
          citizenshipNo: citizenshipNo,
          dob,
          email,
          fullName,
          partyName: party,
          profile,
          voteCount
        };
        console.log(candidateList, newCandidate);
        setCandidateList([...candidateList, newCandidate])

      }).on("error", () => console.error("CandidateCreated Event Error !"));
    })();

    return () => {
      eventInstance && eventInstance?.unsubscribe();
    }
  }, []);

  return (
    <div className='mb-[50px]'>
      <Navbar /><br />
      <div className='w-full flex justify-center px-5'>
        <div className={`${responsive} flex-col justify-start rounded-1`}>
          <BreadCrumb routes={["Candidate", ["List"]]} />
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-black mt-4'>Candidate List</p>
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
                  setSelectDistrict(item);
                }}
                isDisabled={selectedProvince?.label ? false : true}
              />
              <Select
                options={MUNICIPALITY[selectedDistrict.value]}
                className="w-[190px] mt-1"
                placeholder={<div>Select Municip...</div>}
                onChange={(item: any) => {
                  setSelectMunicipality(item);
                }}
                isDisabled={selectedDistrict?.label ? false : true}
              />
              <Select
                options={WARD_NO}
                className="w-[160px] mx-2 mt-1"
                placeholder={<div>Select Ward</div>}
                onChange={(item: any) => {
                  setSelectWard(item);
                }}
                isDisabled={selectedMunicipality?.label ? false : true}
              />
            </div>
          </div><br />
          <div className='voter__container flex flex-wrap justify-between'>
            {loading && <VoterCardSkeleton repeatCount={12} />}
            {
              candidateList ?
                candidateList.map((candidateDetails: any, i) => <UserCard details={candidateDetails} type="candidate" key={i} />) :
                "No Candidates Available !"
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;
