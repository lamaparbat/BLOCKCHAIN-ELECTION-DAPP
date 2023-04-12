import moment from 'moment';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FcGallery } from 'react-icons/fc';

const ElectionCard = ({ details, src }) => {
  const [showIcon, setShowIcon] = useState(false);
  const { title, startDate, endDate, description, selectedCandidates } = details ?? {};
  const t = useTranslations("election_gallery_card");

  const mouseOver = () => {
    setShowIcon(true)
  }

  const mouseOut = () => {
    setShowIcon(false)
  }

  return (
    <div className='relative bg-slate-50 sm:w-[340px] xsm:w-full h-fit rounded-t-[5px] overflow-hidden shadow-md mr-2 mb-3'>
      <div className='w-full h-[180px] overflow-hidden' onMouseOver={mouseOver} onMouseOut={mouseOut}>
        {
          showIcon &&
          <div className='absolute bg-red-100 animate-pulse z-10 w-100 h-[180px] flex items-center justify-center opacity-90'>
            <button className='absolute p-2 animate-bounce bg-white m-3 z-40 rounded-circle hover:bg-red-500 transition ease-in-out delay-[100px] hover:-rotate-[10deg]'>
              <FcGallery className='text-2xl' />
            </button>
          </div>
        }
        <img className={`h-100 w-100 object-cover transition ${showIcon && "scale-125"}`} src={src} />
      </div>
      <div className='flex flex-column pt-2 pb-4 px-3'>
        <span className='text-[18px] mb-1 font-bold text-black select-none'>{title}</span>
        <span className='select-none'><span className='font-bold'>{t("held")}:</span> {moment(startDate).format("lll")}</span>
        <span className='select-none my-1'><span className='font-bold'>{t("ended")}:</span> {moment(endDate).format("lll")}</span>
        <span className='mb-1 select-none'><span className='font-bold select-none'>{t("total_candidate")}:</span> {selectedCandidates?.length}</span>
        <span className='select-none'><span className='font-bold select-none'>{t("total_vote")}:</span></span>
      </div>
    </div>
  )
}

export default ElectionCard;
