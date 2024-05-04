import React, { useState } from 'react';
import CompanyInfo from './CompanyInfo';
import CurrentInfrastructure from './CurrentInfrastructure';
import CloudServices from './CloudServices';
import ReasonsForMoving from './ReasonsForMoving';
import DataSecurityRequirements from './DataSecurityRequirements';
import ScalabilityPerformance from './ScalabilityPerformance';
import BudgetCost from './BudgetCost';
import SpecificRequirements from './SpecificRequirements';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function UserInput({ handleFormSubmit }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem('email') || '',
  });
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const sections = [
    { name: 'Company Information', component: <CompanyInfo setFormData={setFormData} formData={formData} /> },
    { name: 'Current IT Infrastructure', component: <CurrentInfrastructure setFormData={setFormData} formData={formData} /> },
    { name: 'Cloud Services', component: <CloudServices setFormData={setFormData} formData={formData} /> },
    { name: 'Reasons for Moving to the Cloud', component: <ReasonsForMoving setFormData={setFormData} formData={formData} /> },
    { name: 'Data and Security Requirements', component: <DataSecurityRequirements setFormData={setFormData} formData={formData} /> },
    { name: 'Scalability and Performance', component: <ScalabilityPerformance setFormData={setFormData} formData={formData} /> },
    { name: 'Budget and Cost Considerations', component: <BudgetCost setFormData={setFormData} formData={formData} /> },
    { name: 'Specific Requirements', component: <SpecificRequirements setFormData={setFormData} formData={formData} /> }
  ];

  const handleNext = () => {
    if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
    console.log(formData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    handleFormSubmit('userinput');
  };

  const handleConfirmation = async () => {
    setIsConfirmed(true);
    setShowModal(false);
    const email = localStorage.getItem('email');
    try {
      const response = await axios.post('http://localhost/csp/api/cloudrequirement.php', {
        ...formData,
        email: email,
      });

      if (response.data.success) {
        // setMessage(response.data.success);
      }
    } catch (error) {
      console.error(error);
    }
  };

    const handleServer = async () => {
    try {
      const cloudServerResponse = await axios.post('http://localhost/csp/api/cloudservices.php', {
        ...formData
      });

      console.log(cloudServerResponse);

      if (cloudServerResponse.data && Object.keys(cloudServerResponse.data).length > 0) {
        //const serverNames = cloudServerResponse.data.map(server => server.serviceName);
        //setTopThreeServers(serverNames);
        handleFormSubmit('suggestedservers', cloudServerResponse.data); 
      } else {
        console.log("No cloud servers found.");
      }
    } catch (error) {
      console.error("Error fetching top cloud servers:", error);
    }
    if(isConfirmed){

    }
  };


  return (
    <div className="userinput">
      <div className="sidebar">
        <ul>
          {sections.map((section, index) => (
            <li key={index} className={sectionIndex === index ? 'active' : ''} onClick={() => setSectionIndex(index)}>{section.name}</li>
          ))}
        </ul>
      </div>
      <div className="content-wrapper">
        <div className="content">
          <h1>{sections[sectionIndex].name}</h1>
          {sections[sectionIndex].component}
        </div>
        <div className="navigation">
          {sectionIndex > 0 && <Button className='previous' onClick={() => setSectionIndex(sectionIndex - 1)}>Previous</Button>}
          {sectionIndex < sections.length - 1 && <Button className='next' onClick={handleNext}>Next</Button>}
          {sectionIndex === sections.length - 1 && <Button className='next' onClick={handleSubmit}>Submit</Button>}
        </div>
        <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal">
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure all information provided is correct?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
                handleConfirmation();
                handleServer();
                }}>
              Yes, Finish
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UserInput;
