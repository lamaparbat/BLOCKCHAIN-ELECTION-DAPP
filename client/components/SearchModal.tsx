import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { SpinningCircles } from 'react-loading-icons';

const SearchModal = () => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {

  }, []);

  const onChange = (e) => {

  }

  const onTyping = () => setLoading(true);

  return (
    <Modal show={true}>
      <Modal.Body className='px-4 pb-4'>
        <div className='search--header flex justify-between pt-3'>
          <input
            type="search"
            placeholder="Search..."
            className='outline-none'
            onChange={onChange}
            onKeyUp={onTyping}
          />
          <AiOutlineSearch className='text-xl mr-5' />
        </div>
        <hr />
        {loading ? "Loading..." :
          !searchResult?.length && <span className='text-secondary'>No Result Found !</span>}

        {searchResult?.length > 0 && <div></div>}
      </Modal.Body>
    </Modal>
  )
}

export default SearchModal;
