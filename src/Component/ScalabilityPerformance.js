import React, { useState } from 'react';

const ScalabilityPerformance = ({ setFormData, formData }) => {
  const [scalabilityRequirement, setScalabilityRequirement] = useState({
    scaleUpOrDown: false,
    handleSpikes: false,
    addResources: false,
  });

  const [performanceExpectation, setPerformanceExpectation] = useState({
    highAvailability: false,
    fastResponseTimes: false,
    consistentPerformance: false,
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    responseTime: false,
    throughput: false,
    latency: false,
    errorRates: false,
  });

  const handleChange = (e) => {
    const { name, checked, value } = e.target;

    if (name === 'scalabilityRequirement') {
      const updatedScalability = checked
        ? [...(formData.scalabilityRequirement || []), value]
        : (formData.scalabilityRequirement || []).filter(item => item !== value);

      setScalabilityRequirement({
        ...scalabilityRequirement,
        [value]: checked,
      });

      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked,
        scalabilityRequirement: updatedScalability,
      }));
    }

    if (name === 'performanceExpectation') {
      const updatedPE = checked
        ? [...(formData.performanceExpectation || []), value]
        : (formData.performanceExpectation || []).filter(item => item !== value);

      setPerformanceExpectation({
        ...performanceExpectation,
        [value]: checked,
      });

      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked,
        performanceExpectation: updatedPE,
      }));
    }

    if (name === 'performanceMetrics') {
      const updatedPM = checked
        ? [...(formData.performanceMetrics || []), value]
        : (formData.performanceMetrics || []).filter(item => item !== value);

      setPerformanceMetrics({
        ...performanceMetrics,
        [value]: checked,
      });

      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked,
        performanceMetrics: updatedPM,
      }));
    }

    //console.log(formData);
  };

  return (
    <div>
      <label htmlFor='scalabilityRequirement'>What specific scalability requirements does your organization have in mind while considering a transition to cloud services?</label> <br />
      <input type="checkbox" id="scaleUpOrDown" name="scalabilityRequirement" value="scaleUpOrDown" onChange={handleChange} checked={scalabilityRequirement.scaleUpOrDown || false} />
      <label htmlFor="scaleUpOrDown">Ability to easily scale up or down based on demand</label><br />
      <input type="checkbox" id="handleSpikes" name="scalabilityRequirement" value="handleSpikes" onChange={handleChange} checked={scalabilityRequirement.handleSpikes || false} />
      <label htmlFor="handleSpikes">Support for handling sudden spikes in workload</label><br />
      <input type="checkbox" id="addResources" name="scalabilityRequirement" value="addResources" onChange={handleChange} checked={scalabilityRequirement.addResources || false} />
      <label htmlFor="addResources">Flexibility to add new resources as needed</label><br /> <br />

      <label htmlFor='performanceExpectation'>What performance expectations does your organization have for applications and services hosted in the cloud?</label> <br />
      <input type="checkbox" id="highAvailability" name="performanceExpectation" value="highAvailability" onChange={handleChange} checked={performanceExpectation.highAvailability || false} />
      <label htmlFor="highAvailability">High availability and uptime</label><br />
      <input type="checkbox" id="fastResponseTimes" name="performanceExpectation" value="fastResponseTimes" onChange={handleChange} checked={performanceExpectation.fastResponseTimes || false} />
      <label htmlFor="fastResponseTimes">Fast response times</label><br />
      <input type="checkbox" id="consistentPerformance" name="performanceExpectation" value="consistentPerformance" onChange={handleChange} checked={performanceExpectation.consistentPerformance || false} />
      <label htmlFor="consistentPerformance">Consistent performance across different regions</label><br /> <br />

      <label htmlFor='performanceMetrics'>Which performance metrics or benchmarks are most important for your organization to track in the cloud environment?</label> <br />
      <input type="checkbox" id="responseTime" name="performanceMetrics" value="responseTime" onChange={handleChange} checked={performanceMetrics.responseTime || false} />
      <label htmlFor="responseTime">Response time</label><br />
      <input type="checkbox" id="throughput" name="performanceMetrics" value="throughput" onChange={handleChange} checked={performanceMetrics.throughput || false} />
      <label htmlFor="throughput">Throughput</label><br />
      <input type="checkbox" id="latency" name="performanceMetrics" value="latency" onChange={handleChange} checked={performanceMetrics.latency || false} />
      <label htmlFor="latency">Latency</label><br />
      <input type="checkbox" id="errorRates" name="performanceMetrics" value="errorRates" onChange={handleChange} checked={performanceMetrics.errorRates || false} />
      <label htmlFor="errorRates">Error rates</label><br />
    </div>
  );
};

export default ScalabilityPerformance;
