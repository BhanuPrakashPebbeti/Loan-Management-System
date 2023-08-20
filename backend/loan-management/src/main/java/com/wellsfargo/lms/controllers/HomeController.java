package com.wellsfargo.lms.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HomeController {
	@GetMapping
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	public String statusCheck() {
		return("Server s up and running");
	}
	
}
