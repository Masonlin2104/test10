package com.example.cinema.customer;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.transaction.Transactional;

import com.example.cinema.dto.RegisterRequest;
import com.example.cinema.dto.HomeAddressRequest;
import com.example.cinema.dto.LoginRequest;
import com.example.cinema.dto.PaymentMethodRequest;
import com.example.cinema.dto.UpdateCustomerRequest;
import com.example.cinema.dto.PasswordChangeRequest;
import com.example.cinema.dto.PromotionPreferenceRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final HomeAddressRepository homeAddressRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final BillingAddressRepository billingAddressRepository;
    private final CustomerPaymentMethodRepository customerPaymentMethodRepository;

    public CustomerController(
        CustomerRepository customerRepository, 
        HomeAddressRepository homeAddressRepository, 
        PaymentMethodRepository paymentMethodRepository,
        BillingAddressRepository billingAddressRepository, 
        CustomerPaymentMethodRepository customerPaymentMethodRepository
    ) {
        this.customerRepository = customerRepository;
        this.homeAddressRepository = homeAddressRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.billingAddressRepository = billingAddressRepository;
        this.customerPaymentMethodRepository = customerPaymentMethodRepository;
    }

    // ========== GET CUSTOMER INFO ==========
    @GetMapping("/{customerId}")
    public Customer getCustomer(@PathVariable Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setPassword(null); // Don't send password to frontend
        return customer;
    }

    // ========== UPDATE CUSTOMER BASIC INFO ==========
    @PutMapping("/{customerId}")
    @Transactional
    public Customer updateCustomer(@PathVariable Integer customerId, @RequestBody UpdateCustomerRequest request) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (request.firstName != null) {
            customer.setFirstName(request.firstName);
        }
        if (request.lastName != null) {
            customer.setLastName(request.lastName);
        }
        if (request.phoneNumber != null) {
            customer.setPhoneNumber(request.phoneNumber);
        }
        
        Customer updated = customerRepository.save(customer);
        updated.setPassword(null);
        return updated;
    }

    // ========== CHANGE PASSWORD ==========
    @PutMapping("/{customerId}/password")
    @Transactional
    public String changePassword(@PathVariable Integer customerId, @RequestBody PasswordChangeRequest request) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        // Verify current password
        if (!customer.getPassword().equals(request.currentPassword)) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        // Update to new password
        customer.setPassword(request.newPassword);
        customerRepository.save(customer);
        
        return "Password changed successfully";
    }

    // ========== GET HOME ADDRESS ==========
    @GetMapping("/{customerId}/home-address")
    public HomeAddress getHomeAddress(@PathVariable Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (customer.getHomeAddressId() == null) {
            throw new RuntimeException("No home address found");
        }
        
        return homeAddressRepository.findById(customer.getHomeAddressId())
            .orElseThrow(() -> new RuntimeException("Home address not found"));
    }

    // ========== SET HOME ADDRESS ==========
    @PostMapping("/{customerId}/home-address")
    @Transactional
    public HomeAddress setHomeAddress(@PathVariable Integer customerId, @RequestBody HomeAddressRequest request) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

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

    // ========== UPDATE HOME ADDRESS ==========
    @PutMapping("/{customerId}/home-address")
    @Transactional
    public HomeAddress updateHomeAddress(@PathVariable Integer customerId, @RequestBody HomeAddressRequest request) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (customer.getHomeAddressId() == null) {
            throw new RuntimeException("No previously saved home address found");
        }

        HomeAddress homeAddress = homeAddressRepository.findById(customer.getHomeAddressId())
            .orElseThrow(() -> new RuntimeException("Address missing"));
        
        homeAddress.setStreet(request.streetAddress);
        homeAddress.setCity(request.city);
        homeAddress.setState(request.state);
        homeAddress.setZipCode(request.zipCode);
        
        return homeAddressRepository.save(homeAddress);
    }

    // ========== ADD PAYMENT METHOD ==========
    @PostMapping("/{customerId}/payment-methods")
    @Transactional
    public PaymentMethod addPaymentMethod(@PathVariable Integer customerId, @RequestBody PaymentMethodRequest request) {
        // Verify customer exists
        customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Save billing address
        BillingAddress billingAddress = new BillingAddress();
        billingAddress.setStreetAddress(request.billingAddressRequest.streetAddress);
        billingAddress.setCity(request.billingAddressRequest.city);
        billingAddress.setState(request.billingAddressRequest.state);
        billingAddress.setZipCode(request.billingAddressRequest.zipCode);
        billingAddress = billingAddressRepository.save(billingAddress);

        // Save payment method
        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setCardNumber(Integer.parseInt(request.cardNumber));
        paymentMethod.setExpirationMonth(request.expirationMonth);
        paymentMethod.setExpirationYear(request.expirationYear);
        paymentMethod.setNameOnCard(request.nameOnCard);
        paymentMethod.setBillingAddressId(billingAddress.getId());
        paymentMethod = paymentMethodRepository.save(paymentMethod);

        // Link to customer
        CustomerPaymentMethod customerPaymentMethod = new CustomerPaymentMethod();
        customerPaymentMethod.setCustomerId(customerId);
        customerPaymentMethod.setPaymentMethodId(paymentMethod.getId());
        customerPaymentMethodRepository.save(customerPaymentMethod);
        
        return paymentMethod;
    }
    
    // ========== GET PAYMENT METHODS ==========
    @GetMapping("/{customerId}/payment-methods")
    public List<PaymentMethod> getPaymentMethods(@PathVariable Integer customerId) {
        List<CustomerPaymentMethod> customerPaymentMethods = customerPaymentMethodRepository.findByCustomerId(customerId);
        return customerPaymentMethods.stream()
            .map(l -> paymentMethodRepository.findById(l.getPaymentMethodId())
                .orElseThrow(() -> new RuntimeException("Payment method not found")))
            .toList();
    }
        
    // ========== DELETE PAYMENT METHOD ==========
    @DeleteMapping("/{customerId}/payment-methods/{paymentMethodId}")
    @Transactional
    public String deletePaymentMethod(@PathVariable Integer customerId, @PathVariable Integer paymentMethodId) {
        // Remove link
        customerPaymentMethodRepository.deleteByCustomerIdAndPaymentMethodId(customerId, paymentMethodId);
        
        // Get payment method
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
            .orElseThrow(() -> new RuntimeException("Payment method not found"));
        
        Integer billingAddressId = paymentMethod.getBillingAddressId();
        
        // Delete payment method
        paymentMethodRepository.deleteById(paymentMethodId);
        
        // Delete billing address if not used by other cards
        if (billingAddressId != null) {
            if (!paymentMethodRepository.existsByBillingAddressId(billingAddressId)) {
                billingAddressRepository.deleteById(billingAddressId);
            }
        }
        
        return "Payment method deleted successfully";
    }

    // ========== UPDATE PROMOTION PREFERENCE ==========
    @PutMapping("/{customerId}/promotions")
    @Transactional
    public String updatePromotionPreference(@PathVariable Integer customerId, @RequestBody PromotionPreferenceRequest request) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        // Assuming customerStatusId: 1 = no promo, 2 = with promo
        // Adjust based on your actual CustomerStatus table
        if (request.enabled) {
            customer.setCustomerStatusId(2); // Opted in
        } else {
            customer.setCustomerStatusId(1); // Not opted in
        }
        
        customerRepository.save(customer);
        return "Promotion preference updated";
    }

    // ========== REGISTRATION ==========
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

    // ========== LOGIN ==========
    @PostMapping("/login")
    public Customer login(@RequestBody LoginRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail().toLowerCase())
            .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!request.getPassword().equals(customer.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }
        if (customer.getCustomerStatusId() != 2) {
            throw new RuntimeException("Please verify your email before logging in");
        }

        customer.setPassword(null);
        return customer;
    }

    // ========== EMAIL VERIFICATION ==========
    @GetMapping("/verify")
    public String verifyCustomer(@RequestParam("verificationCode") String verificationCode) {
        Customer customer = customerRepository.findByVerificationCode(verificationCode)
            .orElseThrow(() -> new RuntimeException("Invalid code"));
        
        customer.setCustomerStatusId(2); 
        customer.setVerificationCode(null);
        customerRepository.save(customer);
        
        return "Email verified";
    }
}