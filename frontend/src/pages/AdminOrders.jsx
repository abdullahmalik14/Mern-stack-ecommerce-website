import { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders. Are you an admin?");
      if (error.response?.status === 401) {
         navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
       fetchOrders();
    } else {
       setLoading(false);
       navigate("/login");
    }
  }, [token]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success("Order status updated!");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order Fulfillment</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded shadow border">No orders found.</div>
        ) : (
          <div className="bg-white rounded shadow-sm border overflow-hidden text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 font-semibold text-gray-700">Order ID</th>
                  <th className="p-4 font-semibold text-gray-700">Customer</th>
                  <th className="p-4 font-semibold text-gray-700">Total Price</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-mono text-xs text-gray-500">{order._id}</td>
                    <td className="p-4 text-gray-800">
                      <p className="font-medium">{order.user?.name || "Guest"}</p>
                      <p className="text-xs text-gray-500">{order.customerEmail}</p>
                    </td>
                    <td className="p-4 font-medium">${order.totalPrice.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "Delivered" ? "bg-green-100 text-green-800" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status || "Processing"}
                      </span>
                    </td>
                    <td className="p-4">
                      <select 
                        value={order.status || "Processing"}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 outline-none focus:border-black"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
