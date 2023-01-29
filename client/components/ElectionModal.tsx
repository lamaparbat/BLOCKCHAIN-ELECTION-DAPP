import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { createElection } from '../utils/action';
import { setElectionTimeCounter } from '../redux/electionTimeCounter';

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}T${currentDate.getHours()}:${currentDate.getMinutes()}`;
const defaultElectionData = {
  title: "",
  description: "",
  startDate: defaultDate,
  endDate: defaultDate
}


const ElectionModal = ({ show, setShowCreateElectionModal }) => {
  const [electionData, setElectionData] = useState({ ...defaultElectionData });
  const [isAgree, setAgree] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setDisabled(!isAgree || !electionData.title || !electionData.description || !electionData.startDate || !electionData.endDate);
  }, [isAgree, electionData.title, electionData.description, electionData.startDate, electionData.endDate]);

  const onChange = (name: string, value: string) => {
    setElectionData({ ...electionData, [name]: value });
  };

  const onCreate = async () => {
    setLoading(true);
    try {
      await createElection(electionData);

      setShowCreateElectionModal(false);
      setElectionData(defaultElectionData);
      dispatch(setElectionTimeCounter(electionData));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }


  return (
    <Modal show={show} centered>
      <Modal.Header className='pt-4 pb-3 px-4'>
        <h5>Create new election</h5>
      </Modal.Header>
      <Modal.Body>
        <div className='px-2'>
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
              className='form-control mt-2 mb-4 shadow-none h-[200px]'
              onChange={(e) => onChange("description", e.target.value)}>
            </textarea>
          </div>
          <div className='hold__date flex '>
            <div className='w-50 mr-2'>
              <span>Start Date & time</span>
              <input
                type="datetime-local"
                className="form-control mt-1 shadow-none"
                value={electionData.startDate}
                onChange={(e) => onChange("startDate", e.target.value)} />
            </div>
            <div className='w-50 ml-2'>
              <span>End Date & time</span>
              <input
                type="datetime-local"
                value={electionData.endDate}
                className="form-control mt-1 shadow-none"
                onChange={(e) => onChange("endDate", e.target.value)} />
            </div>
          </div>
          <div className='flex mt-4 mb-3'>
            <input
              type="checkbox"
              className="mr-2 bg-blue-800"
              onChange={() => setAgree(!isAgree)} />
            <label>I agree terms and condition.</label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className='me-4' onClick={() => setShowCreateElectionModal(false)}>Close</button>
        <button
          className={`bg-blue-900 text-light py-1 w-[130px] rounded-[5px] hover:opacity-75 flex justify-center items-center ${(isDisabled || loading) && 'opacity-75 cursor-default'}`}
          onClick={onCreate}
          disabled={isDisabled || loading}
        >
          {loading ? "Saving" : "Register"}
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ElectionModal;
