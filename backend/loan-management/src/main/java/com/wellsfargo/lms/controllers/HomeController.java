package com.wellsfargo.lms.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HomeController {
	@GetMapping
	public String statusCheck() {
		return("Server s up and running");
	}
	
}
