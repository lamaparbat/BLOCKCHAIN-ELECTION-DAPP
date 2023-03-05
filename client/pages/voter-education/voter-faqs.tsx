import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Accordion from 'react-bootstrap/Accordion';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import { responsive, SmartContract } from '../../constants';
import { getStorage } from '../../services';
import { getHostedUrl } from '../../utils/action';
import { getFaqs } from '../../utils/web3';
import { BiSend } from 'react-icons/bi';
import CommentCard from '../../components/CommentCard';

const defaultFaqDetails = { title: null, description: null, file: null };
let replyComment = { userId: null, replyMsg: null }

const VoterFaqs = () => {
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [newFaq, setNewFaq] = useState({ ...defaultFaqDetails });
  const loggedInAccountAddress = getStorage("loggedInAccountAddress");

  useEffect(() => {
    getFaqsList();
  }, []);

  const getFaqsList = async () => {
    const faqList = await getFaqs();
    setFaqList([...faqList]);
  }

  const onAddHeaderClick = () => {
    setOpenAddQuestionModal(!openAddQuestionModal)
    !openAddQuestionModal && setNewFaq({ ...defaultFaqDetails });
  }

  const handleSubmit = async () => {
    try {
      setFaqList([...faqList, newFaq]);
      const formData = new FormData();
      formData.append("faqFile", newFaq.file);

      const response = await getHostedUrl(formData);
      if (response) {
        const { data: { url } } = response;
        url ? await SmartContract.methods.addFaqs(
          newFaq.title,
          newFaq.description,
          url,
          new Date()
        ).send({ from: loggedInAccountAddress }) : toast.error("Failed to upload File !");
        toast.success("Faq successfully uploaded !");
        await getFaqsList();
      }
    } catch (error) {
      console.error(error)
    }
  }

  const postComment = async () => {
    try {
      const { userId, replyMsg } = replyComment;
      await SmartContract.methods.addFaqComment(userId, replyMsg, new Date().toISOString()).send({ from: loggedInAccountAddress });
      await getFaqsList();
      toast.success("Comment posted successfully.");
    } catch (error) {
      toast.error("Failed to post comment !");
      console.error(error);
    }
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
                      onChange={(e) => setNewFaq({ ...newFaq, description: e.target.value })}
                    ></textarea>
                    <input type="file" name="file" className='form-control my-3' onChange={(e) => setNewFaq({ ...newFaq, file: e.target.files[0] })} />
                    <button
                      className='btn btn-primary rounded-1 px-3 my-3'
                      disabled={!newFaq.title || !newFaq.description}
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
                        <Accordion.Body>
                          <div className='h-[400px] w-100 overflow-hidden'>
                            <Image
                              src={faq.fileUrl}
                              alt={faq.title}
                              height={500}
                              width={900}
                              loading="lazy"
                              className='object-cover w-100 h-100'
                            />
                          </div>
                          <p className='my-2'>{faq.description}</p><br />
                          <div className='input__cont flex border border-slate-200 rounded-tr-[10px] overflow-hidden'>
                            <input
                              type='text'
                              className='form-control rounded-1 border-0 shadow-none'
                              placeholder='Reply your opinions'
                              onChange={(e) => (replyComment = { ...replyComment, userId: faq._id, replyMsg: e.target.value })}
                            />
                            <button className='btn btn-primary rounded-0 px-4' onClick={postComment}><BiSend /></button>
                          </div>
                          <div className='replies my-3'>
                            <h5>Comments</h5>
                            {
                              faq?.comments?.map((comment: any, i: number) => {
                                console.log({ comment })
                                return <CommentCard
                                  key={i}
                                  address={comment.userId}
                                  comment={comment.replyMsg}
                                  date={comment.createdAt}
                                />
                              })
                            }
                          </div>
                        </Accordion.Body>
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
