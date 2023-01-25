import React from 'react';
import PropTypes from 'prop-types';

function CatSelect({ getBreed }) {
  const handleCatBreed = e => {
    getBreed(e.target.value);
  };

  return (
    <span>
      <select onChange={handleCatBreed}>
        <option value="koreanShort">고양이(코리안 숏헤어)</option>
        <option value="persian">고양이(페르시안)</option>
        <option value="angora">고양이(앙고라)</option>
      </select>
    </span>
  );
}

CatSelect.propTypes = {
  getBreed: PropTypes.func,
};
CatSelect.defaultProps = {
  getBreed: null,
};

export default CatSelect;
