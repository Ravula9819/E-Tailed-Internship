import React, { useState } from 'react';
import styles from './Onboarding.module.css';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    industry: '',
    size: '',
    theme: 'light',
    dashboardLayout: 'spacious'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  const handleSubmit = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('onboardingData', JSON.stringify(formData));
    onComplete(formData);
  };

  const isStepValid = () => {
    if (step === 1) return formData.name && formData.email;
    if (step === 2) return formData.companyName && formData.industry && formData.size;
    return true;
  };

  return (
  <div className={styles.pageWrapper}>
    <div className={styles.container}>
      <h2>Step {step} of 3</h2>
      <progress value={step - 1} max="3"></progress>

      {/* Form Steps */}
      {step === 1 && (
        <>
          <label>
            Name:
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input name="email" value={formData.email} onChange={handleChange} required />
          </label>
        </>
      )}

      {step === 2 && (
        <>
          <label>
            Company Name:
            <input name="companyName" value={formData.companyName} onChange={handleChange} />
          </label>
          <label>
            Industry:
            <input name="industry" value={formData.industry} onChange={handleChange} />
          </label>
          <label>
            Size:
            <input name="size" value={formData.size} onChange={handleChange} />
          </label>
        </>
      )}

      {step === 3 && (
        <>
          <label>
            Theme:
            <select name="theme" value={formData.theme} onChange={handleChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label>
            Dashboard Layout:
            <select name="dashboardLayout" value={formData.dashboardLayout} onChange={handleChange}>
              <option value="spacious">Spacious</option>
              <option value="compact">Compact</option>
            </select>
          </label>
        </>
      )}

      <div className={styles.buttons}>
        {step > 1 && <button onClick={handleBack}>Back</button>}
        {step < 3 && <button disabled={!isStepValid()} onClick={handleNext}>Next</button>}
        {step === 3 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  </div>
);
};

export default Onboarding;
