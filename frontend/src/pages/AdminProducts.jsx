import { useState, useContext } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { X, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const { products, getProductsData, token } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "Footwears"
  });

  if (!token) {
    navigate("/login");
    return null;
  }

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      getProductsData(); // refresh context products
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting product");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", {
        ...formData,
        price: Number(formData.price)
      });
      toast.success("Product added successfully");
      setShowAddModal(false);
      setFormData({ name: "", price: "", description: "", image: "", category: "Footwears" });
      getProductsData(); // refresh
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition-colors"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white border rounded shadow-sm overflow-hidden flex flex-col group">
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <button 
                  onClick={() => handleDelete(p._id)}
                  className="absolute top-2 right-2 bg-red-500/90 text-white p-1.5 rounded hover:bg-red-600 transition-colors hidden group-hover:block"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-3 pb-4">
                <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                <h3 className="font-semibold text-gray-800 truncate">{p.name}</h3>
                <p className="text-black font-medium mt-1">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border px-3 py-2 rounded focus:border-black outline-none" />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border px-3 py-2 rounded focus:border-black outline-none" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border px-3 py-2 rounded focus:border-black outline-none">
                    <option value="Footwears">Footwears</option>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border px-3 py-2 rounded focus:border-black outline-none" placeholder="https://images.unsplash.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border px-3 py-2 rounded focus:border-black outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors mt-2">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
