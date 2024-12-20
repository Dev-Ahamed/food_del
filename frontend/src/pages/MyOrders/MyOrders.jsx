import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { serverURL, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      `${serverURL}/api/order/myorders`,
      {},
      { headers: { token } }
    );

    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((orderItem, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {orderItem.items.map((item, index) => {
                  if (index === orderItem.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${orderItem.amount}.00</p>
              <p>Items: {orderItem.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{orderItem.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
