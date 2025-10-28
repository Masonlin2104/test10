package com.example.cinema.customer;

import jakarta.persistence.*;

@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "FirstName", nullable = false, length = 255)
    private String firstName;

    @Column(name = "LastName", nullable = false, length = 255)
    private String lastName;

    @Column(name = "Email", nullable = false, length = 255, unique = true)
    private String email;

    @Column(name = "PhoneNumber")
    private Integer phoneNumber;

    @Column(name = "Password", nullable = false, length = 255)
    private String password;

    @Column(name = "HomeAddressId")
    private Integer homeAddressId;

    @Column(name = "CustomerStatusId", nullable = false)
    private Integer customerStatusId;

    @Column(name = "VerficationCode")
    private String verficationCode;


    public Integer getId() {
        return id;
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
    public String getVerficationCode() {
        return verficationCode;
    }
    public void setVerificationCode(String verificationCode){
        this.verficationCode = verificationCode;
    }

}


