'use client';

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Information.css'; 
import Link from 'next/link';
import Image from 'next/image';
import { articleimg1, articleimg2, articleimg3, learnimg, recycleimg, tipsimg } from '../images';

export default function Information() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  const articles = [
    {
      img: articleimg1,
      link: 'https://www.bbcearth.com/sustainability',
      alt: 'Sustainability Article 1',
    },
    {
      img: articleimg2,
      link: 'https://www.downtoearth.org/articles/2019-10/14826/simple-sustainable-swaps',
      alt: 'Sustainable Swaps Article',
    },
    {
      img: articleimg3,
      link: 'https://www.buerklin.com/en/electronic-competence/news/study-sustainability-in-electronics/',
      alt: 'Sustainability in Electronics Article',
    },
  ];

  const sections = [
    {
      id: 'left',
      title: 'Learn',
      image: learnimg,
      description: 'Gain insights into sustainable practices and eco-friendly living.',
      link: 'https://www.investopedia.com/terms/s/sustainability.asp',
    },
    {
      id: 'main',
      title: 'Recycling Tips',
      image: tipsimg,
      description: 'Learn valuable tips for recycling electronic waste responsibly.',
      link: 'https://www.keygreen.ie/news/post/your-guide-to-electronic-waste-recycling',
    },
    {
      id: 'right',
      title: 'Recycling Locations',
      image: recycleimg,
      description: 'Find the nearest recycling centers for electronic waste disposal.',
      link: 'https://electronicscrap.eu/',
    },
  ];

  return (
    <div className="Information">
      <Header />
      <div className="grid-container">
        {/* Carousel Section */}
        <div className="top">
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {articles.map((article, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <Link href={article.link} target="_blank" rel="noopener noreferrer">
                    <Image src={article.img} alt={article.alt} className="d-block w-100" />
                  </Link>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Information Sections */}
        {sections.map((section) => (
          <div className={section.id} key={section.id}>
            <h4>{section.title}</h4>
            <div className="image-container">
              <Image src={section.image} alt={section.title} />
            </div>
            <p>{section.description}</p>
            <a href={section.link} target="_blank" rel="noopener noreferrer">
              <button className="learn-button">Learn More</button>
            </a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}



// 'use client'

// import React, { useEffect }  from 'react';;
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../styles/Information.css'; // Import the CSS from styles folder
// import Link from 'next/link';
// import Image from 'next/image';
// import { articleimg1, articleimg2, articleimg3, learnimg, recycleimg, tipsimg } from '../images';


// export default function Information (){

//   useEffect(() => {
//     // Only run this on the client side after hydration
//     if (typeof window !== 'undefined') {
//       require('bootstrap/dist/js/bootstrap.bundle.min.js');
//     }
//   }, []);
 
//   return (
//     <div className="Information">
//       <Header /> 
//     <div className="grid-container">
//       {/* Top Grid */}

//       <div className="top">
//          {/* Bootstrap Carousel */}
//          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
//             <div className="carousel-inner">
//               <div className="carousel-item active">
//               <Link href="https://www.bbcearth.com/sustainability" target="_blank" rel="noopener noreferrer">
//                   <Image src={articleimg1} alt="Article 1" className="d-block w-100" />
//                 </Link>
//               </div>

//               <div className="carousel-item">
//               <Link href="https://www.downtoearth.org/articles/2019-10/14826/simple-sustainable-swaps" target="_blank" rel="noopener noreferrer">
//                   <Image src={articleimg2} alt="Article 2" className="d-block w-100" />
//                 </Link>
//               </div>
              
//               <div className="carousel-item">
//               <Link href="https://www.buerklin.com/en/electronic-competence/news/study-sustainability-in-electronics/" target="_blank" rel="noopener noreferrer">
//                   <Image src={articleimg3} alt="Article 3" className="d-block w-100" />
//                 </Link>
//               </div>
//             </div>

//             <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
//               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//               <span className="visually-hidden">Previous</span>
//             </button>

//             <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
//               <span className="carousel-control-next-icon" aria-hidden="true"></span>
//               <span className="visually-hidden">Next</span>
//             </button>
//           </div>
//       </div>

//       {/* Left Grid */}
//       <div className="left">
//         <h4>Learn</h4>
//         <div className="image-container">
//           <Image src={learnimg} alt="Learn" />
//         </div>
//         <p>
//           Brief description about what you can learn. This section provides valuable insights on sustainable practices and eco-friendly upgrades.
//         </p>
//         <a href="https://www.investopedia.com/terms/s/sustainability.asp" target="_blank" rel="noopener noreferrer">
//           <button className="learn-button">Learn More</button>
//         </a>
//       </div>

//       {/* Middle Grid */}
//       <div className="main">
//         <h4>Recycling Tips</h4>
//         <div className="image-container">
//           <Image src={tipsimg} alt="Tips" />
//         </div>
//         <p>
//           Valuable insights and information on sustainable practices and eco-friendly upgrades.
//         </p>
//         <a href="https://www.keygreen.ie/news/post/your-guide-to-electronic-waste-recycling#:~:text=You%20should%20recycle%20your%20old,disposed%20of%20safely%20and%20sustainably." target="_blank" rel="noopener noreferrer">
//           <button className="learn-button">Learn More</button>
//         </a>
//       </div>

//       {/* Right Grid */}
//       <div className="right">
//         <h4>Recycling Locations</h4>
//         <div className="image-container">
//           <Image src={recycleimg} alt="Recycle" />
//         </div>
//         <p>
//           Valuable insights on sustainable practices and eco-friendly upgrades.
//         </p>
//         <a href="https://electronicscrap.eu/" target="_blank" rel="noopener noreferrer">
//           <button className="learn-button">Learn More</button>
//         </a>
//       </div>
//     </div>
    
//     <Footer />
//   </div> 
//   );
// };


