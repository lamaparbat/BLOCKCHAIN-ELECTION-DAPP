import React from 'react';
import Navbar from '../../components/Navbar';
import BreadCrumb from '../../components/BreadCrumb';
import { responsive } from '../../constants';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const Details: React.FC = (): React.ReactElement => {
  const t = useTranslations("voter");

  return (
    <div className='mb-[50px]'>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="Nepali Voter eligibility criteria" />
        <link rel="icon" href={"/images/logo.png"} />
      </Head>
      <Navbar /><br />
      <div className='w-full flex lg:justify-center sm:justify-start xsm:px-3'>
        <div className={`${responsive} flex justify-start rounded-1`}>
          <BreadCrumb routes={[t("breadcumb2"), [t("breadcumb3")]]} />
        </div>
      </div><br />
      <div className='w-full flex justify-center sm:px-3 xsm:px-3'>
        <div className={`${responsive} flex justify-between rounded-1 flex-wrap text-[17px]`}>
          <p className='text-black'>{t("intro")}</p>
          <h2 className='mt-4 mb-2'><b>{t("title")}</b></h2>
          <div className='text-black font-normal'>
            <p className='my-3 text-black'>{t("para1")} </p><br />
            <p className='my-3 text-black'>{t("para2")}</p>
            <p className='my-3 text-black'>{t("para3")}</p>
            <p className='my-3 text-black'>{t("para4")}</p>
            <p className='my-3 text-black'>{t("para5")}</p>
            <p className='my-3 text-black'>{t("para6")}</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Details;
