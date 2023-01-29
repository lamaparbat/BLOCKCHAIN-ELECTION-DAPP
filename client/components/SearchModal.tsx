import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchModal = ({ show, setOpenSearchModal }) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const modalRef = useRef(null);

  // on didmount
  useEffect(() => {
    document.addEventListener("click", (event: Event & { target: Element }) => {
      if (event.target.role === "dialog") setOpenSearchModal(false);
    }, true);

    return () => {
      document?.removeEventListener("click", null, true);
    }
  }, []);

  const onChange = (e) => {

  }

  const onTyping = (e) => setLoading(e.target.value.length > 0 ?? false);
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
        {loading ?
          <SkeletonTheme baseColor="#f8f9fa" highlightColor="#e5eaef" >
            <Skeleton count={1} height={25} width={120} /><br />
            <Skeleton count={1} height={25} width={200} />
            <Skeleton count={1} height={30} width={350} />
            <Skeleton className='mt-4' count={1} height={25} width={200} />
            <Skeleton count={1} height={30} width={350} />
          </SkeletonTheme>
          : !searchResult?.length && <span className='text-secondary'>No Result Found !</span>}

        {searchResult?.length > 0 && <div></div>}
      </Modal.Body>
    </Modal>
  )
}

export default SearchModal;
