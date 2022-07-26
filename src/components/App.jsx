import React from 'react';

import NumberForm from './NumberForm.jsx';
import NumbersList from './NumbersList.jsx';

const App = () =>  (
  <div className="d-flex flex-column h-100">
    <NumberForm />
    <NumbersList />
  </div>
);

export default App;
