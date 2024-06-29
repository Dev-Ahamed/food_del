import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { Form, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, serverURL } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const paymentGateway = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(`${serverURL}/api/order/place`, orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      console.log(response.data);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={paymentGateway} method="post" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
        <input
          type="text"
          name="street"
          value={data.street}
          onChange={handleChange}
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            value={data.zipcode}
            onChange={handleChange}
            placeholder="Zip Code"
            required
          />
          <input
            type="text"
            name="country"
            value={data.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="carttotal-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="carttotal-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="carttotal-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
