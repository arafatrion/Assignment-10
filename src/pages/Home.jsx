import React from 'react';
import Hero from '../Components/Hero';
import RecipeContainer from '../Components/RecipeContainer';
import TopLikedRecipe from './TopLikedRecipe';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <RecipeContainer></RecipeContainer>
            <TopLikedRecipe></TopLikedRecipe>
        </div>
    );
};

export default Home;