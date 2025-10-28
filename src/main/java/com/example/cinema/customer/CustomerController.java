package com.example.cinema.customer;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.transaction.Transactional;

import com.example.cinema.dto.RegisterRequest;
import com.example.cinema.dto.HomeAddressRequest;
import com.example.cinema.dto.LoginRequest;
import com.example.cinema.dto.PaymentMethodRequest; 

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final HomeAddressRepository homeAddressRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final BillingAddressRepository billingAddressRepository;
    private final CustomerPaymentMethodRepository customerPaymentMethodRepository;



    public CustomerController(CustomerRepository customerRepository, HomeAddressRepository homeAddressRepository, PaymentMethodRepository paymentMethodRepository,
    BillingAddressRepository billingAddressRepository, CustomerPaymentMethodRepository customerPaymentMethodRepository) {
        this.customerRepository = customerRepository;
        this.homeAddressRepository = homeAddressRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.billingAddressRepository = billingAddressRepository;
        this.customerPaymentMethodRepository = customerPaymentMethodRepository;
    }

    @PostMapping("/register")
    public Customer register(@RequestBody RegisterRequest request) {
        if (customerRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Customer customer = new Customer();
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail().toLowerCase());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setPassword(request.getPassword());
        customer.setCustomerStatusId(1);

        return customerRepository.save(customer);
    }

    @PostMapping("/login")
    public Customer login(@RequestBody LoginRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail().toLowerCase()).orElseThrow(() -> new RuntimeException("Invalid email"));

        if (request.getPassword() != customer.getPassword()) {
            throw new RuntimeException("Incorrect password");
        }
        if (customer.getCustomerStatusId() != 2) {
            throw new RuntimeException("Please verify your email before logging in");
        }

        customer.setPassword(null);
        return customer;
    }

    @GetMapping("/verify")
    public String verifyCustomer(@RequestParam("verificationCode") String verificationCode) {
        Customer customer = customerRepository.findByVerificationCode(verificationCode).orElseThrow(() -> new RuntimeException("Invalid code"));
         customer.setCustomerStatusId(2); 
         customer.setVerificationCode(null);
         customerRepository.save(customer);
         return "Email verified";
    }

    @PostMapping("/{customerId}/home-address")
    @Transactional
    public HomeAddress setHomeAddress(@PathVariable Integer customerId, @RequestBody HomeAddressRequest request) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));

        HomeAddress address = new HomeAddress();
        address.setStreet(request.streetAddress);
        address.setCity(request.city);
        address.setState(request.state);
        address.setZipCode(request.zipCode);
        HomeAddress savedHomeAddress = homeAddressRepository.save(address);

        customer.setHomeAddressId(savedHomeAddress.getId());
        customerRepository.save(customer);

        return savedHomeAddress;
    }

    @PutMapping("/{customerId}/home-address")
    @Transactional
    public HomeAddress updateHomeAddress(@PathVariable Integer customerId, @RequestBody HomeAddressRequest request) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));
        if (customer.getHomeAddressId() == null)
            throw new RuntimeException("No previously saved home address found");

        HomeAddress homeAddress = homeAddressRepository.findById(customer.getHomeAddressId()).orElseThrow(() -> new RuntimeException("Address missing"));
        homeAddress.setStreet(request.streetAddress);
        homeAddress.setCity(request.city);
        homeAddress.setState(request.state);
        homeAddress.setZipCode(request.zipCode);
        return homeAddressRepository.save(homeAddress);
    }

    @PostMapping("/{customerId}/payment-methods")
    @Transactional
    public PaymentMethod addPaymentMethod(@PathVariable Integer customerId, @RequestBody PaymentMethodRequest request) {
        BillingAddress billingAddress = new BillingAddress();
        billingAddress.setStreetAddress(request.billingAddressRequest.streetAddress);
        billingAddress.setCity(request.billingAddressRequest.city);
        billingAddress.setState(request.billingAddressRequest.state);
        billingAddress.setZipCode(request.billingAddressRequest.zipCode);
        billingAddress = billingAddressRepository.save(billingAddress);

        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setCardNumber(Integer.parseInt(request.cardNumber)); // or String if your entity uses String
        paymentMethod.setExpirationMonth(request.expirationMonth);
        paymentMethod.setExpirationYear(request.expirationYear);
        paymentMethod.setBillingAddressId(billingAddress.getId());
        paymentMethod = paymentMethodRepository.save(paymentMethod);

        CustomerPaymentMethod customerPaymentMethod = new CustomerPaymentMethod();
        customerPaymentMethod.setCustomerId(customerId);
        customerPaymentMethod.setPaymentMethodId(paymentMethod.getId());
        customerPaymentMethodRepository.save(customerPaymentMethod);
        
        return paymentMethod;
    }
    
    @GetMapping("/{customerId}/payment-methods")
    public List<PaymentMethod> getPaymentMethods(@PathVariable Integer customerId) {
        List<CustomerPaymentMethod> customerPaymentMethods = customerPaymentMethodRepository.findByCustomerId(customerId);
        return customerPaymentMethods.stream()
        .map(l -> paymentMethodRepository.findById(l.getPaymentMethodId()).orElseThrow(() -> new RuntimeException("Customer not found"))).toList();
    }
        
    @DeleteMapping("/{customerId}/payment-methods/{paymentMethodId}")
    @Transactional
    public void deletePaymentMethod(@PathVariable Integer customerId, @PathVariable Integer paymentMethodId) {
        customerPaymentMethodRepository.deleteByCustomerIdAndPaymentMethodId(customerId, paymentMethodId);
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId).orElseThrow(() -> new RuntimeException("Payment method not found"));
        Integer billingAddressId = paymentMethod.getBillingAddressId();
        paymentMethodRepository.deleteById(paymentMethodId);
        if(billingAddressId != null){
            if(!paymentMethodRepository.existsByBillingAddressId(billingAddressId)){
                billingAddressRepository.deleteById(billingAddressId);
            }
        }
    }

}
