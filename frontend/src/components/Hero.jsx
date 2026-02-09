import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-[90vh] bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop" 
          alt="Men's Fashion" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gray-300 font-medium tracking-widest uppercase text-sm mb-4 block">New Collection 2026</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Everyday Style</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              Discover the latest trends in men's fashion. From casual street style to sharp formal wear, find pieces that define you.
            </p>
            <div className="flex space-x-4">
              <Link to="/collection" className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 hover:bg-gray-100 flex items-center">
                Shop Now
              </Link>
              <Link to="/about" className="border border-white/30 text-white px-8 py-4 rounded-full font-medium backdrop-blur-sm transition-colors hover:bg-white/10">
                Explore Lookbook
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
