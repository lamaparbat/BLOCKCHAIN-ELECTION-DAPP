import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import Navbar from '../../components/Navbar';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import BreadCrumb from '../../components/BreadCrumb';
import { DISTRICT, PROVINCE, MUNICIPALITY, WARD_NO, responsive, SmartContract } from '../../constants';
import UserCard from '../../components/UserCard';
import { getVoterList } from '../../utils';
import { setCandidateList } from '../../redux/reducers/candidateReducer';

const Details: React.FC = (): React.ReactElement => {
  const [selectedProvince, setSelectProvince] = useState({ label: '', value: '' });
  const [selectedDistrict, setSelectDistrict] = useState({ label: '', value: '' });
  const [selectedMunicipality, setSelectMunicipality] = useState({ label: '', value: '' });
  const [selectedWard, setSelectWard] = useState({ label: '', value: '' });
  const [voterLists, setVoterLists] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let voterEvent: any = null;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getVoterList();
        res && setVoterLists(res)

        voterEvent = SmartContract.events?.VoterCreated().on("data", (event: any) => {
          dispatch(setCandidateList([...voterLists, event.returnValues[0]]));
        }).on("error", () => console.error("VoterCreated Event Error !"));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    })();

    return () => {
      voterEvent && voterEvent?.unsubscribe();
    }
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
                  setSelectDistrict(item);
                }}
                isDisabled={selectedProvince?.label ? false : true}
              />
              <Select
                options={MUNICIPALITY[selectedDistrict.value]}
                className="w-[180px] mt-1"
                placeholder={<div>Select Municip...</div>}
                onChange={(item: any) => {
                  setSelectMunicipality(item);
                }}
                isDisabled={selectedDistrict?.label ? false : true}
              />
              <Select
                options={WARD_NO}
                className="w-[150px] mx-2 mt-1"
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
              voterLists ?
                voterLists.map((voterDetails, i) => <UserCard details={voterDetails} type="voter" key={i} />) :
                "No Voters Available !"
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;
