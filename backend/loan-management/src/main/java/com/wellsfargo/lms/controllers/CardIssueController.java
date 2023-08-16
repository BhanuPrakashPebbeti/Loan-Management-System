package com.wellsfargo.lms.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.payloads.CardReqPayload;
import com.wellsfargo.lms.services.EmployeeCardService;

@RestController
@RequestMapping("/getcard")
public class CardIssueController {

	@Autowired
	EmployeeCardService employeeCardService;
	
	@PostMapping
	public ResponseEntity<?> createItem(@RequestBody @Valid CardReqPayload reqPayload){
		try {
			return(employeeCardService.createEmployeeCard(reqPayload.getEmployee_id(),
					reqPayload.getLoan_id(),reqPayload.getItem_id()));
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	@GetMapping
	public ResponseEntity<?> getAllCards(){
		return ResponseEntity.ok(employeeCardService.getAllCards());
	}
	
}
