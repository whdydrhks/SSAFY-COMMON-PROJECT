import React from 'react';
import PropTypes from 'prop-types';

function DogSelect({ getBreed }) {
  const handleDogBreed = e => {
    getBreed(e.target.value);
  };

  return (
    <span>
      <select onChange={handleDogBreed}>
        <option value="mix">개(믹스견)</option>
        <option value="jindo">개(진돗개)</option>
        <option value="shiba">개(시바견)</option>
      </select>
    </span>
  );
}

DogSelect.propTypes = {
  getBreed: PropTypes.func,
};
DogSelect.defaultProps = {
  getBreed: null,
};

export default DogSelect;
