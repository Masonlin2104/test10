package com.example.cinema.customer;

import org.springframework.web.bind.annotation.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.UUID;
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
    
    @Autowired
    private JavaMailSender mailSender;

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

    // ========== REGISTRATION WITH EMAIL VERIFICATION ==========
    @PostMapping("/register")
    @Transactional
    public String register(@RequestBody RegisterRequest request) {
        // Validation
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        if (request.getFirstName() == null || request.getFirstName().trim().isEmpty()) {
            throw new RuntimeException("First name is required");
        }
        if (request.getLastName() == null || request.getLastName().trim().isEmpty()) {
            throw new RuntimeException("Last name is required");
        }
        
        // Check if email already exists
        if (customerRepository.findByEmail(request.getEmail().toLowerCase()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Generate verification code
        String verificationCode = UUID.randomUUID().toString();

        // Create customer
        Customer customer = new Customer();
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail().toLowerCase());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setPassword(request.getPassword()); // In production, hash this!
        customer.setVerificationCode(verificationCode);
        
        // Set status: 1 = Inactive (pending verification), 2 = Active
        customer.setCustomerStatusId(1);

        customerRepository.save(customer);

        // Send verification email
        try {
            sendVerificationEmail(customer.getEmail(), verificationCode);
        } catch (Exception e) {
            // Log error but don't fail registration
            System.err.println("Failed to send verification email: " + e.getMessage());
        }

        return "Registration successful! Please check your email to verify your account.";
    }

    // ========== EMAIL VERIFICATION ==========
    @GetMapping("/verify")
    @Transactional
    public String verifyCustomer(@RequestParam("code") String verificationCode) {
        Customer customer = customerRepository.findByVerificationCode(verificationCode)
            .orElseThrow(() -> new RuntimeException("Invalid verification code"));
        
        // Activate customer account
        customer.setCustomerStatusId(2); // 2 = Active
        customer.setVerificationCode(null); // Clear code after verification
        customerRepository.save(customer);
        
        return "Email verified successfully! You can now login.";
    }

    // Helper method to send verification email
    private void sendVerificationEmail(String email, String verificationCode) {
        String verificationUrl = "http://localhost:3000/verify?code=" + verificationCode;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Cinema E-Booking - Email Verification");
        message.setText(
            "Thank you for registering with Cinema E-Booking!\n\n" +
            "Please verify your email address by clicking the link below:\n" +
            verificationUrl + "\n\n" +
            "If you did not create this account, please ignore this email.\n\n" +
            "Best regards,\n" +
            "Cinema E-Booking Team"
        );
        message.setFrom("noreply@cinemabooking.com");
        
        mailSender.send(message);
    }

    // ========== GET CUSTOMER INFO ==========
    @GetMapping("/{customerId}")
    public Customer getCustomer(@PathVariable Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setPassword(null);
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
        
        if (!customer.getPassword().equals(request.currentPassword)) {
            throw new RuntimeException("Current password is incorrect");
        }
        
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
        customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

        BillingAddress billingAddress = new BillingAddress();
        billingAddress.setStreetAddress(request.billingAddressRequest.streetAddress);
        billingAddress.setCity(request.billingAddressRequest.city);
        billingAddress.setState(request.billingAddressRequest.state);
        billingAddress.setZipCode(request.billingAddressRequest.zipCode);
        billingAddress = billingAddressRepository.save(billingAddress);

        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setCardNumber(Integer.parseInt(request.cardNumber));
        paymentMethod.setExpirationMonth(request.expirationMonth);
        paymentMethod.setExpirationYear(request.expirationYear);
        paymentMethod.setNameOnCard(request.nameOnCard);
        paymentMethod.setBillingAddressId(billingAddress.getId());
        paymentMethod = paymentMethodRepository.save(paymentMethod);

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
        customerPaymentMethodRepository.deleteByCustomerIdAndPaymentMethodId(customerId, paymentMethodId);
        
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
            .orElseThrow(() -> new RuntimeException("Payment method not found"));
        
        Integer billingAddressId = paymentMethod.getBillingAddressId();
        
        paymentMethodRepository.deleteById(paymentMethodId);
        
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
        
        if (request.enabled) {
            customer.setCustomerStatusId(2);
        } else {
            customer.setCustomerStatusId(1);
        }
        
        customerRepository.save(customer);
        return "Promotion preference updated";
    }

    // ========== LOGIN ==========
    @PostMapping("/login")
    public Customer login(@RequestBody LoginRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail().toLowerCase())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!request.getPassword().equals(customer.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        if (customer.getCustomerStatusId() == 1) {
            throw new RuntimeException("Please verify your email before logging in");
        }

        customer.setPassword(null);
        return customer;
    }
}