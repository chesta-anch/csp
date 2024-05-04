import React from 'react';

const CurrentInfrastructure = ({ setFormData, formData }) => {
  // Ensure that formData.noOfEmployees and formData.annualRevenue are not undefined
  // eslint-disable-next-line
  const noOfEmployees = formData.noOfEmployees || '';
  // eslint-disable-next-line
  const annualRevenue = formData.annualRevenue || '';

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'checkbox') {
      const updatedOptions = checked
        ? [...(formData.typesOfData || []), value] // Add the selected value
        : formData.typesOfData.filter((option) => option !== value); // Remove the unselected value
      setFormData({ ...formData, typesOfData: updatedOptions });
    } else {
      // For other input types, update the value directly
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData);
  };

  return (
    <div>
      <label htmlFor='noOfEmployees'>How many employees does your organization have? (Fill number only)</label> <br />
      <div>
        <input type="radio" id="100" name="noOfEmployees" value="100"
          checked={formData.noOfEmployees === '100'}
          onChange={handleChange}
        />
        <label htmlFor="100">0 - 100</label> <br />

        <input type="radio" id="250" name="noOfEmployees" value="250"
          checked={formData.noOfEmployees === '250'}
          onChange={handleChange}
        />
        <label htmlFor="250">101 - 250</label> <br />

        <input type="radio" id="500" name="noOfEmployees" value="500"
          checked={formData.noOfEmployees === '500'}
          onChange={handleChange}
        />
        <label htmlFor="500">251 - 500</label> <br />

        <input type="radio" id="750" name="noOfEmployees" value="750"
          checked={formData.noOfEmployees === '750'}
          onChange={handleChange}
        />
        <label htmlFor="750">501 or more</label>
      </div> <br />
      {/* <input type='number' name="noOfEmployees" onChange={handleChange} value={noOfEmployees} /> <br /> <br /> */}

      <label htmlFor='annualRevenue'>What's the annual revenue of your organization? (In $ only)</label> <br />
      <div>
        <input type="radio" id="1" name="annualRevenue" value="1"
          checked={formData.annualRevenue === '1'}
          onChange={handleChange}
        />
        <label htmlFor="1">Less than $ million</label> <br />

        <input type="radio" id="5" name="annualRevenue" value="5"
          checked={formData.annualRevenue === '5'}
          onChange={handleChange}
        />
        <label htmlFor="5">$1 million - $5 million</label> <br />

        <input type="radio" id="10" name="annualRevenue" value="10"
          checked={formData.annualRevenue === '10'}
          onChange={handleChange}
        />
        <label htmlFor="10">$5 million - $10 million</label> <br />

        <input type="radio" id="50" name="annualRevenue" value="50"
          checked={formData.annualRevenue === '50'}
          onChange={handleChange}
        />
        <label htmlFor="50">$10 million or more</label>
        </div> <br />
      {/* <input type='number' name="annualRevenue" onChange={handleChange} value={annualRevenue} /> <br /> <br /> */}

      <label htmlFor="dataTypes">What types of data will you be storing in the cloud?</label> <br />
      
      <input type="checkbox" id="structuredData" name="typesOfData" value="Structured Data" 
        checked={formData.typesOfData && formData.typesOfData.includes('Structured Data')}
        onChange={handleChange}/>
      <label htmlFor="structuredData">Structured Data</label> <br />
      
      <input type="checkbox" id="unstructuredData" name="typesOfData" value="Unstructured Data"
        checked={formData.typesOfData && formData.typesOfData.includes('Unstructured Data')}
        onChange={handleChange}
      />
      <label htmlFor="unstructuredData">Unstructured Data</label> <br />
     
      <input type="checkbox" id="semiStructuredData" name="typesOfData" value="Semi-Structured Data"
        checked={formData.typesOfData && formData.typesOfData.includes('Semi-Structured Data')}
        onChange={handleChange}
      />
      <label htmlFor="semiStructuredData">Semi-Structured Data</label> <br />
      
      <input type="checkbox" id="transactionalData" name="typesOfData" value="Transactional Data"
        checked={formData.typesOfData && formData.typesOfData.includes('Transactional Data')}
        onChange={handleChange}
      />
      <label htmlFor="transactionalData">Transactional Data</label> <br />

      <input type="checkbox" id="sensitiveData" name="typesOfData" value="Sensitive Data"
        checked={formData.typesOfData && formData.typesOfData.includes('Sensitive Data')}
        onChange={handleChange}
      />
      <label htmlFor="sensitiveData">Sensitive Data</label> <br />
      
      <input type="checkbox" id="other" name="typesOfData" value="Other"
        checked={formData.typesOfData && formData.typesOfData.includes('Other')}
        onChange={handleChange}
      />
      <label htmlFor="other">Other</label> <br />
      
      {formData.typesOfData && formData.typesOfData.includes('Other') &&
        <input type="text" id="otherType" name="otherType"
          value={formData.otherType || ''} // Use otherTypeValue instead of formData.otherType
          onChange={(e) => setFormData({ ...formData, otherType: e.target.value })}
        />
      }
    </div>
  );
};

export default CurrentInfrastructure;