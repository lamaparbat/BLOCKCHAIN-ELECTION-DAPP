import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { GLOBAL_SEARCH_KEYWORD } from '../constants';

const SearchModal = ({ show, setOpenSearchModal }) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isDefaulSearchResultShows, setDefaultSearchShows] = useState(true);
  const modalRef = useRef(null);
  const router = useRouter();

  // on didmount
  useEffect(() => {
    document.addEventListener("click", (event: Event & { target: Element }) => {
      if (event.target.role === "dialog") setOpenSearchModal(false);
    }, true);

    return () => {
      document?.removeEventListener("click", null, true);
    }
  }, []);

  useEffect(() => {
    const e = {target: {value:"a"}};
    if(show) onChange(e);
    setDefaultSearchShows(true);
  }, [show])

  const onChange = (e:any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const keyword = e?.target?.value?.toLocaleLowerCase().trim();
      const filterArray = _.filter(GLOBAL_SEARCH_KEYWORD, (result) => { return _.includes(_.toLower(result.keywords.join()), keyword)})

      setSearchResult(filterArray?.slice(0,6))  
    },1000)
  }

  const onTyping = (e) => {
    setLoading(e.target.value.length > 0 ?? false)
    setDefaultSearchShows(!(e.target.value.length > 0));
  }

  const navigate = (url:string) => {
    router.push(url);
  }

  return (
    <Modal show={show} ref={modalRef}>
      <Modal.Body className='px-4 pb-4'>
        <div className='search--header flex justify-between pt-3'>
          <input
            type="text"
            placeholder="Search..."
            className='text-sm outline-none font-mono w-full'
            onChange={onChange}
            onKeyUp={onTyping}
          />
          <AiOutlineSearch className='text-xl mr-5' />
        </div>
        <hr />
        {!loading && !isDefaulSearchResultShows && searchResult?.length > 0 && <h5>Search Result: {searchResult?.length}</h5>}
        {loading ?
          <SkeletonTheme baseColor="#f8f9fa" highlightColor="#e5eaef" >
            <Skeleton count={1} height={25} width={120} /><br />
            <Skeleton count={1} height={25} width={200} />
            <Skeleton count={1} height={30} width={350} />
            <Skeleton className='mt-4' count={1} height={25} width={200} />
            <Skeleton count={1} height={30} width={350} />
          </SkeletonTheme>
          : !searchResult?.length && <span className='text-secondary'>No Result Found !</span>}
        {!loading && searchResult && searchResult?.map((d:any, i:number) => {
          return(
            <div className='my-4' key={i}>
              <div>
              <div className='py-1 px-2 bg-slate-100 font-bold text-lg cursor-pointer' onClick={() => navigate(d?.link)} key={i}>{d?.keywords[0]}</div>
              {
                d.keywords.map((keyword:string, i:number) => {
                  return(
                    <div className='ml-4 mt-1 mb-2 cursor-pointer hover:text-blue-500' onClick={() => navigate(d?.link)} key={i}>{d?.keywords[i+1]}</div>
                  )
                })
              }
              </div>
            </div>
          )
        })}
      </Modal.Body>
    </Modal>
  )
}

export default SearchModal;
