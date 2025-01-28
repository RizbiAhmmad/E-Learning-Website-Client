import React from 'react';
import Banner from '../Components/Banner';
import Partners from '../Components/Partners';
import CallToAction from '../Components/CallToAction';
import FunFacts from '../Components/FunFacts';
import BecomeInstructor from '../Components/BecomeInstructor';
import OurTopCourses from '../Components/OurTopCourses';
import Testimonials from '../Components/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <OurTopCourses></OurTopCourses>
            <BecomeInstructor></BecomeInstructor> 
            <Testimonials></Testimonials>          
            <FunFacts></FunFacts>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;