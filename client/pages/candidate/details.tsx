import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import Navbar from '../../components/Navbar';
import BreadCrumb from '../../components/BreadCrumb';
import { responsive } from "../../constants/index";

const Details: React.FC = (): React.ReactElement => {
 // get selected candidate details from redux store
 const selectedCandidate = useSelector((state) => state);
 const { candidateReducer }: any | undefined = selectedCandidate;
 const { party, candidateName, profile, count }: any | undefined = candidateReducer.details;

 // custom field
 const FieldRow = ({ title1, title1Val, title2, title2Val }) => {
  return (
   <div className='flex justify-between mb-4'>
    <div>
     <h6>{title1}:</h6>
     <span className='relative'>{title1Val}</span>
    </div>
    <div className='text-end'>
     <h6>{title2}:</h6>
     <span className='relative'>{title2Val} years.</span>
    </div>
   </div>
  )
 }
 return (
  <div className='mb-[50px]'>
   <Navbar /><br /><br /><br />
   <div className='w-full flex justify-center'>
    <div className={`${responsive} flex justify-start rounded-1`}>
     <BreadCrumb />
    </div>
   </div><br />
   <div className='w-full flex justify-center'>
    <div className={`${responsive} flex justify-between rounded-1 flex-wrap`}>
     <div className='bg-slate-100 w-[550px] h-[375px] mb-3 flex justify-center items-center overflow-hidden rounded-2 border-2 border-slate-300'>
      {true ? <img src={'/images/parbat.png'} alt={candidateName} height="100%" width="100%" /> : <FaUserCircle className='text-3xl text-slate-500' />}
     </div>
     <div className='details w-[500px]'>
      <FieldRow title1="Candidate Name" title1Val="Sher Bahadur Deuba" title2="Date of birth (DOB)" title2Val="15th Augus, 1912" />
      <FieldRow title1="Birth Place" title1Val="Dadeldhura Rukum" title2="Temporary Address" title2Val="Kathmandu Nepal" />
      <FieldRow title1="Father's Name" title1Val="Ram Bahadur Deuba" title2="Mother's Name" title2Val="Kamali Deuba" />
      <FieldRow title1="Education" title1Val="+2 Level" title2="Electoral system" title2Val="State Wise Election" />
      <div>
       <h6>Social Media</h6>
       <div className='icons flex mt-3'>
        <BsFacebook className='cursor-pointer hover:scale-110 transition ease-in-out text-3xl drop-shadow-lg text-sky-600' />
        <BsInstagram className='cursor-pointer hover:scale-110 transition ease-in-out text-3xl drop-shadow-lg text-rose-600 ml-8' />
        <BsTwitter className='cursor-pointer hover:scale-110 transition ease-in-out text-3xl drop-shadow-lg text-sky-400 ml-8' />
       </div>
      </div>
     </div>
    </div>
   </div>
   <div className={`flex justify-center mt-3`}>
    <div className={`${responsive} pt-3`}>
     <h5 className='font-bold '>Political Affiliation</h5>
     <span>कक्षा १० पढ्ने बेलादेखि राजनीतिक चासो । २०२८ सालमा कम्युनिस्ट पार्टीमा आबद्धता । २०४२ सालमा नेकपा मशालको पाँचौँ महाधिवेशनबाट केन्द्रीय सदस्य । २०४६ सालको जनआन्दोलनअघि मशालको महासचिव ।
      २०५२ साल फागुन १ गतेबाट सुरु भएको तत्कालीन नेकपा माओवादीको जनयुद्धको नेतृत्व । २०५८ मा नेकपा माओवादीको अध्यक्ष । २०५८ मा जनमुक्ति सेनाको सर्वोच्च कमान्डर ।
      त्यसयता लगातार पार्टी नेतृत्वमा । नेपाल कम्युनिस्ट पार्टी (नेकपा) को अध्यक्ष २०७५ ।</span><br /><br />
     <h5 className='font-bold'>Parliamentary Tour</h5>
     <span>पहिलो संविधानसभा २०६४ मा रोल्पा र काठमाडौं १० बाट निर्वाचित । दोस्रो संविधानसभा २०७० मा सिरहा ५ बाट निर्वाचित । प्रतिनिधिसभा सदस्यमा चितवन ३ बाट निर्वाचित ।</span><br /><br />
     <h5 className='font-bold'>Executive responsibility</h5>
     <span>दुई पटक प्रधानमन्त्री वि.सं.२०६५ – २०६६, वि.सं.२०७३।०४।१९- २०७४।०२।२३</span><br /><br />
     <h5 className='font-bold'>Political developments</h5>
     <span>२०३८ देखि २०६३ सालसम्म भूमिगत राजनीतिक जीवन ।</span>
    </div>
   </div>
  </div>
 )
}

export default Details;
