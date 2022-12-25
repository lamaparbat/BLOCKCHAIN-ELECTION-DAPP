import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { createElection } from '../utils/action';

const ElectionModal = ({ show, setShowCreateElectionModal }) => {
 const [electionDate, setElectionDate] = useState({
  startDate: "",
  endDate: ""
 });
 const [isAgree, setAgree] = useState(false);
 const [isDisabled, setDisabled] = useState(true);

 useEffect(() => {
  setDisabled(!isAgree || !electionDate.startDate || !electionDate.endDate);
 }, [isAgree, electionDate.startDate, electionDate.endDate]);

 const onDatechange = (name: string, value: string) => {
  setElectionDate({ ...electionDate, [name]: value });
 };

 const onCreate = async () => {
  try {
   const res = await createElection(electionDate);
   console.log(res);
  } catch (error) {
   console.error(error);
  }
 }


 return (
  <Modal show={show}>
   <Modal.Header className='pt-3 pb-1 px-4'>
    <h5>Create new election</h5>
   </Modal.Header>
   <Modal.Body>
    <div className='px-2'>
     <div className='hold__date flex '>
      <div className='w-50 mr-2'>
       <span>Start Date & time</span>
       <input
        type="datetime-local"
        className="form-control mt-1"
        onChange={(e) => onDatechange("startDate", e.target.value)} />
      </div>
      <div className='w-50 ml-2'>
       <span>End Date & time</span>
       <input
        type="datetime-local"
        className="form-control mt-1"
        onChange={(e) => onDatechange("endDate", e.target.value)} />
      </div>
     </div>
     <div className='flex mt-3'>
      <input
       type="checkbox"
       className="mr-2 bg-blue-800"
       onChange={() => setAgree(!isAgree)} />
      <span>I agree terms and condition.</span>
     </div>
    </div>
   </Modal.Body>
   <Modal.Footer>
    <button className='me-4' onClick={() => setShowCreateElectionModal(false)}>Close</button>
    <button
     className={`px-4 py-1 text-white rounded-1 ${isDisabled ? 'bg-blue-500' : 'bg-blue-800'}`}
     disabled={isDisabled}
     onClick={onCreate}
    >Create</button>
   </Modal.Footer>
  </Modal>
 )
}

export default ElectionModal;
