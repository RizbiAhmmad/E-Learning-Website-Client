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

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <OurTopCourses></OurTopCourses>
            <Testimonials></Testimonials>  
            <BecomeInstructor></BecomeInstructor>
            <LearningPathPage></LearningPathPage>  
            <PricingPlans></PricingPlans>                 
            <FunFacts></FunFacts>
            <LiveChat></LiveChat>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;