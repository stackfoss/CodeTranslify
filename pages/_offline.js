import React from 'react';

const OfflinePage = () => {
  const handleClickRefresh = () => {
    // Logic to attempt a manual refresh
    window.location.reload();
  };

  return (
    <div>
      <h1>Oops! You are offline.</h1>
      <p>Please check your internet connection and try again.</p>
      <button onClick={handleClickRefresh}>Refresh</button>
    </div>
  );
};

export default OfflinePage;

