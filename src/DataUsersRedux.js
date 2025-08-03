import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DataUsers1 from './DataUsers1';
import DataUsers2 from './DataUsers2';
import './DataUsersRedux.css'; // Make sure to import the CSS file

const DataUsersRedux = () => {
  // State to track which tab is selected
  const [activeTab, setActiveTab] = useState('datausers1');

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header />
      <div className='container'>
        <h3 className='mt-3 mb-4'>DataUsersRedux</h3>

        {/* Tab navigation */}
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'datausers1' ? 'active' : ''}`}
            onClick={() => handleTabClick('datausers1')}
          >
            DataUsers1
          </button>
          <button 
            className={`tab-button ${activeTab === 'datausers2' ? 'active' : ''}`}
            onClick={() => handleTabClick('datausers2')}
          >
            DataUsers2
          </button>
        </div>

        {/* Content Area */}
        <div className='row'>
          {activeTab === 'datausers1' && <DataUsers1 />}
          {activeTab === 'datausers2' && <DataUsers2 />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataUsersRedux;
