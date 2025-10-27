package com.example.cinema.customer;
import jakarta.persistence.*;

@Entity
@Table(name = "CustomerStatus")
public class CustomerStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String statusDescription;


    public Integer getId() {
        return id;
    }

    public String getStatusName() {
        return statusDescription;
    }
}