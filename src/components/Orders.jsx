import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/orders/${user.email}`;
      console.log("API:", url);

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      console.log("Orders:", response.data);
      setOrders(response.data);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order Id: {order.orderDate}</h3>

            <ol>
              {order.items?.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price} - {item.quantity} -{" "}
                  {item.price * item.quantity}
                </li>
              ))}
            </ol>

            <h3>Order Value: {order.orderValue}</h3>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;