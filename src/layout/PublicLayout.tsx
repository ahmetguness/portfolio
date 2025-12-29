import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from '../components/Navbar';
import Footer from "../components/Footer";
import MoveToTop from "../components/MoveToTop";
import Lottie from  "lottie-react";
import nightsky from "../assets/lottie/night-sky.json";
import HashLoader from "react-spinners/HashLoader";

const PublicLayout = () => {
  const[Loading,SetLoading]=useState<boolean>(true);

  useEffect(()=>{
    SetLoading(true)

    setTimeout(()=>{
    SetLoading(false)}
    ,1900)
  },[])  
  
  return (
    <>
      {Loading ? (
      <div className="loader"> 
        <HashLoader
          color={'#9067C6'}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      ):(
      <div>
      
      <Lottie className="bg" animationData={nightsky} loop={true} />  
      <Lottie className="bgtwo" animationData={nightsky} loop={true} />   
      <Lottie className="bgtemp" animationData={nightsky} loop={true} /> 

      <Nav/>
      <MoveToTop/>

      <Outlet />
      
      <Footer/>
      </div>
      )}  
    </>
  );
}

export default PublicLayout;
