// src/components/OrderConfirmation.tsx
/* OrderConfirmation
        orderNumber="ABC123"
        movieTitle="Spider-Man: No Way Home"
        tickets={2}
        totalPrice={25.00} */

import React from "react";
import styles from "./OrderConfirmation.module.css";

interface OrderConfirmationProps {
  orderNumber: string;
  movieTitle: string;
  tickets: number;
  totalPrice: number;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  movieTitle,
  tickets,
  totalPrice,
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Order Confirmation</h1>
      <div className={styles.details}>
        <p><strong>Order Number:</strong> {orderNumber}</p>
        <p><strong>Movie:</strong> {movieTitle}</p>
        <p><strong>Tickets:</strong> {tickets}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
      </div>
      <p className={styles.thankYou}>Thank you for your purchase!</p>
    </div>
  );
};

export default OrderConfirmation;
