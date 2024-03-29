import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ElectionCard from '../components/LiveCounterCard/ElectionCard';
import { getElectionList } from '../utils';
import _ from 'lodash';
import Marquee from 'react-fast-marquee';
import Select from "react-select";
import { FaRegNewspaper, FaTransgender, FaVoteYea } from 'react-icons/fa';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import 'animate.css';
import { BiFemale, BiGroup, BiMale } from 'react-icons/bi';
import ElectionUserCard from '../components/ElectionUserCard';
import { PROVINCE } from '../constants';
import { getVoterList, getTotalPartiesCount, getCandidateList } from '../utils/web3';
import { getCurrentElection, getElectionStatus } from '../utils/common';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import electionChannel from '../services/pusher-events';

export default function Home() {
  const homepageTranslate = useTranslations("homepage");
  const navbarTranslate = useTranslations("navbar");
  const electionGalleryT = useTranslations("election_gallery_card");

  const [electionLists, setElectionLists] = useState([]);
  const [translateProvinceOptions, setTranslateProvinceOptions] = useState([]);
  const [currentElection, setCurrentElection] = useState(null);
  const [electionStatus, setElectionStatus] = useState(null);
  const [countDown, setCountDown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timer, setTimer] = useState({ id: "seconds", play: false });
  const [totalDataCount, setTotalDataCount] = useState({
    candidates: 0, voters: 0, parties: 0, elections: 0,
    maleVoters: 0, femaleVoters: 0, otherVoters: 0,
    maleCandidates: 0, femaleCandidate: 0, otherCandidates: 0
  });
  const isCurrentElectonLive = currentElection && new Date(currentElection?.endDate) > new Date();

  const electionState = useSelector((state: any) => state.commonReducer.currentElection);

  const fetchAllData = async () => {
    const electionList = await getElectionList();

    setTranslateProvinceOptions(PROVINCE.map((province: any) => ({ label: homepageTranslate(province.value), value: province.value })))
    setCurrentElection(await getCurrentElection());
    setElectionLists(electionList);

    handleOverviewCountSort(null);
  };


  useEffect(() => {
    fetchAllData();

    const browserZoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
    if (!(browserZoomLevel === 80 || browserZoomLevel === 102) && browserZoomLevel < 170 && browserZoomLevel < 110) {
      setTimeout(() => {
        toast.info("Please, Unzoom your browser screen to 80% for better view. Thanks !", {
          className: "w-[600px]",
          toastId: 123,
          position: "top-center"
        })
      }, 1000);
    }

    return () => {
      window.removeEventListener("resize", null);
    }
  }, []);


  useEffect(() => {
    fetchAllData();
  }, [electionState]);


  if (electionLists?.length > 0) {
    const { startDate } = electionLists?.at(-1);

    if (new Date() < new Date(startDate)) {
      const interval = setInterval(() => {
        const diff = new Date(startDate).getTime() - new Date().getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (minutes < 0 || diff < 0 || days < 0 || seconds < 0) {
          setCountDown((prev) => {
            return { ...prev }
          });

          return clearInterval(interval)
        };

        setCountDown({ days, hours, minutes, seconds });
      }, 1000);
    }
  }

  useEffect(() => {
    setTimer({ id: "days", play: true });
    setTimeout(() => {
      setTimer({ id: "days", play: false });
    }, 950);
  }, [countDown.days]);

  useEffect(() => {
    setTimer({ id: "hours", play: true });
    setTimeout(() => {
      setTimer({ id: "hours", play: false });
    }, 950);
  }, [countDown.hours]);

  useEffect(() => {
    setTimer({ id: "minutes", play: true });
    setTimeout(() => {
      setTimer({ id: "minutes", play: false });
    }, 950);
  }, [countDown.minutes]);

  useEffect(() => {
    setTimer({ id: "seconds", play: true });
    setTimeout(() => {
      setTimer({ id: "seconds", play: false });
    }, 900);
  }, [countDown.seconds]);


  useEffect(() => {
    if (countDown.seconds === 0 && countDown.minutes === 0 && countDown.hours === 0 && isCurrentElectonLive) {
      setInterval(() => {
        fetchAllData();
      }, 4000);
    }
  }, [countDown.seconds]);


  const handleOverviewCountSort = async (provinceNo: string) => {
    const totalPartiesCount = await getTotalPartiesCount();
    const candidates = await getCandidateList();
    const voters = await getVoterList();

    const totalCandidates = candidates.filter((d: any) => provinceNo ? (d.user.province === provinceNo) : true)?.length;
    const maleCandidates = candidates.filter((d: any) => provinceNo ? (d.user.province === provinceNo && d?.user.gender === "MALE") : d?.user.gender === "MALE")?.length;
    const femaleCandidate = candidates.filter((d: any) => provinceNo ? (d.user.province === provinceNo && d?.user.gender === "FEMALE") : d?.user.gender === "FEMALE")?.length;
    const otherCandidates = candidates.filter((d: any) => provinceNo ? (d.user.province === provinceNo && d?.user.gender !== "MALE" && d?.user.gender !== "FEMALE") : (d?.user.gender !== "MALE" && d?.user.gender !== "FEMALE"))?.length;

    const totalVoters = voters.filter((d: any) => provinceNo ? (d.user.province === provinceNo) : true)?.length;
    const maleVoters = voters.filter((d: any) => provinceNo ? d.user.province === provinceNo && d?.user.gender === "MALE" : d?.user.gender === "MALE")?.length;
    const femaleVoters = voters.filter((d: any) => provinceNo ? d.user.province === provinceNo && d?.user.gender === "FEMALE" : d?.user.gender === "FEMALE")?.length;
    const otherVoters = voters.filter((d: any) => provinceNo ? d.user.province === provinceNo && d?.user.gender !== "MALE" && d?.user.gender !== "FEMALE" : d?.user.gender !== "MALE" && d?.user.gender !== "FEMALE")?.length;

    setTotalDataCount({
      ...totalDataCount,
      voters: totalVoters ?? 0,
      maleVoters,
      femaleVoters,
      otherVoters,
      candidates: totalCandidates ?? 0,
      maleCandidates,
      femaleCandidate,
      otherCandidates,
      parties: totalPartiesCount ?? 0,
      elections: electionLists?.length ?? 0
    });
  }


  electionChannel.bind("start-election-event", () => {
    console.log("election started-----> binary election");
    setElectionStatus("LIVE");
  });

  electionChannel.bind("end-election-event", () => {
    console.log("election ended-----> binary election");
    setElectionStatus("ENDED")
  });

  return (
    <div>
      <Head>
        <title>{navbarTranslate("title")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      <div className='px-4 py-3 flex justify-center'>
        <div className='flex flex-column justify-between'>
          <div className='lg:w-[1065px] w-[100vw] overflow-hidden'>
            <div className='flex items-center'>
              <div className='w-full flex'>
                <div className='shrink-0 w-[155px] px-2 py-[5px] flex items-center bg-red-600 rounded-tr-[10px] text-slate-100 text-md shadow-inner'>
                  <FaRegNewspaper className='text-2xl mr-2' />
                  {homepageTranslate("latest_update")}
                </div>
                <Marquee pauseOnHover={true} gradient={false} className="tracking-wider text-blue-900">
                  निर्वाचनका सम्पूर्ण गतिविधिहरूलाई आम जनताको सहज पहुँचसम्म पुर्याउन निर्वाचन आयोग अन्तर्गत ७ वटा प्रदेशमा प्रदेश निर्वाचन कार्यालय रहेका छन जसमा नेपाल सरकारको प्रशासन सेवा, सामान्य प्रशासन समूह, राजपत्रांकित द्वित्तीय श्रेणीको प्रदेश निर्वाचन अधिकारी कार्यालय प्रमुखका रूपमा रहने व्यवस्था गरिएको छ । सम्बन्धित प्रदेश निर्वाचन कार्यालयको वेबसाइटमा जानको लागि प्रदेश छनौट गर्नुहोस :
                </Marquee>
              </div>
            </div>

            <div className='mt-3 w-full lg:h-[400px] sm:h-[300px] md:rounded-t-[5px] sm:rounded-0 overflow-hidden'>
              <Fade
                autoplay={true}
                nextArrow={<BsChevronRight className='absolute text-slate-100 text-4xl' />}
                prevArrow={<BsChevronLeft className='absolute text-slate-100 text-4xl' />}>
                {/* <img className='lg:h-[400px] h-[300px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner1.jpeg" /> */}
                {/* <img className='lg:h-[400px] h-[300px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner2.jpeg" /> */}
                <img className='lg:h-[400px] h-[300px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner3.jpeg" />
                <img className='lg:h-[400px] h-[300px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner4.jpeg" />
                <img className='lg:h-[400px] h-[300px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner5.jpeg" />
                <img className='lg:h-[400px] h-[300px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner6.jpeg" />
                <img className='lg:h-[400px] h-[300px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner7.jpeg" />
              </Fade>
            </div>

            {electionStatus !== "LIVE" && electionStatus !== "ENDED" && <div>
              <div className='countdown_timer py-4 my-3 min-h-[320px] sm:h-fit bg-[url("https://t4.ftcdn.net/jpg/02/83/57/05/360_F_283570582_3J78GC9E5OesLLgG5lUkQLGEoyN2ijmc.jpg")] rounded-1 text-slate-100 flex flex-column items-center'>
                <h3 className='my-4 mb-3 text-slate-300 text-md text-center'>{homepageTranslate("countdown_title")}</h3>
                <div className='flex justify-evenly flex-wrap lg:w-[70vw] mt-3'>
                  <div className='days lg:w-[140px] sm:w-[100px] mx-3 text-center'>
                    <h5 className='my-3 text-slate-300'>{homepageTranslate("countdown_days")}</h5>
                    <div className='px-0 lg:py-[10px] sm:py-2 lg:text-8xl sm:text-6xl bg-[url("https://t3.ftcdn.net/jpg/03/05/45/96/240_F_305459609_qqNT6Sk6DZGhcEexcAbs9xfq2iI3yl2e.jpg")] card__box__shadow rounded-1 countdown_timer_count overflow-hidden'>
                      <div className={`animate__animated ${timer.id === "days" && timer.play && "animate__slideInUp"}`}>{countDown.days}</div>
                    </div>
                  </div>
                  <div className='days lg:w-[140px] sm:w-[100px] mx-3 text-center'>
                    <h5 className='my-3 text-slate-300'>{homepageTranslate("countdown_hours")}</h5>
                    <div className='px-0 lg:py-[10px] sm:py-2 lg:text-8xl sm:text-6xl bg-[url("https://t3.ftcdn.net/jpg/03/05/45/96/240_F_305459609_qqNT6Sk6DZGhcEexcAbs9xfq2iI3yl2e.jpg")] card__box__shadow rounded-1 countdown_timer_count overflow-hidden'>
                      <div className={`animate__animated ${timer.id === "hours" && timer.play && "animate__slideInUp"}`}>{countDown.hours}</div>
                    </div>
                  </div>
                  <div className='days lg:w-[140px] sm:w-[100px] mx-3 text-center'>
                    <h5 className='my-3 text-slate-300'>{homepageTranslate("countdown_minutes")}</h5>
                    <div className='px-0 lg:py-[10px] sm:py-2 lg:text-8xl sm:text-6xl bg-[url("https://t3.ftcdn.net/jpg/03/05/45/96/240_F_305459609_qqNT6Sk6DZGhcEexcAbs9xfq2iI3yl2e.jpg")] card__box__shadow rounded-1 countdown_timer_count overflow-hidden'>
                      <div className={`animate__animated ${timer.id === "minutes" && timer.play && "animate__slideInUp"}`}>{countDown.minutes}</div>
                    </div>
                  </div>
                  <div className='days lg:w-[140px] sm:w-[100px] mx-3 text-center'>
                    <h5 className='my-3 text-slate-300'>{homepageTranslate("countdown_seconds")}</h5>
                    <div className='px-0 lg:py-[10px] sm:py-2 lg:text-8xl sm:text-6xl bg-[url("https://t3.ftcdn.net/jpg/03/05/45/96/240_F_305459609_qqNT6Sk6DZGhcEexcAbs9xfq2iI3yl2e.jpg")] card__box__shadow rounded-1 countdown_timer_count overflow-hidden'>
                      <div className={`animate__animated ${timer.id === "seconds" && timer.play && "animate__slideInUp"}`}>{countDown.seconds}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

            <div className='my-5 lg:px-0 sm:px-2 xsm:px-2'>
              <h4 className='font-bold text-md'>{homepageTranslate("election_gallery")}</h4>
              <div className='flex lg:justify-between md:justify-between flex-wrap sm:justify-center'>
                {electionLists?.length === 0 && <span className='ml-2'>{homepageTranslate("no_election_found")}</span>}
                {
                  _.orderBy(electionLists, "startDate", "desc")?.map((election, i) => {
                    const electionDetails = { ...election, voters: election.electionType === "Local" ? (totalDataCount.voters + totalDataCount.candidates - 2) : totalDataCount.voters };
                    return (
                      <ElectionCard
                        key={i}
                        details={electionDetails}
                        src={election.galleryImagesUrl[0]}
                        electionStatus={election.startDate === currentElection.startDate && electionStatus}
                      />
                    )
                  })
                }
              </div>
            </div>

            <div className='my-4 lg:px-0 sm:px-2 mb-3 lg:h-[400px] sm:h-fit xsm:px-2'>
              <div className='flex justify-between items-center py-3'>
                <h4 className='font-bold mt-2 text-md'>{homepageTranslate("overall_election_data")}</h4>
                <Select
                  className='text-md'
                  options={translateProvinceOptions}
                  placeholder={homepageTranslate("selecte_province_placeholder")}
                  onChange={({ value }) => handleOverviewCountSort(value)}
                />
              </div>
              {totalDataCount && <div className='w-full flex justify-between sm:flex-wrap xsm:flex-wrap'>
                <ElectionUserCard label={homepageTranslate("total_voters")} value={totalDataCount.voters ?? 0} Icon={<BiGroup className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={homepageTranslate("male_voters")} value={totalDataCount.maleVoters ?? 0} Icon={<BiMale className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={homepageTranslate("female_voters")} value={totalDataCount.femaleVoters ?? 0} Icon={<BiFemale className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={homepageTranslate("others")} value={totalDataCount.otherVoters ?? 0} Icon={<FaTransgender className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={homepageTranslate("total_election")} value={totalDataCount.elections ?? 0} Icon={<FaVoteYea className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={homepageTranslate("total_parties")} value={totalDataCount.parties ?? 0} Icon={<BiMale className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={electionGalleryT("total_candidate")} value={totalDataCount.candidates ?? 0} Icon={<BiMale className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={homepageTranslate("male_candidate")} value={totalDataCount.maleCandidates ?? 0} Icon={<BiMale className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={homepageTranslate("female_candidate")} value={totalDataCount.femaleCandidate ?? 0} Icon={<BiMale className='text-4xl text-blue-900' />} />
                <ElectionUserCard label={homepageTranslate("others")} value={totalDataCount.otherCandidates ?? 0} Icon={<BiMale className='text-4xl text-blue-900' />} />
              </div>}
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}
