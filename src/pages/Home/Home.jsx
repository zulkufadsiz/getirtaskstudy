import React from 'react';
import SideFilters from '../../components/SideFilters/SideFilters';
import Products from '../../components/Products/Products';
import { Container } from '@mui/material';
//import FilterModal from '../../components/FilterModal/FilterModal';
import './Home.css';

function Home() {
  return (
    <Container className="mt-16">
      <div className="home-container">
        {/*<FilterModal />*/}
        <SideFilters />
        <Products />
      </div>
    </Container>
  );
}

export default Home;
