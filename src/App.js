import React from 'react';
import './App.css';
import Layout from "./components/Layout"
import MapProvider from './context/MapProvider';


const App = () => {
  return (
    <MapProvider>
      <Layout />
    </MapProvider>
  );
}

export default App;
