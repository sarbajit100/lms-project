import React, { useState } from 'react'
import HomeLayout from '../Layout/HomeLayout'
import { BsPersonCircle } from "react-icons/bs";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast';

function Signup() {

    const dispatch = useDispatch();
    const navigale = useNavigate();
    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setsignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handelUserInput(e) {
       const {name, value} = e.target;
       setsignupData({
        ...signupData,
        [name]: value
       })
    }

    function getImage(event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setsignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            })
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("please fill all the details");
            return;
        }

        if(signupData.fullName.length < 5) {
            toast.error("Name should be atleast 5 characters")
            return;
        }
        if(!signupData.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error("email is invalid")
            return;
        }
        if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
            toast.error("Password should be  one number and special charecter and 6-16 characters")
            return;
        }
        const formData = new FormData();
        formData.uppend("fullName", signupData.fullName);
        formData.uppend("email", signupData.email);
        formData.uppend("password", signupData.password);
        formData.uppend("avatar", signupData.avatar);

        // dispatch create account action
        const response = await dispatch(createAccount(formData));
        if(response?.payload?.success)
        Navigate("/");

        setsignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("")
        
    }

  return (
    <HomeLayout>
        <div className="flex justify-center items-center h-[100vh]">
            <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-lg">
                <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                <label htmlFor="image_uploads" className="cursor-pointer">
                    {previewImage ? (
                        <img src={previewImage} alt="" className="w-24 h-24 rounded-full m-auto"/>
                    ) : (
                        <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                    )}
                </label>
                <input
                onChange={getImage}
                className="hidden"
                type="file"
                name="image_uploads"
                id="image_uploads"
                accept=".jpg, .jpeg, .png, .svg"
                />
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="fullName" className="font-semibold">FullName</label>
                    <input 
                    type="text"
                    required
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your fullName"
                    className="bg-transparent px-2 py-1 border"
                    onChange={handelUserInput}
                    value={signupData.fullName}
                    />
                </div>
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input 
                    type="email"
                    required
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="bg-transparent px-2 py-1 border"
                    onChange={handelUserInput}
                    value={signupData.email}
                    />
                </div>
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="password" className="font-semibold">Password</label>
                    <input 
                    type="password"
                    required
                    name="password"
                    id="password"
                    placeholder="Enter your password..."
                    className="bg-transparent px-2 py-1 border"
                    onChange={handelUserInput}
                    value={signupData.password}
                    />
                </div>
                <button className=" mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-sm py-1">
                    Create account
                </button>
                <p className="text-center">
                    Already have an account? <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
                </p>
            </form>
        </div>
    </HomeLayout>
  );
}

export default Signup
