import React from 'react';
import AboutPageHeader from "@/components/AboutPageHeader";
import StorySection from '@/components/StorySection';
import AboutFeaturesSection from '@/components/AboutFeatureSection';
import FeaturesSection from '@/components/Features';
import AboutEmailSignUp from '@/components/AboutEmailSignUp';


const About = () => {
    return (
        <div className="about-page-container">
            <AboutPageHeader />
            <StorySection/>
            <AboutFeaturesSection />
            <FeaturesSection />
            <AboutEmailSignUp />
        </div>
    );
};

export default About;
