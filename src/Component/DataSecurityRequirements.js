import React from 'react';

const DataSecurityRequirements = ({ setFormData, formData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox
    if (type === 'checkbox') {
      // Clone the existing array of selected options or create an empty array if it doesn't exist
      const updatedSecurityOptions = formData.dataStorageSecurity ? [...formData.dataStorageSecurity] : [];

      // If the checkbox is checked, add the value to the array; otherwise, remove it
      if (checked) {
        updatedSecurityOptions.push(value);
      } else {
        const index = updatedSecurityOptions.indexOf(value);
        if (index !== -1) {
          updatedSecurityOptions.splice(index, 1);
        }
      }

      // Update the form data with the new array of selected options
      setFormData({
        ...formData,
        [name]: updatedSecurityOptions
      });
    } else {
      // For other input types, update the form data directly
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Show/hide "Other" text input based on "Other" checkbox selection
    if (name === 'dataStorageSecurity' && value === 'Other') {
      const otherSpecifyInput = document.getElementById('other_specify');
      otherSpecifyInput.style.display = checked ? 'block' : 'none';
    }
    //console.log(formData);
  };

  return (
    <div>
        <label htmlFor="dataStorageSecurity">What are your organization's key data storage and security requirements? (Select all that apply)</label> <br />
        <input type="checkbox" id="encryption" name="dataStorageSecurity" value="Encryption" onChange={handleChange} />
        <label htmlFor="encryption">Data Encryption</label> <br />

        <input type="checkbox" id="accessControls" name="dataStorageSecurity" value="AccessControl" onChange={handleChange} />
        <label htmlFor="accessControl">Data Access Controls</label> <br />

        <input type="checkbox" id="complianceRegulations" name="dataStorageSecurity" value="ComplianceRegulations" onChange={handleChange} />
        <label htmlFor="complianceRegulations">Compliance Regulations (e.g., GDPR, HIPAA)</label> <br />

        <input type="checkbox" id="dDoSProtection" name="dataStorageSecurity" value="DDoSProtection" onChange={handleChange} />
        <label htmlFor="dDoSProtection">DDoS Protection</label> <br />

        <input type="checkbox" id="iam" name="dataStorageSecurity" value="IAM" onChange={handleChange} />
        <label htmlFor="iam">Identity and Access Management</label> <br />

        <input type="checkbox" id="firewall" name="dataStorageSecurity" value="Firewall" onChange={handleChange} />
        <label htmlFor="firewall">Firewall</label> <br />

        <input type="checkbox" id="other" name="dataStorageSecurity" value="Other" onChange={handleChange} />
        <label htmlFor="other">Other (Please specify):</label>
        <input type="text" id="other_specify" name="other_specify" style={{ display: 'none' }} onChange={handleChange} /> <br />
        <br />

         {/* <label htmlFor="securityFeatures">Do you have any specific security features or certifications that are important to you?</label> <br />
        <textarea id="securityFeatures" name="securityFeatures" rows="2" cols="30"
        value={formData.securityFeatures || ''}
        onChange={handleChange}
      ></textarea> */}

    </div>
  );
}

export default DataSecurityRequirements;