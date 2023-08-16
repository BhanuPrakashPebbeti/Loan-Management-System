package com.wellsfargo.lms.services;

import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeMasterRepo employeeRepo;	

	public ResponseEntity<?> createPerson(EmployeeMaster employee) {

		try {
			EmployeeMaster resp = employeeRepo.save(employee);
			return ResponseEntity.ok().body(resp);
		}  catch(Exception e) {
			
			Throwable t = e.getCause();
			while ((t != null) && !(t instanceof ConstraintViolationException)) {
				t = t.getCause();
			}
			if (t instanceof ConstraintViolationException) {
				return ResponseEntity.internalServerError()
						.body("Account Already exists");
			}
			else {
				e.printStackTrace();
				return ResponseEntity.internalServerError()
						.body("Some weird error");
			}

			
//				return ResponseEntity.internalServerError()
//						.body("Constraint violated");
//			


		}
	}
	
	public List<EmployeeMaster> getAllUsers(){
		return employeeRepo.findAll();
	}
	
	public Optional<EmployeeMaster> findEmployeeById(Long Id) {
		Optional<EmployeeMaster> employee = employeeRepo.findById(Id);
		
		return employee;
		
		}
}
