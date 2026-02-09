import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('userInfo')
    setToken('')
    setCartItems({})
  }

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter uppercase text-slate-900">
            Mens<span className="text-gray-500">Fashion</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-black transition-colors text-sm font-medium uppercase tracking-wide">Home</Link>
            <Link to="/collection" className="text-gray-600 hover:text-black transition-colors text-sm font-medium uppercase tracking-wide">Collection</Link>
            <Link to="/men" className="text-gray-600 hover:text-black transition-colors text-sm font-medium uppercase tracking-wide">Men</Link>
            <Link to="/about" className="text-gray-600 hover:text-black transition-colors text-sm font-medium uppercase tracking-wide">About</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-black"><Search size={20} /></button>
            <div className="group relative">
               <Link to="/login" className="text-gray-600 hover:text-black"><User size={20} /></Link>
               <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                      <p className="cursor-pointer hover:text-black">My Profile</p>
                      <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                      <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                  </div>
               </div>
            </div>
            <Link to="/cart" className="text-gray-600 hover:text-black relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-black">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" className="block py-3 text-base font-medium text-gray-900 border-b border-gray-50" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/collection" className="block py-3 text-base font-medium text-gray-600 border-b border-gray-50" onClick={() => setIsOpen(false)}>Collection</Link>
            <Link to="/men" className="block py-3 text-base font-medium text-gray-600 border-b border-gray-50" onClick={() => setIsOpen(false)}>Men</Link>
            <Link to="/about" className="block py-3 text-base font-medium text-gray-600 border-b border-gray-50" onClick={() => setIsOpen(false)}>About</Link>
            <div className="pt-4 flex space-x-6">
              <Link to="/login" className="text-gray-600" onClick={() => setIsOpen(false)}><User size={20} /></Link>
              <Link to="/cart" className="text-gray-600 relative" onClick={() => setIsOpen(false)}>
                <ShoppingBag size={20} />
                 <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
