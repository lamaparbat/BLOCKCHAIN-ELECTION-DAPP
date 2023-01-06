import React, { useState } from 'react';
import Marquee from "react-fast-marquee";
import { getEventDate } from '../utils/getEventDate';

const MarqueeBar = ({ counterData }): React.ReactElement => {
  const [counter, setCounter] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [diffInMillis, setDiffInMillis] = useState(1);

  if (counterData.startDate) {
    const interval = setInterval(() => {
      const { days, hours, minutes, seconds, diffInMillis } = getEventDate(counterData.startDate);
      setDiffInMillis(diffInMillis);
      setCounter({ days, hours, minutes, seconds });
    }, 1000);
    console.log(diffInMillis)
    if (diffInMillis <= 0) clearInterval(interval);
  }

  return (
    <Marquee className='h-[30px] bg-red-500 text-sm text-light'>
      {counterData.title}
      Election starts on: Days:{counter.days} Hours:{counter.hours} Minutes:{counter.minutes} Seconds:{counter.seconds}
    </Marquee>
  )
}

export default MarqueeBar
