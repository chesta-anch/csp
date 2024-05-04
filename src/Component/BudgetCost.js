import React from 'react';

const BudgetCost = ({ setFormData, formData }) => {
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });

      //console.log(formData);
    };
  return (
    <div>
      <label htmlFor="budget">What is your budget for cloud services? (In $ only)</label>
      <input type="number" id="budget" name="budget"
        value={formData.budget || ''}
        onChange={handleChange}
      /> <br />

      <label>Are you looking for cost-effective solutions, or are you willing to invest more for additional features and performance?</label>
      <div>
        <input type="radio" id="costEffective" name="costPreference" value="Cost-effective"
          checked={formData.costPreference === 'Cost-effective'}
          onChange={handleChange}
        />
        <label htmlFor="costEffective">Cost-effective</label>
      </div>
      <div>
        <input type="radio" id="premiumFeatures" name="costPreference" value="Premium Features"
          checked={formData.costPreference === 'Premium Features'}
          onChange={handleChange}
        />
        <label htmlFor="premiumFeatures">Premium Features</label>
      </div>
    </div>
  );
}

export default BudgetCost;
