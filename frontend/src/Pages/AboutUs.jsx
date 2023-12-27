import React from 'react'
import HomeLayout from '../Layout/HomeLayout'
import Mentor1 from '../assets/images/mentor1.jpg'
import { celebrities } from '../Constants/CelebrityData'
import CarouselSlide from '../Components/CarouselSlide'


function AboutUs() {

    
  return (
    <HomeLayout>
        <div className="pl-20 pt-20 flex flex-col text-white">
            <div className="flex items-center gap-5 mx-10">
                <section className="w-1/2 space-y-10">
                    <h1 className="text-5xl text-yellow-500 font-semibold">
                        Affordable and quality education
                    </h1>
                    <p className="text-xl text-gray-200">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Consequatur, culpa amet enim explicabo temporibus quo 
                        voluptatem beatae dolore veritatis necessitatibus totam 
                        aperiam quos soluta sapiente quibusdam praesentium. Ab, repudiandae quo.
                    </p>
                </section>

                <div className="w-1/2">
                    <img 
                    className="drop-shadow-2xl"
                    src={Mentor1} 
                    />
                </div>
            </div>
            <div className="carousel w-1/2 m-auto my-16">
               {celebrities && celebrities.map(celebrity => (<CarouselSlide 
                                                                    {...celebrity} 
                                                                    key={celebrity.slideNumber} 
                                                                    totalSlides={celebrities.length}
                                                                    />))}
               
            </div>
                
        </div>
        
    </HomeLayout>
  )
}

export default AboutUs;
