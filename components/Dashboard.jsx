import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

import styles from './Dashboard.module.css';

const Dashboard = ({ user, onEdit }) => {
  const {
    name = 'User',
    email = 'Not provided',
    companyName = 'N/A',
    industry = 'N/A',
    size = 'N/A',
    theme = 'light',
    dashboardLayout = 'spacious',
  } = user || {};

  const teamMembersCount = 8;
  const activeProjects = 5;
  const notifications = 3;

  const weeklyProgressData = [
    { week: 'Week 1', progress: 20 },
    { week: 'Week 2', progress: 40 },
    { week: 'Week 3', progress: 65 },
    { week: 'Week 4', progress: 80 },
    { week: 'Week 5', progress: 90 },
    { week: 'Week 6', progress: 100 },
  ];

  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;
  const layoutClass = dashboardLayout === 'compact' ? styles.compactLayout : styles.spaciousLayout;

  // User data cards list
  const userInfoCards = [
    { label: 'Email', value: email },
    { label: 'Company', value: companyName },
    { label: 'Industry', value: industry },
    { label: 'Company Size', value: size },
  ];

  return (
    <main className={`${styles.dashboardContainer} ${themeClass} ${layoutClass}`}>
      <header className={styles.header}>
        <h1 className={styles.welcome}>Welcome, {name}!</h1>
        {onEdit && (
          <button className={styles.editButton} onClick={onEdit}>
            Edit Profile
          </button>
        )}
      </header>

      <section className={styles.userInfo}>
        {userInfoCards.map(({ label, value }) => (
          <div key={label} className={styles.card}>
            <h3>{label}</h3>
            <p>{value}</p>
          </div>
        ))}
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.card}>
          <h3>Team Members</h3>
          <p className={styles.cardNumber}>{teamMembersCount}</p>
        </div>
        <div className={styles.card}>
          <h3>Active Projects</h3>
          <p className={styles.cardNumber}>{activeProjects}</p>
        </div>
        <div className={styles.card}>
          <h3>Notifications</h3>
          <p className={styles.cardNumber}>{notifications}</p>
        </div>
      </section>

      <section className={styles.chartSection}>
        <h2>Weekly Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyProgressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="progress" stroke="#4a90e2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    companyName: PropTypes.string,
    industry: PropTypes.string,
    size: PropTypes.string,
    theme: PropTypes.string,
    dashboardLayout: PropTypes.string,
  }),
  onEdit: PropTypes.func,
};

export default Dashboard;
