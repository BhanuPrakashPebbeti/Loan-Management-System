package com.wellsfargo.lms.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.payloads.IssuePayload;
import com.wellsfargo.lms.services.EmployeeIssueService;

@RestController
@RequestMapping("/approval")
public class LoanIssueController {

	@Autowired
	private EmployeeIssueService employeeIssueService;
	
	
	@PostMapping("new")
	public ResponseEntity<?> approveItem(@RequestBody @Valid IssuePayload reqPayload){
		try {
			return(employeeIssueService.approveLoan(reqPayload.getCardId()));
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	@PostMapping("decline")
	public ResponseEntity<?> declineItem(@RequestBody @Valid IssuePayload reqPayload){
		try {
			return(employeeIssueService.declineLoan(reqPayload.getCardId()));
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	
	@GetMapping
	public ResponseEntity<?> getAllApprovals(){
		return ResponseEntity.ok(employeeIssueService.getAllIssues());
	}
	
}
