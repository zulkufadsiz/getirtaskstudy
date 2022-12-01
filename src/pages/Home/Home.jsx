import React from 'react';
import SideFilters from '../../components/SideFilters/SideFilters';
import Products from '../../components/Products/Products';
import { Container } from '@mui/material';
import './Home.css';
import { ModalDialog } from '../../components/ModalDialog/ModalDialog';

function Home() {
  return (
    <Container className="mt-16">
      <div className="home-container">
        <div className="filter-dialog">
          <ModalDialog title="Filter" cancelText="Cancel" okText="Okay" content={<SideFilters />} />
        </div>
        <div className="side-filter-container">
          <SideFilters />
        </div>
        <Products />
      </div>
    </Container>
  );
}

export default Home;
