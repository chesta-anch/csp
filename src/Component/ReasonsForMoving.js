import React, { useState } from 'react';

const ReasonsForMoving = ({ setFormData, formData }) => {
  const [reasonForMoving, setReasonForMoving] = useState({
    Accessibility: false,
    CostReduction: false,
    Scalability: false,
    DisasterRecovery: false,
    Other: false,
  });

  const handleChange = (e) => {
    const { name, checked, value } = e.target;

    if (name === 'Other') {
      setFormData({
        ...formData,
        [name]: checked,
        otherReasonText: checked ? '' : formData.otherReasonText, // Reset otherReasonText if unchecked
      });
    } else {
      const updatedReasons = { ...reasonForMoving, [name]: checked };
      setReasonForMoving(updatedReasons);

      if (name === 'reasonForMoving') {
        const updatedReasonForMoving = checked
          ? [...(formData.reasonForMoving || []), value]
          : (formData.reasonForMoving || []).filter(item => item !== value);
  
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: checked,
          reasonForMoving: updatedReasonForMoving,
        }));
      }
    }
    //console.log(formData);
  };

  return (
    <div>
      <label htmlFor="reasonForMoving">Please select the reason for moving the cloud server?</label>
      <div>
        <input 
          type="checkbox"
          id="accessibility"
          name="Accessibility"
          checked={reasonForMoving.Accessibility || false}
          onChange={handleChange}
          value="Accessibility"
        />
        <label htmlFor="accessibility">Accessibility</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="costReduction"
          name="CostReduction"
          checked={reasonForMoving.CostReduction || false}
          onChange={handleChange}
          value="CostReduction"
        />
        <label htmlFor="costReduction">Cost Reduction</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="scalability"
          name="Scalability"
          checked={reasonForMoving.Scalability || false}
          onChange={handleChange}
          value="Scalability"
        />
        <label htmlFor="scalability">Scalability</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="disasterRecovery"
          name="DisasterRecovery"
          checked={reasonForMoving.DisasterRecovery || false}
          onChange={handleChange}
          value="DisasterRecovery"
        />
        <label htmlFor="disasterRecovery">Disaster Recovery</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="otherReason"
          name="Other"
          checked={reasonForMoving.Other || false}
          onChange={handleChange}
          value="Other"
        />
        <label htmlFor="otherReason">Other</label>
        {formData.Other && (
          <input
            type="text"
            id="otherReasonText"
            name="otherReasonText"
            value={formData.otherReasonText || ''}
            onChange={(e) => setFormData({ ...formData, otherReasonText: e.target.value })}
          />
        )}
      </div>
    </div>
  );
};

export default ReasonsForMoving;
