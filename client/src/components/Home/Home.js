import React from 'react';
import Slider from './Slider/Slider';
import Items from '../Items/Items';
import Dashboard from '../Dashboard/Dashboard';

function Home() {
  return (
    <>
      <Slider />
      <Dashboard />
      <Items />
    </>
  )
}

export default Home