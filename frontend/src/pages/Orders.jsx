import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import api from "../utils/api";

const Orders = () => {
  const { currency, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.log("No token found in Orders page");
        return null;
      }

      const response = await api.get("/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Orders Response:", response.data);
      // Flatten orders to show individual items if needed, or show orders.
      // API returns orders with orderItems array.
      // Let's display products directly for better UI
      let allOrdersItem = [];
       response.data.map((order) => {
        order.orderItems.map((item) => {
          item["status"] = "Processing"; // API doesn't return status per item usually, but per order.
          item["payment"] = order.paymentMethod;
          item["paymentMethod"] = order.paymentMethod;
          item["date"] = new Date(order.createdAt).toDateString();
          allOrdersItem.push(item);
        });
      });
      setOrderData(allOrdersItem.reverse());
      
    } catch (error) {
       console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (!token) {
      return (
          <div className="border-t pt-16 container mx-auto px-4 min-h-[80vh] flex items-center justify-center">
              <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Please Login</h2>
                  <p className="text-gray-500 mb-4">You need to be logged in to view your orders.</p>
              </div>
          </div>
      )
  }

  return (
    <div className="border-t pt-16 container mx-auto px-4 min-h-[80vh]">
      <div className="text-2xl">
        <div className="inline-flex gap-2 items-center mb-3">
            <h1 className="font-bold uppercase text-gray-900 text-2xl">My <span className="text-gray-500 font-medium">Orders</span></h1>
        </div>
      </div>

      <div>
        {orderData?.length === 0 ? (
           <p className="text-gray-500 mt-4">No orders found.</p>
        ) : (
            orderData?.map((item, index) => (
            <div
                key={index}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image} alt="" />
                <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                        {currency}
                        {item.price}
                    </p>
                    <p>Quantity: {item.qty}</p>
                    <p>Size: {item.size}</p>
                    </div>
                    <p className="mt-1">
                    Date: <span className="text-gray-400">{item.date}</span>
                    </p>
                    <p className="mt-1">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                    </p>
                </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">
                    Track Order
                </button>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Orders;
