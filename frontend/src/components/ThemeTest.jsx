import React from 'react';

const ThemeTest = () => {
  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-red-500 dark:bg-green-500 text-white rounded">
      <div>Theme Test</div>
      <div className="text-xs">Light: Red | Dark: Green</div>
    </div>
  );
};

export default ThemeTest;
