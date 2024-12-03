import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import cartItem from "../Components/cartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const [couponCode, setcouponCode] = useState<string>("");
  const [isValidCouponCode, setisValidCouponCode] = useState<boolean>(false);

  const cartItems = [

    {
      productId:"faskhdsk",
      photo:"https://f.media-amazon.com/images/I/71jG+e7roXL._SX522_.jpg",
      name:"Macbook",
      price:600000,
      quantity:4,
      stock:10
    }


  ];
  const Subtotal = 4000;
  const tax = Math.round(Subtotal * 0.18);
  const shippingCharges = 200;
  const discount = 400;

  useEffect(()=>{
    const timeOutID = setTimeout(() => {
      if (Math.random()>0) setisValidCouponCode(true);
      else setisValidCouponCode(false);
    }, 1000);

    return ()=>{
      clearTimeout(timeOutID);
      setisValidCouponCode(false);
    }
  },[couponCode])

  const total = Subtotal + tax + shippingCharges;
  return (
    <div className="cart">
      <main>

      {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            // <CartItemCard
            //   incrementHandler={incrementHandler}
            //   decrementHandler={decrementHandler}
            //   removeHandler={removeHandler}
            //   key={idx}
            //   cartItem={i}
            // />
            <cartItem/>
          ))
        ) : (
          <h1>No Items Added</h1>
        )}

      </main>
      <aside>
        <p>Subtotal :${Subtotal}</p>
        <p>Shipping Charges: ${shippingCharges}</p>
        <p>Tax: ${tax}</p>
        <p>
          Discount: <em className="red"> - ${discount}</em>
        </p>
        <p>
          <b>Total" ${total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setcouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

  {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
