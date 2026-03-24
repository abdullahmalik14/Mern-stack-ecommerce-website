import Hero from "../components/Hero";
import FeaturedCollection from "../components/FeaturedCollection";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCollection />
      
      <WhyChooseUs />

      <Newsletter />
    </div>
  );
};

export default Home;
