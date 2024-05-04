import React, { useState } from 'react';

const CloudServices = ({ setFormData, formData }) => {
  const [cloudServices, setCloudServices] = useState({
    Public: formData.cloudServicesType ? formData.cloudServicesType.includes('Public') : false,
    Private: formData.cloudServicesType ? formData.cloudServicesType.includes('Private') : false,
    Hybrid: formData.cloudServicesType ? formData.cloudServicesType.includes('Hybrid') : false
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'usingCloudServices') {
      setFormData({ ...formData, [name]: value });
    } else {
      setCloudServices(prevState => ({ ...prevState, [name]: checked }));
      // Check if formData is defined before updating
      if (formData) {
        const updatedServices = Object.keys(cloudServices).filter(service => cloudServices[service]);
        setFormData(prevFormData => ({ ...prevFormData, cloudServicesType: updatedServices }));
      }
    }
    console.log(formData);
  };
  
  return (
    <div>
      <label htmlFor="usingCloudServices">Are you currently using any cloud services?</label>
      <div>
        <input type="radio" id="yesCloudServices" name="usingCloudServices" value="Yes"
          checked={formData.usingCloudServices === 'Yes'}
          onChange={handleChange}
        />
        <label htmlFor="yesCloudServices">Yes</label>
  
        <input type="radio" id="noCloudServices" name="usingCloudServices" value="No"
          checked={formData.usingCloudServices === 'No'}
          onChange={handleChange}
        />
        <label htmlFor="noCloudServices">No</label>
      </div>
      {formData.usingCloudServices === 'Yes' && (
        <div>
          <label htmlFor="cloudServiceProvider">Please specify:</label>
          <input type="text" id="cloudServiceProvider" name="cloudServiceProvider"
            value={formData.cloudServiceProvider || ''}
            onChange={(e) => setFormData({ ...formData, cloudServiceProvider: e.target.value })} />
        </div>
      )}
  
      <br />
      <label htmlFor="cloudServices">What types of cloud services does your organization currently utilize or plan to utilize? (Select all that apply)</label> <br />
      <input type="checkbox" id="public" name="Public"
        checked={cloudServices.Public}
        onChange={handleChange} />
      <label htmlFor="public"><i>Public: </i>Infrastructure as a Service (IaaS)</label> <br />
  
      <input type="checkbox" id="private" name="Private"
        checked={cloudServices.Private}
        onChange={handleChange}
      />
      <label htmlFor="private"><i>Private: </i>Platform as a Service (PaaS)</label> <br />
  
      <input type="checkbox" id="hybrid" name="Hybrid"
        checked={cloudServices.Hybrid}
        onChange={handleChange}
      />
      <label htmlFor="hybrid"><i>Hybrid: </i>Software as a Service (SaaS)</label> <br />
  
  
    </div>
  );
  
}

export default CloudServices;
