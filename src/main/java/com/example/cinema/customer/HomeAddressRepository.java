import com.example.cinema.customer.HomeAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeAddressRepository extends JpaRepository<HomeAddress, Integer> {}

// package com.example.cinema.repository;
//import com.example.cinema.entity.PaymentMethod;
/////import org.springframework.data.jpa.repository.JpaRepository;

//public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {}