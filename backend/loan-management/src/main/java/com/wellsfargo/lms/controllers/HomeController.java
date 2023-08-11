package com.wellsfargo.lms.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	@GetMapping
	public String statusCheck() {
		return("Server s up and running");
	}
	
}
