import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import CategorySection from "./components/Categories/CategorySection";
import Featured from "./components/Featured/Featured";
import Trending from "./components/Trending/Trending";
import Testimonials from "./components/Testimonials/Testimonials";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategorySection />
      <Featured />
      <Trending />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;