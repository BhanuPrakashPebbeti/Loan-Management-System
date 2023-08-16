package com.wellsfargo.lms.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.ProjectedPayload;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.models.LoanCardMaster;
import com.wellsfargo.lms.payloads.LoanPayload;
import com.wellsfargo.lms.services.EmployeeService;
import com.wellsfargo.lms.services.LoanServices;

import antlr.collections.List;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/loans")
public class LoanController {
	
	@Autowired
	private LoanServices loanServices;
	
	@PostMapping("createLoan")
	public ResponseEntity<?> createLoan(@RequestBody @Valid LoanPayload loan){
		try {
//			return(loanServices.createLoan(loan));
			 return ResponseEntity.ok(loan);
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	@GetMapping
	public ResponseEntity<?> getAllLoans(){
		return ResponseEntity.ok(loanServices.getAllLoans());
	}

}
