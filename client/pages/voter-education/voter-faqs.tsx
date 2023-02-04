import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { AiOutlinePlus } from 'react-icons/ai';
import Navbar from '../../components/Navbar';
import { responsive } from '../../constants';

const defaultFaqDetails = { title: null, desc: null };
const VoterFaqs = () => {
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [newFaq, setNewFaq] = useState({ ...defaultFaqDetails });


  const onAddHeaderClick = () => {
    setOpenAddQuestionModal(!openAddQuestionModal)
    !openAddQuestionModal && setNewFaq({ ...defaultFaqDetails });
  }

  const handleSubmit = () => {
    setFaqList([...faqList, newFaq]);
  }

  return (
    <div className=''>
      <div className='constitutional--provision--container'>
        <Navbar />
        <div className='flex justify-center mt-3 mb-5 px-3 lg:px-0'>
          <div className={`${responsive} flex justify-between rounded-1 flex-wrap lg:px-3`}>
            <div className='w-full'>
              <h4 className='mt-2 mb-4'>Frequently Asked Question (FAQs)</h4>
              <div className='faq--input mb-4 rounded-2 overflow-hidden bg-slate-100'>
                <div
                  className='add--header px-4 py-[15px] flex justify-between items-center cursor-pointer bg-blue-100'
                  onClick={onAddHeaderClick}
                >
                  <span>Add new question</span>
                  <AiOutlinePlus className='text-2xl text-secondary' />
                </div>
                {
                  openAddQuestionModal && <div className='p-3'>
                    <input
                      className="form-control mb-2 py-2 shadow-none"
                      type="text"
                      placeholder="Title"
                      onChange={(e) => setNewFaq({ ...newFaq, title: e.target.value })}
                    />
                    <textarea
                      className="form-control h-[250px] shadow-none"
                      placeholder="Descriptions"
                      onChange={(e) => setNewFaq({ ...newFaq, desc: e.target.value })}
                    ></textarea>
                    <button
                      className='btn btn-primary rounded-1 px-3 my-3'
                      disabled={!newFaq.title || !newFaq.desc}
                      onClick={handleSubmit}
                    >Submit</button>
                  </div>
                }
              </div>
              <Accordion defaultActiveKey={['0']}>
                {
                  faqList && faqList.map((faq, i) => {
                    return (
                      <Accordion.Item eventKey={`${i}`} className='shadow-md border-white-500 mb-3' key={i}>
                        <Accordion.Header>{faq.title}</Accordion.Header>
                        <Accordion.Body>{faq.desc}</Accordion.Body>
                      </Accordion.Item>
                    )
                  })
                }
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoterFaqs;
