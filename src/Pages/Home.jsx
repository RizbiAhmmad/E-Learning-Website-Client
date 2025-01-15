import React from 'react';
import Banner from '../Components/Banner';
import Partners from '../Components/Partners';
import CallToAction from '../Components/CallToAction';
import FunFacts from '../Components/FunFacts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <FunFacts></FunFacts>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;