import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import { ThemeContext } from '../providers/ThemeProvider';

const MainLayout = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} mx-auto`}>
        {noHeaderFooter || <Navbar></Navbar>}
        <Outlet></Outlet>
       {noHeaderFooter || <Footer></Footer>}
    </div>
    );
};

export default MainLayout;