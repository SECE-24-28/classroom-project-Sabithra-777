import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Tracks from "./components/Tracks/Tracks";
import Features from "./components/Features/Features";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tracks />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
