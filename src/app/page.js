import Navbar from "./Components/Navbar";
import Body from "./Components/Body";


import Footer from "./Components/Footer";



export default function Home() {
  return (
    <>
    <main className="relative flex flex-col min-h-screen bg-[#121212]">
        <Navbar className="absolute top-0 z-10 w-screen" />
  
        
         <div className="bg-[#f5ede5]">
          <Body />
      
          
          <Footer />

         </div>

    </main>

    </>
  );
}