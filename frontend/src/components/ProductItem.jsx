import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer block group">
      <div className="overflow-hidden rounded-sm">
        <img 
          src={image[0]} 
          alt={name} 
          className="w-full h-auto hover:scale-110 transition-transform duration-500 ease-in-out" 
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium">{name}</p>
      <p className="text-sm font-bold text-gray-900">{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
