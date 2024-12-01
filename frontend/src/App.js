import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FridgeForm from './components/FridgeForm';
import FridgeList from './components/FridgeList';
import './index.css'; // Import the CSS file

function App() {
  const [items, setItems] = useState([]);

  // Function to fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/FridgeItems');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="full-page">
      <div className="p-6">
        <FridgeForm fetchItems={fetchItems} />
      </div>
      <div className="bottom-container">
        <FridgeList items={items} fetchItems={fetchItems} />
      </div>
    </div>
  );
}

export default App;
