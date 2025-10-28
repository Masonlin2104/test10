package com.example.cinema.dto;

public class PaymentMethodRequest {
    public String cardNumber;
    public int expirationMonth;
    public int expirationYear;
    public String nameOnCard;
    public BillingAddressRequest billingAddressRequest;
}
