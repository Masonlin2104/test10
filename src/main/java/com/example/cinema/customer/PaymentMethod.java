package com.example.cinema.customer;
import jakarta.persistence.*;

@Entity
@Table(name = "PaymentMethod")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "CardNumber", nullable = false)
    private Integer cardNumber;

    @Column(name = "ExpirationMonth", nullable = false)
    private Integer expirationMonth;

    @Column(name = "ExpirationYear", nullable = false)
    private Integer expirationYear;

    @Column(name = "BillingAddressId", nullable = false)
    private Integer billingAddressId;

    @Column(name = "NameOnCard")
    private String nameOnCard;

    public Integer getId() {
        return id;
    }
    public Integer getCardNumber() {
        return cardNumber;
    }
    public void setCardNumber(Integer cardNumber) {
        this.cardNumber = cardNumber;
    }
    public Integer getExpirationMonth() {
        return expirationMonth;
    }
    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }
    public Integer getExpirationYear() {
        return expirationYear;
    }
    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }
    public Integer getBillingAddressId() {
        return billingAddressId;
    }
    public void setBillingAddressId(Integer billingAddressId) {
        this.billingAddressId = billingAddressId;
    }
    public String getNameOnCard() {
        return nameOnCard;
    }
    public void setNameOnCard(String nameOnCard) {
        this.nameOnCard = nameOnCard;
    }


}

