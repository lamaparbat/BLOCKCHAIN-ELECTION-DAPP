import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import CandidateCard from '../../components/LiveCounterCard/CandidateCard';

const details: React.FC = (): React.ReactElement => {
 // get selected candidate details from redux store
 const selectedCandidate = useSelector((state) => state);
 const { candidateReducer }: any | undefined = selectedCandidate;

 return (
  <div className=''>
   <Navbar />
   <CandidateCard details={candidateReducer.details} border={null} ishighlighted={false} />
  </div>
 )
}

export default details;
