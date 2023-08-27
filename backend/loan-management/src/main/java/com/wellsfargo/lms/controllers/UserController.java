package com.wellsfargo.lms.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.payloads.ChangePasswordPayload;
import com.wellsfargo.lms.payloads.UserDetailsPayload;
import com.wellsfargo.lms.services.EmployeeService;

@CrossOrigin
@RestController
@RequestMapping("employees")
public class UserController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/all")
	public ResponseEntity<?> getAllEmployees(){
		return ResponseEntity.ok().body(employeeService.getAllUsers());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<?> getEmployees(){
		return ResponseEntity.ok().body(employeeService.getAllEmployees());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
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
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/id")
	public ResponseEntity<?> getEmployeeById(@RequestParam(value = "id") String personId) {
		
		Optional<EmployeeMaster> employeeOptional = employeeService.findEmployeeById(personId);
		
		if(employeeOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee does not exst with Id: "+personId.toString());
			
		}
		else {
			return ResponseEntity.ok(employeeOptional);
		}
	}
	
//	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/userdetails")
	public ResponseEntity<?> getUserDetails(@RequestParam(value = "id") String personId) {
		
		Optional<EmployeeMaster> employeeOptional = employeeService.findEmployeeById(personId);
		
		if(employeeOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee does not exst with Id: "+personId.toString());
			
		}
		else {
			UserDetailsPayload userdet = new UserDetailsPayload(employeeOptional.get());
			return ResponseEntity.ok(userdet);
		}
	}
	

	@PutMapping
	public ResponseEntity<?> updateEmployee(@RequestBody EmployeeMaster empDetails) {
		return employeeService.updateEmployee(empDetails);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping
	public ResponseEntity<?> deleteEmployee(@RequestParam(value = "id") String eId) {
		return employeeService.deleteEmployee(eId);
	}
	
	@PutMapping("/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordPayload payload) {
		return employeeService.changePassword(payload);
	}
	
	
}
