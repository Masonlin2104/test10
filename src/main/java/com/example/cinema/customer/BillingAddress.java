package com.example.cinema.customer;

import jakarta.persistence.*;

@Entity
@Table(name = "BillingAddress")
public class BillingAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "StreetAddress", nullable = false, length = 250)
    private String streetAddress;

    @Column(name = "City", nullable = false, length = 100)
    private String city;

    @Column(name = "State", nullable = false, length = 100)
    private String state;

    @Column(name = "ZipCode", nullable = false)
    private int zipCode;

    public Integer getId() {
        return id;
    }
    
    public String getStreet() {
        return streetAddress;
    }
    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }
}
