import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Streetwear",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1587",
    link: "/collection/streetwear"
  },
  {
    id: 2,
    title: "Formal Wear",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=1595",
    link: "/collection/formal"
  },
  {
    id: 3,
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1621609764095-232d14c67287?auto=format&fit=crop&q=80&w=1587",
    link: "/collection/accessories"
  }
];

const FeaturedCollection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">Featured Collections</h2>
          <div className="w-20 h-1 bg-black mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden h-[400px] cursor-pointer"
            >
              <Link to={item.link}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-widest border-2 border-white px-6 py-2 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
