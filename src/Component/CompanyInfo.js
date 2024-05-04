import React, { useEffect } from 'react';

function CompanyInfo({ formData, setFormData }) {

  useEffect(() => {
    const companyNameFromLocalStorage = localStorage.getItem('companyName');
    if (companyNameFromLocalStorage) {
      setFormData(prevState => ({ ...prevState, companyName: companyNameFromLocalStorage }));
    }
  }, [setFormData]); // Add setFormData to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //console.log(formData);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className='left'>Company Name</td>
            <td className='right'><input type="text" name="companyName" value={formData.companyName || ''} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className='left'>Industry</td>
            <td className='right'>
              <select name="industry" value={formData.industry || ''} onChange={handleChange} required>
                <option value="">Select Industry</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Other">Other</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className='left'>Contact Person</td>
            <td className='right'><input type="text" name="contactPerson" value={formData.contactPerson || ''} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className='left'>Contact Number</td>
            <td className='right'><input type="text" name="contactNumber" value={formData.contactNumber || ''} onChange={handleChange} required /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompanyInfo;
