package com.wellsfargo.lms.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.models.EmployeeCardDetails;
import com.wellsfargo.lms.payloads.CardReqPayload;
import com.wellsfargo.lms.services.EmployeeCardService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/getcard")
public class CardIssueController {

	@Autowired
	EmployeeCardService employeeCardService;
	
	@PostMapping
	public ResponseEntity<?> createCard(@RequestBody @Valid CardReqPayload reqPayload){
		try {
			return(employeeCardService.createEmployeeCard(reqPayload.getEmployee_id(),
					reqPayload.getLoan_id(),reqPayload.getItem_id()));
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<?> getAllCards(){
		return ResponseEntity.ok(employeeCardService.getAllCards());
	}
	
	
	@GetMapping("/id")
	public ResponseEntity<?> getCardById(@RequestParam(value = "id") String id) {
		
		Optional<EmployeeCardDetails> cards = employeeCardService.getCardById(id);
		
		if(cards.isEmpty()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Card does not exst with Id: "+id.toString());
			
		}
		else {
			return ResponseEntity.ok(cards);
		}
	}
	
	@GetMapping("/emp")
	public ResponseEntity<?> getCardByEmployee(@RequestParam(value = "eid") String eid) {
		
		return employeeCardService.getCardByEmployee(eid);
	}
	
	
}
