import React, { useState, useEffect } from 'react';
import { SpinningCircles } from 'react-loading-icons';
import Navbar from '../../components/Navbar';
import { registerParty } from '../../utils/action';
import { toast } from 'react-toastify';

const VoterRegistration = () => {
  const [partyDetails, setPartyDetails] = useState({
    partyName: "", totalMembers: '', agenda: "", logo: null
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // upload partyDetails
  const onSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("partyName", partyDetails.partyName);
      formData.append("totalMembers", partyDetails.totalMembers);
      formData.append("agenda", partyDetails.agenda);
      formData.append("logo", partyDetails.logo);

      await registerParty(formData);
    } catch (error) {
      toast.error("Failed to register !", { toastId: 2 });
    }
    setLoading(false);
  }

  useEffect(() => {
    (!partyDetails.partyName || !partyDetails.totalMembers
      || !partyDetails.agenda || !partyDetails.logo) ? setDisabled(true) : setDisabled(false);
  }, [partyDetails]);

  const onChange = (name, value) => {
    setPartyDetails({ ...partyDetails, [name]: value })
  }

  return (
    <div className='mb-[50px]'>
      <Navbar /><br />
      <div className='w-full flex justify-center'>
        <div className={`px-5 pt-4 pb-5 w-[550px] h-fit flex-col justify-between rounded-[2px] flex-wrap text-[15px] bg-slate-100 shadow-sm`}>
          <h4 className='mt-2 mb-4'>Fillup Details</h4>
          <div className='flex justify-between'>
            <div className='w-100 text-[15px]'>
              <span>Party Name</span>
              <input
                className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1'
                type="text"
                onChange={(e) => onChange("partyName", e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100 text-[15px]'>
              <span>Total Members</span>
              <input
                className='overrideInputStyle form-control px-3 py-[10px] rounded-1 mt-1'
                type="number"
                placeholder='0'
                onChange={(e) => onChange("totalMembers", e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100 text-[15px]'>
              <span>Party Agenda</span>
              <textarea
                className='overrideInputStyle form-control h-[150px] px-3 py-[10px] rounded-1 mt-1'
                placeholder='Brief description of party agenda'
                onChange={(e) => onChange("agenda", e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='w-100'>
              <span>Choose Party Logo</span>
              <input
                className='overrideInputStyle form-control py-[10px] rounded-1 mt-1'
                type="file"
                name="file"
                onChange={(e) => onChange("agenda", e.target.files[0])}
              />
            </div>
          </div>
          <div className='flex justify-between mt-[30px] mb-1'>
            <button
              className={`bg-blue-900 text-light py-2 w-100 rounded-[5px] hover:opacity-75 flex justify-center items-center ${(disabled || loading) && 'opacity-75 cursor-default'}`}
              onClick={onSubmit}
              disabled={disabled || loading}
            >
              {loading && <SpinningCircles className='h-[30px] -ml-20' />}
              {loading ? "Saving" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoterRegistration;
