package com.wellsfargo.lms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.services.StatServices;

@RestController
@RequestMapping("/stats")
public class StatsController {
	
	@Autowired
	StatServices statServices;
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/cards")
	public ResponseEntity<?> cardStats(){
		return ResponseEntity.ok(statServices.CardStats());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/items")
	public ResponseEntity<?> itemStats(){
		return ResponseEntity.ok(statServices.ItemStats());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/users")
	public ResponseEntity<?> userStats(){
		return ResponseEntity.ok(statServices.UserStats());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/issues")
	public ResponseEntity<?> issueStats(){
		return ResponseEntity.ok(statServices.IssueStats());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/cardtype")
	public ResponseEntity<?> cardTypeStats(){
		return ResponseEntity.ok(statServices.CardByTypeStats());
	}
}
