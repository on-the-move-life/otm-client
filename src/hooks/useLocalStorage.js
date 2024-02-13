import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Retrieve the initial value from local storage if available, otherwise use the initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving from local storage:', error);
      return initialValue;
    }
  });

  // Function to update the value in local storage and state
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting to local storage:', error);
    }
  };

  // Function to get a single item from local storage
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error retrieving item from local storage:', error);
      return null;
    }
  };

  return [storedValue, setValue, getItem];
};

export default useLocalStorage;
