import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import Navbar from '../../components/Navbar';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import BreadCrumb from '../../components/BreadCrumb';
import { DISTRICT, PROVINCE, MUNICIPALITY, WARD_NO, responsive, SmartContract } from '../../constants';
import UserCard from '../../components/UserCard';
import { getCandidateList, getElectionList, getPartyList } from '../../utils';
import { setCandidateList } from '../../redux/candidateReducer';
import { toast } from 'react-toastify';
import { BsFilter, BsSearch } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineReload } from 'react-icons/ai';
import _ from 'lodash';
import { getStorage } from '../../services';

const defaultElectedCandidates = { electionAddress: null, selectedCandidates: [] };
const defaultOptions = { label: '', value: '' };
let originalCandidatesList = [];

const Details: React.FC = (): React.ReactElement => {
  const [candidateLists, setCandidateLists] = useState([]);
  const [electionList, setElectionList] = useState([]);
  const [electedCandidatesList, setElectedCandidates] = useState(defaultElectedCandidates);
  const [partyList, setPartyList] = useState([]);
  const [selectedProvince, setSelectProvince] = useState(defaultOptions);
  const [selectedDistrict, setSelectDistrict] = useState(defaultOptions);
  const [selectedMunicipality, setSelectMunicipality] = useState(defaultOptions);
  const [selectedWard, setSelectWard] = useState(defaultOptions);
  const [selectedParty, setSelectedParty] = useState(defaultOptions);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  let candidateEvent: any = null;
  const partyListOption = partyList?.map((d) => {
    return { label: d.name, value: d.name }
  });

  useEffect(() => {
    (async () => {
      let list = await getCandidateList();
      const electionList = await getElectionList();
      const partyList = await getPartyList();

      originalCandidatesList = list;
      setCandidateLists(list);
      setElectionList(electionList);
      setPartyList(partyList);
      setElectedCandidates({
        ...electedCandidatesList,
        electionAddress: electionList.at(-1)?.owner ?? null
      })

      candidateEvent = SmartContract.events?.CandidateCreated().on("data", (event: any) => {
        const tempArray = [...originalCandidatesList, event.returnValues[0]];

        originalCandidatesList = _.uniqBy(tempArray, (candidate) => {
          return candidate.user.citizenshipNumber;
        });
        setCandidateLists(originalCandidatesList);
        dispatch(setCandidateList([...list, event.returnValues[0]]));
      }).on("error", () => console.error("CandidateCreated Event Error !"));
    })();

    return () => {
      candidateEvent && candidateEvent?.unsubscribe();
    }
  }, []);

  useEffect(() => {
    let sortResult = originalCandidatesList;

    if (selectedProvince.label.length > 0)
      sortResult = originalCandidatesList.filter((candidate) => candidate.user.province.toUpperCase().includes(selectedProvince.label.toUpperCase()));

    if (selectedDistrict.label.length > 0)
      sortResult = sortResult.filter((candidate) => candidate.user.district.toUpperCase().includes(selectedDistrict.label.toUpperCase()));

    if (selectedMunicipality.label.length > 0)
      sortResult = sortResult.filter((candidate) => candidate.user.municipality.toUpperCase().includes(selectedMunicipality.label.toUpperCase()));

    if (selectedWard.label.length > 0)
      sortResult = sortResult.filter((candidate) => candidate.user.ward.toUpperCase().includes(selectedWard.label.toUpperCase()));

    if (selectedParty.label.length > 0)
      sortResult = sortResult.filter((candidate) => candidate.partyName.toUpperCase().includes(selectedParty.label.toUpperCase()));

    setCandidateLists(sortResult);
  }, [selectedProvince, selectedDistrict, selectedMunicipality, selectedWard, selectedParty]);

  const onHandleSearch = (keyword: string) => {
    if (keyword.length === 0) return setCandidateLists(originalCandidatesList);
    const filterSearch = candidateLists.filter((candidate) => candidate.user.fullName.toUpperCase().includes(keyword.toUpperCase()));
    setCandidateLists(filterSearch);
  }

  const resetSorting = () => {
    setSelectProvince(defaultOptions);
    setSelectDistrict(defaultOptions);
    setSelectMunicipality(defaultOptions);
    setSelectWard(defaultOptions);
    setSelectedParty(defaultOptions);
    setCandidateLists(originalCandidatesList);
  }

  const onCandidateSelected = (checked: boolean, details: any) => {
    setElectedCandidates({
      ...electedCandidatesList,
      selectedCandidates: checked ? [...electedCandidatesList.selectedCandidates, details.user._id] :
        electedCandidatesList.selectedCandidates.filter((address:string) => address !== details?.address)
    });
  }

  const undoSelection = () => {
    setElectedCandidates({ ...electedCandidatesList, selectedCandidates: [] });
  }

  const handleSubmitSelection = async () => {
    try {
      const { electionAddress, selectedCandidates } = electedCandidatesList;
console.log(selectedCandidates)
      await SmartContract.methods.addSelectedCandidates(selectedCandidates, electionAddress).send({ from: loggedInAccountAddress });
      toast.success("Selected candidates added successfully.")
    } catch (error) {
      console.log(error)
      toast.error("Fail to add selected candidates !");
    }
  }

  return (
    <div className='mb-[50px]'>
      <Navbar /><br />
      <div className='w-full flex justify-center px-5'>
        <div className={`${responsive} flex-col justify-start rounded-1`}>
          <BreadCrumb routes={["Candidate", ["List"]]} />
          <div className='flex items-center justify-between'>
            <div className='text-2xl text-black mt-4 relative'>
              Candidate List
              {true &&
                <span className='h-[24px] w-6 text-[14px] flex justify-center items-center rounded-circle bg-blue-800 text-slate-100 shadow-lg absolute -top-2 -right-7'>
                  {candidateLists.length}
                </span>
              }
            </div>
            <div className='flex items-center'>
              {electedCandidatesList && electedCandidatesList.selectedCandidates.length > 0 &&
                <div className='flex items-center'>
                  {/* <button
                    className='flex items-center bg-red-600 text-slate-100 px-2 py-1 mr-3 rounded-1 outline-0 relative'
                    onClick={undoSelection}>
                    <AiFillMinusSquare className='text-xl mx-1' />
                    Undo All
                  </button> */}
                  <button
                    className='bg-blue-900 text-slate-100 px-3 py-1 mr-3 rounded-1 outline-0 relative'
                    onClick={handleSubmitSelection}
                  >
                    Confirm Selection
                    {electedCandidatesList.selectedCandidates.length > 0 &&
                      <span className='h-[24px] w-6 text-[14px] flex justify-center items-center rounded-circle bg-blue-800 text-slate-100 shadow-lg -ml-6 absolute top-0 -mt-3'>
                        {electedCandidatesList.selectedCandidates.length}
                      </span>
                    }
                  </button>
                </div>
              }
              <div className='mx-3 flex items-center bg-slate-100 border border-1 rounded-sm'>
                <input
                  type="search"
                  className='pl-3 form-control outline-0 shadow-none border-0 rounded-0'
                  placeholder='Search Candidate'
                  onChange={(e: any) => onHandleSearch(e.target.value)}
                  onKeyDown={(e: any) => onHandleSearch(e.target.value)}
                />
                <BsSearch className='mx-3 text-xl' />
              </div>
              <div className='filter--section'>
                <div
                  className={`px-3 py-2 flex items-center rounded-[2px] ${openSortModal ? "bg-red-500 text-slate-100" : "bg-slate-100"} shadow-md hover:cursor-pointer hover:opacity-70`}
                  onClick={() => setOpenSortModal(!openSortModal)}
                >
                  {!openSortModal ? <>Sort <BsFilter className='text-2xl ml-2' /></> :
                    <>Cancel <AiOutlineClose className='text-1xl ml-2' /></>}
                </div>
                <div className={`absolute px-3 py-2 flex flex-column bg-slate-100 shadow-lg mt-3 w-[500px] -ml-[400px] z-50 ${!openSortModal && "hidden"}`}>
                  <h5 className='mt-3 mb-3'>Address</h5>
                  <div className='flex'>
                    <Select
                      options={PROVINCE}
                      className="w-50"
                      placeholder={<div>Select Province</div>}
                      onChange={(item) => {
                        setSelectProvince(item);
                      }}
                    />
                    <Select
                      options={DISTRICT[selectedProvince.value]}
                      className="w-50 mx-2"
                      placeholder={<div>Select District</div>}
                      onChange={(item: any) => {
                        setSelectDistrict(item);
                      }}
                      isDisabled={selectedProvince?.label ? false : true}
                    />
                  </div>
                  <div className='flex my-3'>
                    <Select
                      options={MUNICIPALITY[selectedDistrict.value]}
                      className="w-50"
                      placeholder={<div>Select Municip...</div>}
                      onChange={(item: any) => {
                        setSelectMunicipality(item);
                      }}
                      isDisabled={selectedDistrict?.label ? false : true}
                    />
                    <Select
                      options={WARD_NO}
                      className="w-50 mx-2"
                      placeholder={<div>Select Ward</div>}
                      onChange={(item: any) => {
                        setSelectWard(item);
                      }}
                      isDisabled={selectedMunicipality?.label ? false : true}
                    />
                  </div>
                  <h5 className='mt-3 mb-3'>Party</h5>
                  <div className='flex'>
                    <Select
                      options={partyListOption}
                      className="w-50"
                      placeholder={<div>Select Party</div>}
                      onChange={(item) => {
                        setSelectedParty(item);
                      }}
                    />
                  </div>
                  <div className=' px-2 my-3 flex justify-between items-center'>
                    {openSortModal && <span>Result: {candidateLists.length}</span>}
                    <button
                      className='px-2 py-1 rounded-1 bg-blue-900 shadow-md text-slate-200 flex items-center justify-center'
                      onClick={resetSorting}
                    >
                      Reset <AiOutlineReload className='ml-2' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div><br />
          <div className='voter__container flex flex-wrap justify-between'>
            {loading && <VoterCardSkeleton repeatCount={12} />}
            {
              candidateLists ?
                candidateLists.map((candidateDetails: any, i) =>
                  <UserCard
                    details={candidateDetails}
                    type="candidate"
                    key={i}
                    onCandidateSelected={onCandidateSelected}
                    currentElection={electionList[electionList.length - 1]}
                    isElected={_.find(electedCandidatesList, (address:string) => address === candidateDetails.user._id) ?? false}
                  />) : "No Candidates Available !"
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;
