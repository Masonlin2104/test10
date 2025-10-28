package com.example.cinema.customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerPaymentMethodRepository extends JpaRepository<CustomerPaymentMethod, Integer> {
    List<CustomerPaymentMethod> findByCustomerId(Integer customerId);
    void deleteByCustomerIdAndPaymentMethodId(Integer customerId, Integer paymentMethodId);
}
   

