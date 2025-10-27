package com.example.cinema.customer;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.transaction.Transactional;

import com.example.cinema.dto.RegisterRequest;
import com.example.cinema.dto.HomeAddressRequest;
import com.example.cinema.dto.LoginRequest; 

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final HomeAddressRepository homeAddressRepository;


    public CustomerController(CustomerRepository customerRepository, HomeAddressRepository homeAddressRepository) {
        this.customerRepository = customerRepository;
        this.homeAddressRepository = homeAddressRepository;
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
        Customer customer = customerRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

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
public String verifyCustomer(@RequestParam("token") String token) {
    Customer customer = customerRepository.findByVerificationToken(token)
        .orElseThrow(() -> new RuntimeException("Invalid token"));

    customer.setCustomerStatusId(2); 
    customer.setVerificationToken(null);
    customerRepository.save(customer);

    return "Email verified successfully!";
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

        HomeAddress address = homeAddressRepository.findById(customer.getHomeAddressId())
                .orElseThrow(() -> new RuntimeException("Address missing"));
        address.setStreet(request.streetAddress);
        address.setCity(request.city);
        address.setState(request.state);
        address.setZipCode(request.zipCode);
        return homeAddressRepository.save(address);
    }

}
