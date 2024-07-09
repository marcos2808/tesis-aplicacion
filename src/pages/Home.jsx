import React from 'react';
import Navbar from '../components/Navbar';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './Home.css';
import vaca1 from '../../img/vaca1.jpg';
import vaca2 from '../../img/vaca2.jpg';
import vaca3 from '../../img/vaca4.jpg';

function Home() {
  const images = [
    {
      original: vaca1,
    },
    {
      original: vaca2,
    },
    {
      original: vaca3,
    },
  ];

  return (
    <div className="home-container">
      <Navbar />
      <div className="image-gallery-container">
        <ImageGallery 
          items={images} 
          showThumbnails={false} 
          showFullscreenButton={false}
          showPlayButton={false}
          showNav={false}
          autoPlay={true}
          slideInterval={3000}
        />
      </div>
    </div>
  );
}

export default Home;
