import React from 'react'
import "./heroSection.css";
import SearchBar from '../SearchBar';

export default function HeroSection() {
  return (
    <div className="hero">
    <div className="hero-container">
        <div className="image-section">
           
            <img src="/images/1.4.webp" alt="Home Section" />

         <div className="text-section">
             <p>Find your perfect home <br /> away from home</p>
         </div>
     
        </div>
      </div>
      <div className="searchbar-section">
      <SearchBar />
      </div>
      </div>
    
              
    

  )
}
