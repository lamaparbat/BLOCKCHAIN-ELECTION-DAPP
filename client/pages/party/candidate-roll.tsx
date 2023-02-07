import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import Navbar from '../../components/Navbar';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import BreadCrumb from '../../components/BreadCrumb';
import { DISTRICT, PROVINCE, MUNICIPALITY, WARD_NO, responsive, SmartContract, ELECTION_TYPE } from '../../constants';
import UserCard from '../../components/UserCard';
import { getCandidateList } from '../../utils';
import { setCandidateList } from '../../redux/candidateReducer';
import { toast } from 'react-toastify';

const Details: React.FC = (): React.ReactElement => {
  const [candidateLists, setCandidateLists] = useState([]);
  const [selectedProvince, setSelectProvince] = useState({ label: '', value: '' });
  const [selectedDistrict, setSelectDistrict] = useState({ label: '', value: '' });
  const [selectedMunicipality, setSelectMunicipality] = useState({ label: '', value: '' });
  const [selectedWard, setSelectWard] = useState({ label: '', value: '' });
  const [isEidtModeOn, setEditModeOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let candidateEvent: any = null;
  const selectedCandidatesPayload = { electionAddress: null, selectedCandidates: [] };

  useEffect(() => {
    (async () => {
      const list = await getCandidateList();
      setCandidateLists(list);

      candidateEvent = SmartContract.events?.CandidateCreated().on("data", (event: any) => {
        dispatch(setCandidateList([...list, event.returnValues[0]]));
      }).on("error", () => console.error("CandidateCreated Event Error !"));
    })();

    return () => {
      candidateEvent && candidateEvent?.unsubscribe();
    }
  }, []);

  const onSubmit = async () => {
    const { electionAddress, selectedCandidates } = selectedCandidatesPayload;
    await SmartContract.methods.addSelectedCandidates(
      electionAddress,
      selectedCandidates
    );

    toast.success("Candidates added successfully .");
  }

  return (
    <div className='mb-[50px]'>
      <Navbar /><br />
      <div className='w-full flex justify-center px-5'>
        <div className={`${responsive} flex-col justify-start rounded-1`}>
          <BreadCrumb routes={["Candidate", ["List"]]} />
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-black mt-4'>Candidate List</p>
            {!isEidtModeOn &&
              <button
                className='btn btn-primary px-3 py-1 rounded-1 outline-0'
                onClick={() => setEditModeOn(true)}
              >Choose Candidates for election</button>}
            {/* <div className='flex justify-between my-4'>
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
            </div> */}
            {isEidtModeOn &&
              <button className='btn btn-primary px-3 py-1 rounded-1 outline-0'>Submit Selection</button>}
          </div><br />
          <div className='voter__container flex flex-wrap justify-between'>
            {loading && <VoterCardSkeleton repeatCount={12} />}
            {
              candidateLists ?
                candidateLists.map((candidateDetails: any, i) => <UserCard details={candidateDetails} type="candidate" key={i} />) :
                "No Candidates Available !"
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;
