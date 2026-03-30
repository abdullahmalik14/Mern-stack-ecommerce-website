import { Link } from "react-router-dom";
import { PackageSearch, ShoppingCart } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-[80vh] bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Products Card */}
          <Link to="/admin/products" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <PackageSearch size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Manage Products</h2>
            </div>
            <p className="text-gray-600">Add, edit, or remove products from the catalog. Assign categories like Topwear, Bottomwear, and Footwears.</p>
          </Link>

          {/* Orders Card */}
          <Link to="/admin/orders" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                <ShoppingCart size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Fulfill Orders</h2>
            </div>
            <p className="text-gray-600">View customer orders, update shipping statuses (Processing, Shipped, Delivered), and manage fulfillments.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
