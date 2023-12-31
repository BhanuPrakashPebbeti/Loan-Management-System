package com.wellsfargo.lms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.services.EmployeeIssueService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/approval")
public class LoanIssueController {

	@Autowired
	private EmployeeIssueService employeeIssueService;
	
	@GetMapping("/emp")
public ResponseEntity<?> getCardByEmployee(@RequestParam(value = "eid") String eid) {
		
		return employeeIssueService.getIsuuesByEmployee(eid);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("new")
	public ResponseEntity<?> approveItem(@RequestParam(value = "cardId") String cardId){
		try {
			return(employeeIssueService.approveLoan(cardId));
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("decline")
	public ResponseEntity<?> declineItem(@RequestParam(value = "cardId") String cardId){
		try {
			return(employeeIssueService.declineLoan(cardId));
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<?> getAllApprovals(){
		return ResponseEntity.ok(employeeIssueService.getAllIssues());
	}
	
}
