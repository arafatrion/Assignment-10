import React from 'react';

const Hero = () => {
    return (
      <div
  className="hero mx-0 bg-cover bg-center h-150"
  style={{
    backgroundImage:
      "url(https://i.postimg.cc/Zn5t2vjc/cooking-techniques-article.jpg)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl text-center font-bold">Discover,Cook,& Enjoy</h1>
      <p className="mb-5">
       Cooking is more than just making food - it's an art of mixing flavours, a way to share love,and a journey of creativity in the Kitchen.
      </p>
      
    </div>
  </div>
</div>
    );
};

export default Hero;