import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <div className="inline-flex gap-2 items-center mb-3">
            <h1 className="font-bold uppercase text-gray-900 text-2xl">Cart <span className="text-gray-500 font-medium">Totals</span></h1>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {getCartAmount() === 0 ? 0 : 10}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + 10}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
