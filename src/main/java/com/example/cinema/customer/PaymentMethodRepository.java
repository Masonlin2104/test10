package com.example.cinema.customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {
    boolean existsByBillingAddressId(Integer billingAddressId);
}
