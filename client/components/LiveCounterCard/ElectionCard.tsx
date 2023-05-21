import moment from 'moment';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FcGallery } from 'react-icons/fc';
import { Fade } from 'react-slideshow-image';
import { GoPrimitiveDot } from 'react-icons/go';
import _ from 'lodash';
import { trimAddress } from '../../utils';
import { BiEqualizer } from 'react-icons/bi';
import AnimatedAvatar from '../AnimatedAvatar';
import TickCircleIcon from '../TickCircleIcon';

const ElectionCard = ({ details, src, electionStatus }) => {
  const [showIcon, setShowIcon] = useState(false);
  const { title, startDate, endDate, candidates, voters } = details ?? {};

  let totalVotes = 0;
  candidates?.forEach((d) => {
    totalVotes += parseInt(d?.votedVoterLists?.length);
  });
  const t = useTranslations("election_gallery_card");
  const homepageT = useTranslations("homepage");
  const [selectedElections, setSelectedElection] = useState(null);

  const mouseOver = () => {
    setShowIcon(true)
  }

  const mouseOut = () => {
    setShowIcon(false)
  }

  return (
    <div className={`relative bg-slate-50 sm:w-[340px] xsm:w-full h-fit rounded-t-[5px] overflow-hidden shadow-md mr-2 mb-3 ${electionStatus === "LIVE" && "animatedBorder"}`}>
      <div className='w-full h-[180px] overflow-hidden' onMouseOver={mouseOver} onMouseOut={mouseOut}>
        {
          showIcon &&
          <div className='absolute bg-red-100 animate-pulse z-10 w-100 h-[180px] flex items-center justify-center opacity-90'>
            <button
              className='absolute p-2 animate-bounce bg-white m-3 z-40 rounded-circle hover:bg-red-500 transition ease-in-out delay-[100px] hover:-rotate-[10deg]'
              onClick={() => setSelectedElection(details)}
            >
              <FcGallery className='text-2xl' />
            </button>
          </div>
        }
        {
          electionStatus === "LIVE" &&
          <span className='right-0 w-[85px] mr-2 absolute px-4 mt-2 py-1 rounded-pill bg-danger text-light'>
            <GoPrimitiveDot className={`text-2xl -ml-4 -mt-0 absolute animate-ping`} />
            <span className='text-light ml-3'>Live</span>
          </span>
        }
        <img className={`h-100 w-100 object-cover transition ${showIcon && "scale-125"} ${electionStatus === "LIVE" && "animatedBorder"}`} src={src} />
      </div>
      <div className={`flex flex-column pt-2 pb-4 px-3 ${electionStatus === "LIVE" && "animatedBorder"}`}>
        <span className='text-[18px] mb-1 font-bold text-black select-none'>{title}</span>
        <span className='select-none'><span className='font-bold'>{t("held")}:</span> {moment(startDate).format("lll")}</span>
        <span className='select-none my-1'><span className='font-bold'>{t("ended")}:</span> {moment(endDate).format("lll")}</span>
        <span className='mb-1 select-none'><span className='font-bold select-none'>{t("total_candidate")}:</span> {candidates?.length}</span>
        <span className='mb-1 select-none'><span className='font-bold select-none'>{homepageT("total_voters")}:</span> {voters}</span>
        <span className='select-none'><span className='font-bold select-none'>{t("total_vote")}:</span> {totalVotes}</span>
      </div>
      <Modal centered={true} show={selectedElections} size='xl' onHide={() => setSelectedElection(null)}>
        <Modal.Body>
          <div className='py-3 px-1'>
            <div className='flex'>
              <h4>{selectedElections?.title}</h4>
              <span className='text-sm text-light bg-red-600 px-[10px] h-fit rounded-5 -mt-[10px]'>{selectedElections?.electionType}</span>
            </div>
            <p>{selectedElections?.description}</p>
          </div>
          <Fade
            autoplay={true}
            nextArrow={<BsChevronRight className='absolute text-slate-100 text-4xl' />}
            prevArrow={<BsChevronLeft className='absolute text-slate-100 text-4xl' />}>
            {
              selectedElections?.galleryImagesUrl?.map((src: string, i: number) => <img
                className='lg:h-[400px] h-[300px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100'
                src={src} key={i} />)
            }
          </Fade>
          <h5 className='mt-5 font-bold'>Candidates</h5>
          <div className='flex flex-wrap pb-3'>
            {candidates && candidates.length > 0 && candidates?.map((data: any) => {
              const candidateA = candidates[0];
              const candidateB = candidates[1];
              const candidateAVotes = candidateA?.votedVoterLists?.length;
              const candidateBVotes = candidateB?.votedVoterLists?.length;


              const winnerAddress = candidateAVotes === candidateBVotes ? null : candidateAVotes > candidateBVotes
                ? candidateA?.user?._id : candidateB?.user?._id;

              return (
                <div>
                  <div
                    className={`card__container h-fit sm:w-[350px] max-[1140px]:w-full mt-3 border border-1 border-slate-300 rounded-1 overflow-hidden mr-3`}>
                    <div
                      className='card__title pl-4 pt-2 flex items-center justify-between bg-slate-100 border-l-0 border-r-0 border-t-0 border-b-2 border-black-500 cursor-pointer'
                    >
                      <h6>{trimAddress(data?.user?._id)}</h6>
                      {
                        !winnerAddress && <span className='-mt-2 mr-4 text-red-500 flex items-center'>
                          <BiEqualizer className='mx-2 animate-ping' /> Equal
                        </span>
                      }
                    </div>
                    <div className={`card__body pt-3 pb-2`}>
                      <div className='card__body__hot px-4 mb-3 flex'>
                        <AnimatedAvatar src={data?.user?.profile} />
                        <div className='details pt-2 pl-3 mx-3 w-100'>
                          <div className='flex items-center'>
                            <span className='text-xl me-2'>{data?.user?.fullName}</span>
                            {data?.user?._id === winnerAddress && <TickCircleIcon />}
                          </div>
                          <div className='flex justify-content-between'>
                            <h1 id='count'>{data?.votedVoterLists?.length}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ElectionCard;
