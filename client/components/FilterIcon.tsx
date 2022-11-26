import React from 'react';
import { AiFillAliwangwang, AiFillAndroid, AiFillBulb, AiFillCodepenCircle, AiOutlineMail } from 'react-icons/ai';
import { PARTIES } from '../constants';

const FilterIcon: React.FC<{ party: string }> = ({ party }): React.ReactElement => {
 return party === PARTIES[0] ? <AiFillBulb /> :
  party === PARTIES[1] ? <AiFillCodepenCircle /> :
   party === PARTIES[2] ? <AiFillAndroid /> :
    <AiFillAliwangwang />
}

export default FilterIcon;
