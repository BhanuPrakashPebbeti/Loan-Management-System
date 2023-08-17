package com.wellsfargo.lms.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.models.LoanCardMaster;
import com.wellsfargo.lms.payloads.LoanPayload;
import com.wellsfargo.lms.services.LoanServices;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/loans")
public class LoanController {
	
	@Autowired
	private LoanServices loanServices;
	
	@PostMapping("createLoan")
	public ResponseEntity<?> createLoan(@RequestBody @Valid LoanPayload loan){
		try {
			return(loanServices.createLoan(loan));
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	@GetMapping
	public ResponseEntity<?> getAllLoans(){
		return ResponseEntity.ok(loanServices.getAllLoans());
	}
	
	@GetMapping("/id")
	public ResponseEntity<?> getItemById(@RequestParam(value = "id") String id) {
		
		Optional<LoanCardMaster> loans = loanServices.getLoanById(id);
		
		if(loans.isEmpty()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee does not exst with Id: "+id.toString());
			
		}
		else {
			return ResponseEntity.ok(loans);
		}
	}

}
