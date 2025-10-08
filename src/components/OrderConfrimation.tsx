// src/components/OrderConfirmation.tsx
/* OrderConfirmation
        orderNumber="ABC123"
        movieTitle="Spider-Man: No Way Home"
        tickets={2}
        totalPrice={25.00} */

        import React, { useState } from "react";
        import styles from "./OrderConfirmation.module.css";
        
        interface Ticket {
          id: number;
          seat: string;
          price: number;
        }
        
        interface OrderConfirmationProps {
          orderNumber: string;
          movieTitle: string;
          tickets: Ticket[];
        }
        
        const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
          orderNumber,
          movieTitle,
          tickets: initialTickets,
        }) => {
          const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
        
          const removeTicket = (id: number) => {
            setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
          };
        
          const totalPrice = tickets.reduce((sum, t) => sum + t.price, 0);
        
          const handleCheckout = () => {
            alert("Proceeding to checkout!");
            // You can navigate to a Checkout page here
          };
        
          return (
            <div className={styles.container}>
              <h1 className={styles.heading}>Order Summary</h1>
              <p><strong>Order Number:</strong> {orderNumber}</p>
              <p><strong>Movie:</strong> {movieTitle}</p>
        
              <h2>Tickets</h2>
              {tickets.length === 0 ? (
                <p>No tickets in your order.</p>
              ) : (
                <div className={styles.ticketListStyled}>
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className={styles.ticketItemStyled}>
                      <span className={styles.seatInfo}>Seat: {ticket.seat}</span>
                      <span className={styles.priceInfo}>Price: ${ticket.price.toFixed(2)}</span>
                      <button
                        className={styles.deleteButton}
                        onClick={() => removeTicket(ticket.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
        
              <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
              <button className={styles.confirmButton} onClick={handleCheckout}>
                Confirm & Continue to Checkout
              </button>
            </div>
          );
        };
        
        export default OrderConfirmation;