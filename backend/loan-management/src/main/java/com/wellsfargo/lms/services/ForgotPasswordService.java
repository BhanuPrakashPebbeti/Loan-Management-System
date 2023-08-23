package com.wellsfargo.lms.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.OTPModel;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.OTPRepo;

@Service
public class ForgotPasswordService {

	@Autowired
	EmployeeMasterRepo employeeMasterRepo;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	OTPRepo otpRepo;
	
	@Autowired
	PasswordEncoder encoder;
	
	public ResponseEntity<?> forgotPassword(String email) {
		
		Optional<EmployeeMaster> empOptional = employeeMasterRepo.findByEmail(email);
		if(empOptional.isEmpty()) {
			return ResponseEntity.badRequest().body("Employee does not exist with email "+email);
		}
		
		EmployeeMaster employee = empOptional.get();
		
		String otp = UUID.randomUUID().toString().substring(0,6);
		
		
		
		String body = "Hi, Your OTP for logging into LMS app is: "
        		+ otp
        		+ "\n DO NOT SHARE THIS WITH ANYONE! "
        		+ "The password will expire in 15mins.";
		
		boolean sent =  emailService.sendEmail(employee.getEmail(), "Your otp for LMS", body);
		
		OTPModel otpModel = new OTPModel(employee.getId(),otp,new Date());
		
		try {
			otpRepo.save(otpModel);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			 return ResponseEntity.internalServerError().body("Some error in saving otp in server");
		}
		
		
		return ResponseEntity.ok("Email sent with otp"+sent);
		
	}
	
	public static OTPModel isOTPFound(List<OTPModel> otpList, String targetOTP) {
        for (OTPModel otpModel : otpList) {
            if (otpModel.getOtp().equals(targetOTP)) {
                return otpModel; // Found the target OTP
            }
        }
        return null; // Target OTP not found in the list
    }
	
	public ResponseEntity<?> changePassOTP(String otp, String email,String pass) {
		Optional<EmployeeMaster> empOptional = employeeMasterRepo.findByEmail(email);
		if(empOptional.isEmpty()) {
			return ResponseEntity.badRequest().body("Employee does not exist with email "+email);
		}
		
		EmployeeMaster employee = empOptional.get();
		
		String eid = empOptional.get().getId();
		
		List<OTPModel> otpModels = otpRepo.findByEid(eid);
		
		OTPModel verified = isOTPFound(otpModels, otp);
		
		if(verified == null) {
			return ResponseEntity.badRequest().body("OTP is wrong");
		}
		else {
			Date d1 = verified.getDate();
			Date d2 = new Date();
			Boolean expired =  d2.getTime() - d1.getTime() >= 15 * 60 * 1000;
			if(expired) {
				return ResponseEntity.badRequest().body("OTP is expired");
			}
			else {
				employee.setPassword(encoder.encode(pass));
				employeeMasterRepo.save(employee);
				
				otpRepo.deleteAll(otpModels);
				
				return ResponseEntity.ok("OTP verified and password updated.");
			}
		}
				
	}
}
