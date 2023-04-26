import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import Navbar from '../../components/Navbar';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import BreadCrumb from '../../components/BreadCrumb';
import { responsive, SmartContract } from '../../constants';
import UserCard from '../../components/UserCard';
import { getCandidateList, getElectionList, getPartyList } from '../../utils';
import { setCandidateList } from '../../redux/reducers/candidateReducer';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import _ from 'lodash';
import { getStorage } from '../../services';
import { Modal } from 'react-bootstrap';
import Sortbar from '../../components/Sortbar';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const defaultElectedCandidates = { electionAddress: null, selectedCandidates: [] };
let originalCandidatesList = [];

const Details: React.FC = (): React.ReactElement => {
  const [candidateLists, setCandidateLists] = useState([]);
  const [electionList, setElectionList] = useState([]);
  const [electedCandidatesList, setElectedCandidates] = useState(defaultElectedCandidates);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);

  const [electionOptions, setElectionOptions] = useState([]);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  let candidateEvent: any = null;

  // disptcher
  const dispatch = useDispatch();
  const t = useTranslations("candidate_roll");
  const voterT = useTranslations("voter");
  const commonT = useTranslations("common");
  const faqT = useTranslations("faq");

  useEffect(() => {
    (async () => {
      let list = await getCandidateList();
      const electionList = await getElectionList();

      originalCandidatesList = list;
      let filteredElectionOptions = electionList.map((details: any) => { return { label: details.title, value: details.startDate } });
      filteredElectionOptions = _.orderBy(filteredElectionOptions, [(option) => new Date(option.value)], ["desc"])

      setCandidateLists(list);
      setElectionList(electionList);
      setElectionOptions(filteredElectionOptions);

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

  const onHandleSearch = (keyword: string) => {
    if (keyword.length === 0) return setCandidateLists(originalCandidatesList);
    const filterSearch = candidateLists.filter((candidate) => candidate.user.fullName.toUpperCase().includes(keyword.toUpperCase()));
    setCandidateLists(filterSearch);
  }

  const onCandidateSelected = (checked: boolean, details: any) => {
    setElectedCandidates({
      ...electedCandidatesList,
      selectedCandidates: checked ? [...electedCandidatesList.selectedCandidates, details.user._id] :
        electedCandidatesList.selectedCandidates.filter((address: string) => address !== details?.user?._id)
    });
  }

  const undoSelection = () => {
    setElectedCandidates({ ...electedCandidatesList, selectedCandidates: [] });
  }

  const handleSelectElection = ({ value }) => {
    setDisabledSubmitBtn(true);
    const selectedElection = electionList?.find((d) => d?.startDate === value);

    if (selectedElection?.electionType === "Local") {
      const _electedCandidatesAddress = electedCandidatesList?.selectedCandidates;
      const candidateA = candidateLists?.find((candidate) => candidate.user._id === _electedCandidatesAddress[0]);
      const candidateB = candidateLists?.find((candidate) => candidate.user._id === _electedCandidatesAddress[1]);

      if (_electedCandidatesAddress?.length > 2 || _electedCandidatesAddress?.length < 2) return toast.error("Please select 2 candidates for binary election !");
      if (candidateA?.partyName === candidateB?.partyName) return toast.error("Oponent should be from another party !");
    }


    setElectedCandidates({
      ...electedCandidatesList,
      electionAddress: value ?? electionList?.at(-1)?.startDate
    });
    setDisabledSubmitBtn(false);
  }

  const handleSubmitSelection = async () => {
    try {
      const { electionAddress, selectedCandidates } = electedCandidatesList;

      await SmartContract.methods.addSelectedCandidates(selectedCandidates, electionAddress).send({ from: loggedInAccountAddress });
      toast.success("Selected candidates added successfully.")
    } catch (error) {
      console.log(error)
      toast.error("Fail to add selected candidates !");
    }
  }
  return (
    <div className='mb-[50px]'>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={"/images/logo.png"} />
      </Head>
      <Navbar /><br />
      <div className='w-full flex justify-center sm:px-6 xsm:px-2'>
        <div className={`${responsive} flex-col justify-start rounded-1 sm:px-3 xsm:px-0 xsm:w-full`}>
          <BreadCrumb routes={[voterT("breadcumb5"), voterT("breadcumb6")]} />
          <div className='flex items-center sm:flex-row xsm:flex-col sm:justify-between xsm:justify-start'>
            <div className='text-2xl text-black mt-4 relative'>
              {t("title")}
              {true &&
                <span className='h-[24px] w-6 text-[14px] flex justify-center items-center rounded-circle bg-blue-800 text-slate-100 shadow-lg absolute -top-2 -right-7'>
                  {candidateLists?.length ?? 0}
                </span>
              }
            </div>
            <div className='flex items-center mt-4'>
              {/* {electedCandidatesList && electedCandidatesList.selectedCandidates.length > 0 &&
                <div className='flex items-center'>
                  <button
                    className='flex items-center bg-red-600 text-slate-100 px-2 py-1 mr-3 rounded-1 outline-0 relative'
                    onClick={undoSelection}>
                    <AiFillMinusSquare className='text-xl mx-1' />
                    Undo All
                  </button>
                  <button
                    className='bg-blue-900 text-slate-100 px-3 py-1 mr-3 rounded-1 outline-0 relative'
                    onClick={() => setShowSubmitModal(true)}
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
                  placeholder={t("search_placeholder")}
                  onChange={(e: any) => onHandleSearch(e.target.value)}
                  onKeyDown={(e: any) => onHandleSearch(e.target.value)}
                />
                <BsSearch className='mx-3 text-xl' />
              </div> */}
              <Sortbar
                openSortModal={openSortModal}
                setOpenSortModal={setOpenSortModal}
                stateLists={candidateLists}
                setStateList={setCandidateLists}
                originalList={originalCandidatesList}
                showPartyOptions={true}
              />
            </div>
          </div><br />
          <div className='voter__container flex flex-wrap md:justify-between sm:justify-center xsm:justify-center'>
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
                    isElected={_.find(electedCandidatesList, (address: string) => address === candidateDetails.user._id) ?? false}
                  />) : "No Candidates Available !"
            }
          </div>
        </div>
      </div>
      {/* <Modal show={showSubmitModal} size="sm">
        <Modal.Body>
          <div className='my-2 mx-3'>
            <label className='mb-2'>{commonT("select_election")}</label>
            <Select options={electionOptions} onChange={handleSelectElection} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn px-3 py-1 rounded-1' onClick={() => setShowSubmitModal(false)}>Close</button>
          <button
            className='btn btn-primary px-3 py-1 rounded-1'
            onClick={() => handleSubmitSelection()}
            disabled={!electedCandidatesList.electionAddress || disabledSubmitBtn}
          >{faqT("submit_btn")}</button>
        </Modal.Footer>
      </Modal> */}
    </div>
  )
}

export default Details;
