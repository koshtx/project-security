// Pagination.js
import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ addressesPerPage, totalAddresses, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAddresses / addressesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button 
              onClick={() => paginate(number)} 
              className='page-link'
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  addressesPerPage: PropTypes.number.isRequired,
  totalAddresses: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;