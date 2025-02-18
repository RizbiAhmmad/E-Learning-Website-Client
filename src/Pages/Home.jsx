import React from 'react';
import Banner from '../Components/Banner';
import Partners from '../Components/Partners';
import CallToAction from '../Components/CallToAction';
import FunFacts from '../Components/FunFacts';
import BecomeInstructor from '../Components/BecomeInstructor';
import OurTopCourses from '../Components/OurTopCourses';
import Testimonials from '../Components/Testimonials';
import LiveChat from '../Components/LiveChat';
import PricingPlans from '../Components/PricingPlans';
import LearningProgress from '../Components/LearningProgress';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <OurTopCourses></OurTopCourses>
            <Testimonials></Testimonials>  
            <BecomeInstructor></BecomeInstructor>  
            <PricingPlans></PricingPlans>                 
            <FunFacts></FunFacts>
            <LearningProgress></LearningProgress>
            <LiveChat></LiveChat>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;