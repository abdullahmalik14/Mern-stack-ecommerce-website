import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Filter, X } from "lucide-react";
import ProductItem from "../components/ProductItem";

const Collection = ({ category: propCategory }) => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState(propCategory ? [propCategory] : []);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    if (propCategory) {
       setCategory([propCategory]);
    } else {
       setCategory([]);
    }
  }, [propCategory]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Sort logic
    switch (sortType) {
      case "low-high":
        setFilterProducts(productsCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(productsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        setFilterProducts(productsCopy);
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t container mx-auto px-4">
      {/* Filter Options */}
      <div className="min-w-60">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 font-medium"
        >
          FILTERS
          <Filter
            className={`sm:hidden ${showFilter ? "rotate-90" : ""} transition-transform`}
            size={20}
          />
        </div>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                checked={category.includes("Topwear")}
                onChange={toggleCategory}
              />{" "}
              Topwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                checked={category.includes("Bottomwear")}
                onChange={toggleCategory}
              />{" "}
              Bottomwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value={"Footwears"}
                checked={category.includes("Footwears")}
                onChange={toggleCategory}
              />{" "}
              Footwears
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <div className="inline-flex gap-2 items-center mb-3">
            <h1 className="font-bold uppercase text-gray-900 text-2xl">All <span className="text-gray-500 font-medium">Collections</span></h1>
          </div>
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 py-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
