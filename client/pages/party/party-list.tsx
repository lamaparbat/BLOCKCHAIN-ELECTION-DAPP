import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { responsive, SmartContract } from '../../constants';
import Navbar from '../../components/Navbar';
import PartyCard from '../../components/PartyCard';
import VoterCardSkeleton from "../../components/Skeleton/voter-card-skeleton";
import { getPartyList } from '../../utils';
import { setParties } from '../../redux/partyReducer';

const Details: React.FC = (): React.ReactElement => {
  const [partyList, setPartyLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAgendaPreviewModal, setOpenAgendaPreviewModal] = useState(false);
  const [selectedPartyDetails, setSelectedPartyDetails] = useState<any>({});
  const dispatch = useDispatch();
  let partyEvent: any = null;

  useEffect(() => {
    (async () => {
      const list = await getPartyList();
      dispatch(setParties(list));
      setPartyLists(list);

      partyEvent = SmartContract.events?.PartyCreated().on("data", (event: any) => {
        dispatch(setParties([...partyList, event.returnValues[0]]));
      }).on("error", () => console.error("PartyCreated Event Error !"));
    })();

    return () => {
      partyEvent && partyEvent?.unsubscribe();
    }
  }, []);

  const openAgendaPreview = (partyDetails) => {
    setSelectedPartyDetails(partyDetails);
    setOpenAgendaPreviewModal(true);
  }

  const handleClose = () => setOpenAgendaPreviewModal(false);

  return (
    <div className='mb-[50px]'>
      <Navbar /><br />
      <div className='w-full flex justify-center px-5'>
        <div className={`${responsive} flex-col justify-start rounded-1`}>
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-black mt-4'>Party List</p>
            <div className='flex justify-between my-4'>
              <input type='search' className='form-control' placeholder='Search parties' />
            </div>
          </div><br />
          <div className='voter__container flex flex-wrap justify-between'>
            {loading && <VoterCardSkeleton repeatCount={12} />}
            {
              partyList ?
                partyList.map((partyList, i) =>
                  <PartyCard
                    lists={partyList}
                    openAgendaPreview={openAgendaPreview}
                    key={i}
                  />) : "No Party Available !"
            }
          </div>
        </div>
      </div>
      <Modal show={openAgendaPreviewModal} className="px-2">
        <Modal.Header>
          <h4 className='mt-3'>{selectedPartyDetails?.name} Agenda</h4>
        </Modal.Header>
        <Modal.Body>
          {selectedPartyDetails?.agenda}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Details;
