import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import ElectionCard from '../components/LiveCounterCard/ElectionCard';
import { Carousel } from '@trendyol-js/react-carousel';
import { getElectionList } from '../utils';
import _ from 'lodash';
import { getStorage } from '../services';
import Marquee from 'react-fast-marquee';
import { FaRegNewspaper } from 'react-icons/fa';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import 'animate.css';

export default function Home() {
  const [electionLists, setElectionLists] = useState([]);
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");
  const [countDown, setCountDown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timer, setTimer] = useState({ id: "seconds", play: false });
  const countDownDate = new Date("March 5, 2023 15:37:25").getTime();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const electionList = await getElectionList();

      setElectionLists(electionList);
    })();

    setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountDown({ days, hours, minutes, seconds });
    }, 1000);
  }, []);


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
    }, 950);
  }, [countDown.seconds]);

  return (
    <div>
      <Head>
        <title>DAPP VOTING</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      <div className='px-4 py-3 flex justify-center'>
        <div className='flex flex-column justify-between'>
          <div className='lg:w-[1100px] w-full lg:px-4 max-[1100px]:px-1'>
            <div className='flex items-center'>
              <div className='w-full flex'>
                <div className='w-[200px] px-3 py-[5px] flex items-center bg-red-600 rounded-tr-[10px] text-slate-100 shadow-inner'>
                  <FaRegNewspaper className='text-2xl mr-2' />
                  Latest update
                </div>
                <Marquee pauseOnHover={true} gradient={false} className="tracking-wider text-blue-900">
                  निर्वाचनका सम्पूर्ण गतिविधिहरूलाई आम जनताको सहज पहुँचसम्म पुर्याउन निर्वाचन आयोग अन्तर्गत ७ वटा प्रदेशमा प्रदेश निर्वाचन कार्यालय रहेका छन जसमा नेपाल सरकारको प्रशासन सेवा, सामान्य प्रशासन समूह, राजपत्रांकित द्वित्तीय श्रेणीको प्रदेश निर्वाचन अधिकारी कार्यालय प्रमुखका रूपमा रहने व्यवस्था गरिएको छ । सम्बन्धित प्रदेश निर्वाचन कार्यालयको वेबसाइटमा जानको लागि प्रदेश छनौट गर्नुहोस :
                </Marquee>
              </div>
            </div>

            <div className='h-[400px] w-100 my-3 object-cover rounded-t-[5px] overflow-hidden'>
              <Fade
                autoplay={true}
                nextArrow={<BsChevronRight className='absolute text-slate-100 text-4xl' />}
                prevArrow={<BsChevronLeft className='absolute text-slate-100 text-4xl' />}>
                <img className='h-[400px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner1.jpeg" />
                <img className='h-[400px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner2.jpeg" />
                <img className='h-[400px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner3.jpeg" />
                <img className='h-[400px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner4.jpeg" />
                <img className='h-[400px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner5.jpeg" />
                <img className='h-[400px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner6.jpeg" />
                <img className='h-[400px] w-100 object-cover transition ease-in-out delay-[500px] hover:scale-125 hover:opacity-100' src="/images/banner7.jpeg" />
              </Fade>
            </div>

            <div className='countdown_timer p-2 py-4 my-5 h-[350px] bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkkyoysDz8fhLil6JB1VlqOh08zd-h2emhWw&usqp=CAU")] rounded-1 text-slate-100 flex flex-column items-center'>
              <h3 className='my-4 mb-3 text-slate-300 text-center'>Election Nepal 2024 Happening</h3>
              <div className='px-5 flex justify-evenly w-100 mt-3'>
                <div className='days w-[140px] text-center'>
                  <h5 className='my-3 text-slate-300'>DAYS</h5>
                  <div className='px-3 py-3 text-8xl bg-black shadow-lg rounded-1 countdown_timer_count overflow-hidden'>
                    <div className={`animate__animated ${timer.id === "days" && timer.play && "animate__slideInUp"}`}>{countDown.days}</div>
                  </div>
                </div>
                <div className='days w-[140px] text-center'>
                  <h5 className='my-3 text-slate-300'>HOURSE</h5>
                  <div className='px-3 py-3 text-8xl bg-black shadow-lg rounded-1 countdown_timer_count overflow-hidden'>
                    <div className={`animate__animated ${timer.id === "hours" && timer.play && "animate__slideInUp"}`}>{countDown.hours}</div>
                  </div>
                </div>
                <div className='days w-[140px] text-center'>
                  <h5 className='my-3 text-slate-300'>MINUTES</h5>
                  <div className='px-3 py-3 text-8xl bg-black shadow-lg rounded-1 countdown_timer_count overflow-hidden'>
                    <div className={`animate__animated ${timer.id === "minutes" && timer.play && "animate__slideInUp"}`}>{countDown.minutes}</div>
                  </div>
                </div>
                <div className='days w-[140px] text-center'>
                  <h5 className='my-3 text-slate-300'>SECONDS</h5>
                  <div className='px-3 py-3 text-8xl bg-black shadow-lg rounded-1 countdown_timer_count overflow-hidden'>
                    <div className={`animate__animated ${timer.id === "seconds" && timer.play && "animate__slideInUp"}`}>{countDown.seconds}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='my-5'>
              <h4 className='font-bold'>Election Gallery</h4>
              <div className='flex justify-between'>
                <Carousel
                  className='pt-2 shadow-none'
                  show={3}
                  slide={3}
                  transition={0.5}
                  infinite={true}
                  swiping={true}
                  responsive={true}
                >
                  <ElectionCard title={electionLists[0]} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6TmGNICTnHT0loCNYhfHl19PNyeyoFwgWWA&usqp=CAU"} />
                  <ElectionCard title={electionLists[1]} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7tAfxvSIht5RdzGToAQY4_-dijvGgxsXAg&usqp=CAU"} />
                  <ElectionCard title={electionLists[2]} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVbKo5oeymz96MHktj8BTL5Ylyx-AhWVCe_Q&usqp=CAU"} />
                  <ElectionCard title={electionLists[3]} src={"https://static.pib.gov.in/WriteReadData/userfiles/image/image01342FU.jpg"} />
                </Carousel>
              </div>
            </div>


            <div className='my-4'>
              <h5 className='font-bold'>Overall Elections Data</h5>
              <div className='w-full'>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}