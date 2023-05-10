import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setCandidateDetails } from '../../redux/reducers/candidateReducer';
import Avatar from '../Avatar';
import { CandidateCardStruct } from '../../interfaces/index';
import FilterIcon from '../FilterIcon';
import _ from 'lodash';
import { TiLockClosed } from 'react-icons/ti';
import { getStorage } from '../../services';
import { getElectionList, getVoterList } from '../../utils';

declare const window: any;

const CandidateCard: React.FC<CandidateCardStruct> = (props) => {
  const { details, border, ishighlighted, casteVote }: any = props;
  const [currentElection, setCurrentElection] = useState(null);

  // redux dispatcher
  const dispatch = useDispatch();
  const router = useRouter();

  const openDetails = (details: any) => {
    dispatch(setCandidateDetails(details));
    router.push("/party/details");
  }

  const [isDedicatedVoter, setDedicatedVoter] = useState(false);



  const fetchData = async () => {
    const voterLists = await getVoterList();
    const electionLists = await getElectionList();
    const _currentAccount = electionLists?.at(-1);

    setTimeout(() => {
      const loggedInAccountAddress = getStorage("loggedInAccountAddress");
      const loggedInUser = voterLists.find((candidate: any) => candidate.user._id === loggedInAccountAddress);

      setCurrentElection(_currentAccount);
      setDedicatedVoter(_currentAccount.type !== "Local" ? loggedInUser.user.district === details?.votingBooth : true);
    }, 100)
  }

  useEffect(() => {
    fetchData();

    window.ethereum.on("accountsChanged", (accounts: any) => {
      fetchData();
    });

  }, []);

  const voted = details?.votedVoterLists?.includes(getStorage("loggedInAccountAddress"));

  return (
    <div className={`card__candidates py-1 pe-4 pb-2 rounded-1 ${border} ${ishighlighted && 'bg-slate-50 drop-shadow-md'}`}>
      <div className='ml-4 mt-1 d-flex items-center justify-between'>
        <div className='d-flex items-center cursor-pointer' onClick={() => openDetails(details)}>
          <Avatar className='avatar' src={details?.user?.profile} alt="profile" size='md' border={2} />
          <div className='px-3'>
            <h6 className='text-[16px]'>{details?.user?.fullName}</h6>
            <div className='d-flex items-center -mt-[5px]'>
              <FilterIcon party={details?.agenda} />
              <span className='mx-2 text-sm text-slate-600'>{details?.partyName}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <h3 className='mr-5 mt-2' id='count'>{details?.votedVoterLists?.length ?? 0}</h3>
          {
            new Date() > new Date(currentElection?.startDate) && new Date() < new Date(currentElection?.endDate) && isDedicatedVoter &&
            <button
              className={`relative flex justify-center items-center bg-slate-100 ${!voted && "shadow-md"} pt-2 pb-2 px-4 rounded-pill text-sm ${voted && "text-slate-500 cursor-default"}`}
              onClick={() => !voted && casteVote(details?.user?._id, details?.position)}
              disabled={voted}
            >
              {
                voted && <span className='absolute -top-1 -left-2 p-1 rounded-circle bg-slate-200 shadow-md cursor-default'>
                  <TiLockClosed className='text-slate-500' />
                </span>
              }
              Vote
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default CandidateCard;