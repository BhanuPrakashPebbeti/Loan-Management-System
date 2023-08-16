package com.wellsfargo.lms.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public ResponseEntity<?> insertEmployee(@RequestBody @Valid EmployeeMaster employee){
		try {
			return(employeeService.createPerson(employee));
			// return ResponseEntity.ok("Employee created.");
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable(value = "id") Long personId) {
		
		Optional<EmployeeMaster> employeeOptional = employeeService.findEmployeeById(personId);
		
		if(employeeOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee does not exst with Id: "+personId.toString());
			
		}
		else {
			return ResponseEntity.ok(employeeOptional);
		}
	}
	
}
