import React from 'react'
import { Link } from "react-router-dom";
import HomeLayout from '../Layout/HomeLayout';
import HomePageImage from "../assets/images/homepage.jpg"
function HomePage() {
  return (
    <HomeLayout>
        <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
            <div className="w-1/2 space-y-6">
                <h1 className="text-5xl font-semibold">
                    Find out best
                    <span className="text-yellow-500 font-bold ">
                        Online Courses
                    </span>
                </h1>
                <p className="text-xl text-gray-200">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo qui quo, a autem esse corrupti, voluptas commodi repelle

                </p>

                <div className="space-x-6">
                <Link to="/courses">
                    <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-5xl cursor-pointer hover:bg-yellow-600 transition-all">
                        Explore courses
                    </button>
                </Link>
                <Link to="/contact">
                    <button className="border border-solid-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all">
                        Contact Us
                    </button>
                </Link>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <img src={HomePageImage} alt=""/>
            </div>
        </div>
    </HomeLayout>
   
  );
}

export default HomePage
