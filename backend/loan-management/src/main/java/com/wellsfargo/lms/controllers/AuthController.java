package com.wellsfargo.lms.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.models.ERole;
import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.Roles;
import com.wellsfargo.lms.payloads.JwtResponse;
import com.wellsfargo.lms.payloads.LoginRequest;
import com.wellsfargo.lms.payloads.SignUpRequest;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.RoleRepository;
import com.wellsfargo.lms.security.jwt.JwtUtils;
import com.wellsfargo.lms.security.services.UserDetailsImpl;
import com.wellsfargo.lms.services.ForgotPasswordService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	EmployeeMasterRepo userRepository;

	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	ForgotPasswordService forgotPasswordService;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUserId(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
//		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
//			return ResponseEntity.badRequest().body("Error: Username is already taken!");
//		}
//
//		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
//			return ResponseEntity.badRequest().body("Error: Email is already in use!");
//		}

		// Create new user's account
//		EmployeeMaster user = new EmployeeMaster(signUpRequest.getUsername(), signUpRequest.getEmail(),
//				encoder.encode(signUpRequest.getPassword()));

		EmployeeMaster employee = new EmployeeMaster(signUpRequest.getName(),signUpRequest.getEmail() , signUpRequest.getDesignation(),
				signUpRequest.getDepartment(), signUpRequest.getGender(), signUpRequest.getDob(),
				signUpRequest.getDoj(), encoder.encode(signUpRequest.getPassword()), signUpRequest.getIsAdmin());

		Set<String> strRoles = signUpRequest.getRole();
		Set<Roles> roles = new HashSet<>();

		if (strRoles == null) {
			Roles userRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Roles adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;

				default:
					Roles userRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		employee.setRoles(roles);
		userRepository.save(employee);

		return ResponseEntity.ok(("User registered successfully!"));
	}
	
	@PostMapping("/forgot")
	public ResponseEntity<?> forGotPassword(@RequestParam(value = "email") String email) {
		return forgotPasswordService.forgotPassword(email);
	}
	
	@PostMapping("/verify")
	public ResponseEntity<?> verifyOTP(@RequestParam(value = "email") String email,
			@RequestParam(value = "otp") String otp, @RequestParam(value = "pass") String pass) {
		return forgotPasswordService.changePassOTP(otp, email, pass);
		
		
	}
	
	
	
}
