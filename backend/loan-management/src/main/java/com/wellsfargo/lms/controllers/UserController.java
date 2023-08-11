package com.wellsfargo.lms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.services.EmployeeService;

@RestController
@RequestMapping("employees")
public class UserController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping
	public ResponseEntity<?> getAllEmployees(){
		return ResponseEntity.ok().body(employeeService.getAllUsers());
	}
	
	@PostMapping
	public ResponseEntity<?> insertEmployee(@RequestBody EmployeeMaster employee){
		try {
			employeeService.createPerson(employee);
			return ResponseEntity.ok("Employee created.");
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
		
	}
}
