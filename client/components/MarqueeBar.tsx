import React, { useState } from 'react';
import Marquee from "react-fast-marquee";
import { useDispatch } from 'react-redux';
import { getEventDate } from '../utils/getEventDate';
import { setElectionTimeCounter } from '../redux/electionTimeCounter';

const MarqueeBar = ({ counterData }): React.ReactElement => {
  const [counter, setCounter] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [diffInMillis, setDiffInMillis] = useState(1);
  const dispatch = useDispatch();

  if (counterData.startDate) {
    const interval = setInterval(() => {
      const { days, hours, minutes, seconds, diffInMillis } = getEventDate(counterData.startDate);
      setDiffInMillis(diffInMillis);
      setCounter({ days, hours, minutes, seconds });
    }, 1000);
    if (diffInMillis <= 0) {
      clearInterval(interval);
      dispatch(setElectionTimeCounter({startDate:"", endDate:""}));
    }
  }

  return (
    <Marquee className='h-[30px] bg-red-500 text-sm text-light'>
      {counterData.title} &nbsp;
      Election starts on: Days:{counter.days} Hours:{counter.hours} Minutes:{counter.minutes} Seconds:{counter.seconds}
    </Marquee>
  )
}

export default MarqueeBar
