import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tighter uppercase">Mens<span className="text-gray-500">Fashion</span></h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Elevating men's style with timeless pieces and contemporary designs. Quality craftsmanship for the modern gentleman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium uppercase tracking-wide mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/collection" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/men" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/men" className="hover:text-white transition-colors">Men's Clothing</Link></li>
              <li><Link to="/sale" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-medium uppercase tracking-wide mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium uppercase tracking-wide mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-500 mt-0.5" />
                <span>123 Fashion Ave, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-500" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-500" />
                <span>support@mensfashion.com</span>
              </li>
              <li className="flex space-x-4 pt-2">
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MensFashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
