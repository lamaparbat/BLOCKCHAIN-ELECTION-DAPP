import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Select from "react-select";
import { toast } from 'react-toastify';
import { ELECTION_TYPE, SmartContract } from '../constants';
import { getHostedUrl } from '../utils/action';
import Avatar from './Avatar';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import { setCandidateList } from '../redux/reducers/candidateReducer';
<<<<<<< HEAD
import { getElectionList } from '../utils';
import { getCurrentElection } from '../utils/common';
=======
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}T${currentDate.getHours()}:${currentDate.getMinutes()}`;
const defaultElectionData = {
  title: "",
  description: "",
  startDate: defaultDate,
  endDate: defaultDate,
  electionType: null,
  electionImages: null,
  selectedCandidates: []
}
const districtElectionPosition = [
  { label: "Mayor", value: "mayor" },
  { label: "Deputy Mayor", value: "deput_mayor" },
  { label: "Ward Councilor", value: "ward_councilor" }
]


const ElectionModal = ({ show, setShowCreateElectionModal, candidateLists }) => {
  const [election, setElection] = useState({ ...defaultElectionData });
  const [isDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const loggedInAccountAddress = useSelector((state: any) => state.loggedInUserReducer.address);
  const [openCandidateModal, setOpenCandidateModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    setDisabled(
<<<<<<< HEAD
      !election.title || !election.description || !election.startDate || !election.endDate
    );
  }, [election.title, election.description, election.startDate, election.endDate]);

  const onChange = (name: string, value: string) => {
    setElection({ ...election, [name]: value });

    if (name === "electionType") {
      setSelectedPosition(null);
      defaultElectionData.electionType = value;
      setElection(defaultElectionData);
    }
=======
      !isAgree || !election.title || !election.description
      || !election.startDate || !election.endDate || !election.selectedCandidates?.length
    );
  }, [isAgree, election.title, election.description, election.startDate, election.endDate]);

  const onChange = (name: string, value: string) => {
    setElection({ ...election, [name]: value });
    setSelectedPosition(null);
    defaultElectionData.electionType = value;
    setElection(defaultElectionData);
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c
  };

  const onCreate = async () => {
    setLoading(true);

<<<<<<< HEAD
    try {
      let { title, description, startDate, endDate, electionType, electionImages } = election;
=======
    if (election?.electionType === "Local" && election.selectedCandidates?.length > 2) return toast.warning("Only 2 candidates are allow for binary election !!");

    try {
      const { title, description, startDate, endDate, electionType, electionImages, selectedCandidates } = election;
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c
      const formData = new FormData();

      Array.from(electionImages).forEach((file: any) => {
        formData.append("images", file);
      })

      const { url }: any = await getHostedUrl(formData);
      const galleryImagesUrl = url;

      await SmartContract.methods.createElection(
        title,
        description,
        startDate,
        endDate,
        electionType,
        galleryImagesUrl,
        selectedCandidates
      ).send({ from: loggedInAccountAddress });

      setOpenCandidateModal(true);
      toast.success("Election created successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create election !");
    }
    setLoading(false);
  }

  const onCandidateSelected = (checked: boolean, details: any) => {
    let temp = [...election.selectedCandidates];
    const _details = { ...details, position: selectedPosition };

    // only allow one person from specific party 
    if (election?.electionType === "District") {
      election.selectedCandidates.find((d) => {
        return d?.partyName === details?.partyName && d?.position === details?.position;
      })
    }

    if (!checked) temp = election.selectedCandidates.filter((candidate: any) => candidate?.user?._id !== details?.user?._id);
    else temp.push(_details);
    setElection({ ...election, selectedCandidates: temp });
  }

  const onOpenCandidateModal = () => {
    setOpenCandidateModal(!openCandidateModal);
  }

  const handleClose = () => {
    setElection(defaultElectionData);
    setShowCreateElectionModal(!show);
  }
<<<<<<< HEAD

  const uploadSelectedCandidates = async () => {
    try {
      const electionList = await getElectionList();
      const currentElection: any = getCurrentElection(electionList);
      const selectedCandidates = election?.selectedCandidates?.map((candidate) => ({ _id: candidate.user._id, position: candidate.position })).filter((candidate) => candidate.position === selectedPosition);

      if (election?.electionType === "Local" && election.selectedCandidates?.length > 2) return toast.warning("Only 2 candidates are allow for binary election !!");

      await SmartContract.methods.addSelectedCandidates(selectedCandidates, currentElection?.startDate).send({ from: loggedInAccountAddress });

      toast.success("Selected candidates added successfully.")
    } catch (error) {
      console.log(error)
      toast.error("Fail to add selected candidates !");
    }
  }

=======
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c

  return (
    <>
      <Modal show={openCandidateModal} size='xl'>
        <Modal.Body className='px-4'>
          <h4 className='my-3'>Candidate Selection</h4>
          {election?.electionType === "District" &&
            <div className='w-[300px] my-4'>
              <span>Select Candidate Position</span>
              <Select
                className='mt-1'
                options={districtElectionPosition}
                placeholder="Select Position"
                onChange={({ label, value }) => {
                  setSelectedPosition(value);
                }}
<<<<<<< HEAD
                isDisabled={election.selectedCandidates.filter(candidate => candidate.position === selectedPosition).length > 3}
=======
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c
              />
            </div>
          }
          <div className='flex flex-wrap'>
            {(candidateLists && candidateLists?.length > 0) ?
              candidateLists.map((details: any) => {
<<<<<<< HEAD
                if (election.selectedCandidates?.find((d) => d?.user?._id === details?.user?._id && d?.position !== selectedPosition)) return;
=======
                if (election.selectedCandidates?.find((d) => d.user._id === details.user._id && d.position !== selectedPosition)) return;
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c

                const formattedEmail = details?.user?.email.split("@")[0];
                const isLocalElection = election?.electionType === "Local";
                const isCandidateSelected = () => {
                  if (isLocalElection) return election.selectedCandidates?.find(candidate => candidate?.user?._id === details?.user?._id);
                  return election.selectedCandidates?.find(candidate => candidate?.position === selectedPosition && candidate?.user?._id === details?.user?._id);
                };
                const isBinaryElection = isLocalElection && election?.selectedCandidates?.length >= 2 && !isCandidateSelected();
                const isCheckboxDisabled = () => {
                  if (!isLocalElection) {
<<<<<<< HEAD
                    return !selectedPosition || election.selectedCandidates.find((candidate) => candidate.partyName === details.partyName
                      && candidate.position === selectedPosition && candidate.user._id !== details.user._id);
=======
                    return !selectedPosition ||
                      details?.position == selectedPosition ||
                      (election?.selectedCandidates?.find((d) => d?.partyName === details?.partyName) &&
                        !election?.selectedCandidates?.find((d) => d?.user._id === details?.user._id))
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c

                  } else { return isBinaryElection }
                };


                return (
                  <div className='user__card h-[180px] w-[340px] px-2 mb-3 mr-4 max-[500px]:w-[500px] max-[400px]:w-full bg-slate-100 rounded-[12px] hover:bg-red-20'>
<<<<<<< HEAD
                    <div className={`absolute m-2 p-2 shadow-lg border-[1px] ${!isCheckboxDisabled() ? "bg-white border-slate-500" : "bg-slate-200"} rounded-circle h-[45px] w-[45px] flex justify-center items-center`}>
                      <input
                        className={`h-[20px] w-[20px] ${!isCheckboxDisabled() && "cursor-pointer"}`}
=======
                    <div className='absolute m-2 p-2 bg-white shadow-lg border-[1px] border-slate-500 rounded-circle h-[45px] w-[45px] flex justify-center items-center'>
                      <input
                        className={`h-[20px] w-[20px] ${(!isBinaryElection || !isCheckboxDisabled()) && "cursor-pointer"}`}
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c
                        type="checkbox"
                        onClick={(e: any) => {
                          onCandidateSelected(e.target.checked, details);
                        }}
                        key={details?.user?.citizenshipNumber}
                        checked={isCandidateSelected()}
                        disabled={isCheckboxDisabled()}
                      />
                    </div>
                    <div className='flex justify-around items-center mt-4'>
                      <div className='col1 flex-col'>
                        <Avatar src={details?.user?.profile} className={''} alt={'img'} size={'xl'} border={0} />
                        <div className='social__media flex justify-center mt-3'>
                          <BsFacebook className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
                          <BsInstagram className='mx-4 cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
                          <BsTwitter className='cursor-pointer hover:text-md hover:text-red-500 hover:animate-bounce' />
                        </div>
                      </div>
                      <div className='col2 pr-1 h-fit flex-xl-column text-[15px] ml-1'>
                        <div>Name: {details?.user?.fullName}</div>
                        <div>Citizenship No: {details?.user?.citizenshipNumber}</div>
                        <div>Age: {details?.user?.age}</div>
                        <div>Party: {details?.partyName}</div>
                        <div>Email: {formattedEmail}</div>
                      </div>
                    </div>
                  </div >
                )
              }) : "No Candidates Available !"}
          </div >
        </Modal.Body >
  <Modal.Footer>
    <button
<<<<<<< HEAD
      className="btn bg-light px-4"
      onClick={() => {
        setOpenCandidateModal(false);
      }}
    >Close</button>
    <button
      className="btn bg-btnColor px-4 text-light"
      onClick={() => {
        uploadSelectedCandidates();
      }}
    >Upload Selected Candidates</button>
=======
            className="btn bg-btnColor px-4 text-light"
            onClick={() => {
      setOpenCandidateModal(false);
    }}
          >Done</button>
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c
        </Modal.Footer >
      </Modal >
  <Modal show={show} centered>
    <Modal.Header className='pt-4 pb-3 px-4'>
      <h5>Create new election</h5>
    </Modal.Header>
    <Modal.Body>
      <div className='px-2'>
        <div className='w-full mb-4'>
          <div className='w-100'>
            <label>Election Type</label>
            <Select
              options={ELECTION_TYPE}
              className="mr-2 mt-1"
              placeholder={<div>Select Type</div>}
              onChange={(item: any) => onChange("electionType", item.value)}
            />
          </div>
        </div>
        <div className='flex flex-column'>
          <label>Election Title</label>
          <input
            type="text"
            className='form-control mt-2 mb-4 shadow-none'
            onChange={(e) => onChange("title", e.target.value)} />
        </div>
        <div className='flex flex-column'>
          <label>Short Election Description</label>
          <textarea
            className='form-control mt-2 mb-4 shadow-none h-[130px]'
            onChange={(e) => onChange("description", e.target.value)}>
          </textarea>
        </div>
        <div className='hold__date flex '>
          <div className='w-50 mr-2'>
            <span>Start Date & time</span>
            <input
              type="datetime-local"
              className="form-control mt-1 shadow-none"
              value={election.startDate}
              onChange={(e) => onChange("startDate", e.target.value)} />
          </div>
          <div className='w-50 ml-2'>
            <span>End Date & time</span>
            <input
              type="datetime-local"
              value={election.endDate}
              className="form-control mt-1 shadow-none"
              onChange={(e) => onChange("endDate", e.target.value)} />
          </div>
        </div>
        <div className='w-full mt-4'>
          <label>Choose election images</label>
          <input
            className='form-control mt-2'
            type="file"
            name='files'
            multiple
            onChange={(e: any) => setElection({ ...election, electionImages: e.target.files })}
          />
        </div>
<<<<<<< HEAD
{/* <button
=======
            <button
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c
              className={`h-fit w-full flex items-center mt-4 rounded-3 border border-1 border-slate-400 bg-slate-200 ${candidateLists?.length && election?.electionType && "cursor-pointer hover:bg-slate-100"}`}
              onClick={onOpenCandidateModal}
              disabled={!candidateLists?.length || !election?.electionType}
              onMouseOver={() => {
                // if (!election?.electionType) showTooltip
              }}
            >
              <span className='flex-shrink px-[14px] text-dark'>Open modal</span>
              <div className='bg-white flex-1 text-start px-3 py-[8px] text-slate-800'>{
                !candidateLists?.length ? "Candidates not found !" :
                  (!election?.selectedCandidates?.length ? "Choose candidates" : `Selected Candidates: ${election.selectedCandidates?.length}`)
              }</div>
<<<<<<< HEAD
            </button> */}
=======
            </button>
            {/* <div className='flex mt-4 mb-3'>
              <input
                type="checkbox"
                className="mr-2 bg-blue-800"
                onChange={() => setAgree(!isAgree)} />
              <label>I agree terms and condition.</label>
            </div> */}
>>>>>>> 54a50d9b25ca1e3519643f35bdaeb867543c612c
          </div >
        </Modal.Body >
  <Modal.Footer>
    <button className='me-4' onClick={handleClose}>Close</button>
    <button
      className={`bg-blue-900 text-light py-1 w-[130px] rounded-[5px] hover:opacity-75 flex justify-center items-center ${(isDisabled || loading) && 'opacity-75 cursor-default'}`}
      onClick={onCreate}
      disabled={isDisabled || loading}
    >
      {loading ? "Saving" : "Register"}
    </button>
  </Modal.Footer>
      </Modal >
    </>
  )
}

export default ElectionModal;
