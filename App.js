import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

export default function App() {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const completed = localStorage.getItem('onboardingCompleted') === 'true';
    const savedUser = localStorage.getItem('onboardingData');
    if (completed && savedUser) {
      setUserData(JSON.parse(savedUser));
      setOnboardingCompleted(true);
    }
  }, []);

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    setOnboardingCompleted(true);
  };

  const handleEditProfile = () => {
    setOnboardingCompleted(false);
    localStorage.removeItem('onboardingCompleted');
    localStorage.removeItem('onboardingData');
  };

  return (
    <>
      {!onboardingCompleted && <Onboarding onComplete={handleOnboardingComplete} />}
      {onboardingCompleted && userData && (
        <>
          <Dashboard user={userData} onEdit={handleEditProfile} />
        </>
      )}
    </>
  );
}
