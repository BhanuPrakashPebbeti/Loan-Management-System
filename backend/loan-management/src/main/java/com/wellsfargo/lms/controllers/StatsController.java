package com.wellsfargo.lms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.services.StatServices;

@RestController
@RequestMapping("/stats")
public class StatsController {
	
	@Autowired
	StatServices statServices;
	
	@GetMapping("/cards")
	public ResponseEntity<?> cardStats(){
		return ResponseEntity.ok(statServices.CardStats());
	}
	
	@GetMapping("/items")
	public ResponseEntity<?> itemStats(){
		return ResponseEntity.ok(statServices.ItemStats());
	}
	
}
