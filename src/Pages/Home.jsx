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
import LearningPathPage from '../Components/LearningPathPage';
import IndustryTrendsPage from '../Components/IndustryTrendsPage';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <OurTopCourses></OurTopCourses>            
            <BecomeInstructor></BecomeInstructor>
            <LearningPathPage></LearningPathPage>
            <IndustryTrendsPage></IndustryTrendsPage>  
            <PricingPlans></PricingPlans>                 
            <FunFacts></FunFacts>
            <Testimonials></Testimonials> 
            <LiveChat></LiveChat>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;