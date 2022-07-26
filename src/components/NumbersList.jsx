import React from 'react';
import { useSelector } from 'react-redux';
import texts from '../data-configs/texts.json';

const NumbersList = () => {
  const numbers = useSelector((state) => state.phoneNumbers);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <h2 className="mb-3 fw-normal text-center">{texts.listHeader}</h2>
          <ul className="list-group overflow-auto">
            {numbers.map((number) => (
              <li key={number.id} className="list-group-item">{number.phone}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default NumbersList;

