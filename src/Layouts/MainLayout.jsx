import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <>
         <Navbar></Navbar>
         <div className='w-11/12 mx-auto my-3 min-h-[calc(100vh-282px)]' >
         
          <Outlet></Outlet>
         
           
         </div>
         
         <Footer></Footer>  
        </>
    );
};

export default MainLayout;