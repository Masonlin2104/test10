package com.example.cinema.customer;

import jakarta.persistence.*;

@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;
    private String lastName;
    private String email;
    private Integer phoneNumber;
    private String password;
    private Integer homeAddressId;
    private Integer customerStatusId;


    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Integer getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getHomeAddressId() {
        return homeAddressId;
    }
    public void setHomeAddressId(Integer homeAddressId) {
        this.homeAddressId = homeAddressId;
    }
    public Integer getCustomerStatusId() {
        return customerStatusId;
    }
    public void setCustomerStatusId(Integer customerStatusId) {
        this.customerStatusId = customerStatusId;   
    }

}


