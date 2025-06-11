// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Usestate1 from './Usestate1';
import Useeffect1 from './Useeffect1';
import Usecontext1 from './Usecontext1';
import Progress from './Progress';
import Usecontext2 from './Usecontext2';
import Usecontext3 from './Usecontext3';
import Usereducer1 from './Usereducer1';
import Usestate2 from './Usestate2';
import Usereducer2 from './Usereducer2';
import Useref1 from './Useref1';
import Useref2 from './Useref2';
import Usememo1 from './Usememo1';
import Usecontext4 from './Usecontext4';
import Usereducer3 from './Usereducer3';
import Parentcallback1 from './Parentcallback1';
import Title from './Callback/Title';
import UseCustomHook1 from './Usecustomhook1';
import Usecustomhook2 from './Usecustomhook2';
import Usecustomhook from './Usecustomhook';
import UsestateSample from './UsestateSample';
import UsestateDetails from './UsestateDetails';
import Usestatepost1 from './Usestatepost1';
import Usecontext5 from './useContext5';
import Datatables from './Datatables';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Usestate1 />} />
        <Route path="/usestate2" element={<Usestate2 />} />
        <Route path='/usestatesample' element={<UsestateSample/>} />
        <Route path="/usestatesample/:userId" element={<UsestateDetails />} />
        <Route path='/usestatepost1' element={<Usestatepost1/> } />
        <Route path="/useeffect1" element={<Useeffect1 />} />
        <Route path="/usecontext1" element={<Usecontext1 />} />
        <Route path="/usecontext2" element={<Usecontext2 />} />
        <Route path="/usecontext3" element={<Usecontext3 />} />
        <Route path="/usecontext4" element={<Usecontext4 />} />
        <Route path='/usecontext5' element={<Usecontext5/>} />
        <Route path="/usereducer1" element={<Usereducer1 />} />
        <Route path="/usereducer2" element={<Usereducer2 />} />
        <Route path='/usereducer3' element={<Usereducer3/>} />
        <Route path="/useref1" element={<Useref1 />} />
        <Route path="/useref2" element={<Useref2 />} />
        <Route path="/usememo1" element={<Usememo1 />} />
        <Route path="/parentcallback1" element={<Parentcallback1/>} />
        <Route path="Title" element={<Title />} />
        <Route path='/usecustomhook1' element={<UseCustomHook1/>} />
        <Route path='/usecustomhook2' element={<Usecustomhook2/>} />
        <Route path='/usecustomhook' element={<Usecustomhook/>} />
        <Route path="/datatables" element={<Datatables/>} />
        <Route path="*" element={<Progress />} /> {/* Catch-all for unmatched routes */}
      </Routes>
    </Router>
  );
};

export default App;
