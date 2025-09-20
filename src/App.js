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
import UsestateSample1 from './UsestateSample1';
import UsestateDetails1 from './UsestateDetails1';
import Usestatepost2 from './Usestatepost2';
import UseContext6 from './UseContext6';
import Products from './Products';
import Cart from './Cart';
import Payment from './Payment';
import SuccessPayment from './SuccessPayment';
import DataUsersRedux from './DataUsersRedux';
import DataUsers1 from './DataUsers1';
import DataUsers2 from './DataUsers2';
import UsestateExp1 from './UsestateExp1';
import Usestate3 from './Usestate3';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Usestate1 />} />
        <Route path="/usestate2" element={<Usestate2 />} />
        <Route path='/usestate3' element={<Usestate3/>} />
        <Route path='/usestatesample' element={<UsestateSample/>} />
        <Route path="/usestatesample/:userId" element={<UsestateDetails />} />
        <Route path='/usestatepost1' element={<Usestatepost1/> } />
        <Route path='/usestatesample1' element={<UsestateSample1/>} />
        <Route path='/usestatesample1/:userId' element={<UsestateDetails1/>} />
        <Route path='/usestatepost2' element={<Usestatepost2/>} />
        <Route path="/useeffect1" element={<Useeffect1 />} />
        <Route path="/usecontext1" element={<Usecontext1 />} />
        <Route path="/usecontext2" element={<Usecontext2 />} />
        <Route path="/usecontext3" element={<Usecontext3 />} />
        <Route path="/usecontext4" element={<Usecontext4 />} />
        <Route path='/usecontext5' element={<Usecontext5/>} />
        <Route path='/usecontext6' element={<UseContext6/>} />
        <Route path="/usereducer1" element={<Usereducer1 />} />
        <Route path="/usereducer2" element={<Usereducer2 />} />
        <Route path='/usereducer3' element={<Usereducer3/>} />
        <Route path="/products" element={<Products/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/successpayment' element={<SuccessPayment/>} />
        <Route path='/datausersredux' element={<DataUsersRedux/>} >
          <Route index element={<DataUsers1/>} />
          <Route path='datausers2' element={<DataUsers2/>} />
        </Route>
        <Route path="/useref1" element={<Useref1 />} />
        <Route path="/useref2" element={<Useref2 />} />
        <Route path="/usememo1" element={<Usememo1 />} />
        <Route path="/parentcallback1" element={<Parentcallback1/>} />
        <Route path="Title" element={<Title />} />
        <Route path='/usecustomhook1' element={<UseCustomHook1/>} />
        <Route path='/usecustomhook2' element={<Usecustomhook2/>} />
        <Route path='/usecustomhook' element={<Usecustomhook/>} />
        <Route path="/datatables" element={<Datatables/>} />
        <Route path='/usestateexp1' element={<UsestateExp1/>} />
        <Route path="*" element={<Progress />} /> {/* Catch-all for unmatched routes */}
      </Routes>
    </Router>
  );
};

export default App;
