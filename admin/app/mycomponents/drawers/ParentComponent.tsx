'use client';
import React, { useEffect, useState } from 'react';
import { getAllOrdersForUser } from '@/app/api/actions'; // Adjust the import path as needed
import { ActionTable, Order } from '../tables/orderDetailsTable'; // Adjust the import path as needed

const ParentComponent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token') ?? '';
        const ordersData = await getAllOrdersForUser(token);
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order === updatedOrder.order ? updatedOrder : order
      )
    );
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ActionTable data={orders} onUpdateOrder={handleUpdateOrder} />
      )}
    </div>
  );
};

export default ParentComponent;
