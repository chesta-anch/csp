import React from 'react';

const SpecificRequirements = ({ setFormData, formData }) => {
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  return (
    <div>
      <label htmlFor="specificRequirements">Do you have any specific requirements or preferences regarding the cloud service provider?</label> <br />
      <textarea id="specificRequirements" name="specificRequirements" rows="4" cols="50"
        value={formData.specificRequirements || ''}
        onChange={handleChange}
      ></textarea> <br />
    </div>
  );
};

export default SpecificRequirements;
