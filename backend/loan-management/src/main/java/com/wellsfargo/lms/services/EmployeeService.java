package com.wellsfargo.lms.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.EmployeeIssueDetails;
import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.payloads.ChangePasswordPayload;
import com.wellsfargo.lms.repositories.EmployeeCardRepo;
import com.wellsfargo.lms.repositories.EmployeeIssueRepo;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.ItemMasterRepo;
import com.wellsfargo.lms.repositories.RoleRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeMasterRepo employeeRepo;

	@Autowired
	private EmployeeCardRepo employeeCardRepo;

	@Autowired
	private EmployeeIssueRepo employeeIssueRepo;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private ItemMasterRepo itemMasterRepo;

	@Autowired
	PasswordEncoder encoder;

	public ResponseEntity<?> createPerson(EmployeeMaster employee) {

		try {
			EmployeeMaster resp = employeeRepo.save(employee);
			return ResponseEntity.ok().body(resp);
		} catch (Exception e) {

			Throwable t = e.getCause();
			while ((t != null) && !(t instanceof ConstraintViolationException)) {
				t = t.getCause();
			}
			if (t instanceof ConstraintViolationException) {
				return ResponseEntity.internalServerError().body("Account Already exists");
			} else {
				e.printStackTrace();
				return ResponseEntity.internalServerError().body("Some weird error");
			}

//				return ResponseEntity.internalServerError()
//						.body("Constraint violated");
//			

		}
	}

	public List<EmployeeMaster> getAllUsers() {
		return employeeRepo.findAll();
	}

	public List<EmployeeMaster> getAllEmployees() {
		return employeeRepo.findByRoleName("ROLE_EMPLOYEE");
	}

	public Optional<EmployeeMaster> findEmployeeById(String Id) {
		Optional<EmployeeMaster> employee = employeeRepo.findById(Id);

		return employee;

	}

	public ResponseEntity<?> updateEmployee(EmployeeMaster EmpDetails) {

		Optional<EmployeeMaster> employeeopt = employeeRepo.findById(EmpDetails.getId());

		if (employeeopt.isEmpty()) {
			return ResponseEntity.badRequest().body("employee not found with id:" + EmpDetails.getId());
		}

		EmployeeMaster employee = employeeopt.get();

		if (EmpDetails.getName() != null) {
			employee.setName(EmpDetails.getName());
		}

		if (EmpDetails.getDepartment() != null) {
			employee.setDepartment(EmpDetails.getDepartment());
		}

		if (EmpDetails.getDesignation() != null) {
			employee.setDesignation(EmpDetails.getDesignation());
		}

		if (EmpDetails.getGender() != null) {
			employee.setGender(EmpDetails.getGender());
		}
		if (EmpDetails.getDob() != null) {
			employee.setDob(EmpDetails.getDob());
		}
		if (EmpDetails.getDoj() != null) {
			employee.setDoj(EmpDetails.getDoj());
		}
		if (EmpDetails.getEmail() != null) {
			employee.setEmail(EmpDetails.getEmail());
		}
//		if (EmpDetails.getPassword() != null) {
//			employee.setPassword(encoder.encode(EmpDetails.getPassword()));
//		}
		
		

		return ResponseEntity.ok(this.employeeRepo.save(employee));
	}
	
	
	public ResponseEntity<?> changePassword(ChangePasswordPayload payload) {
		Optional<EmployeeMaster> employeeopt = employeeRepo.findById(payload.getId());

		if (employeeopt.isEmpty()) {
			return ResponseEntity.badRequest().body("employee not found with id:" + payload.getId());
		}
		
		EmployeeMaster employee = employeeopt.get();
		
		if(!encoder.matches(payload.getPassword(),employee.getPassword())) {
			return ResponseEntity.badRequest().body("The old password is wrong");
		}
		
		employee.setPassword(encoder.encode(payload.getNewPassword()));
		
		employeeRepo.save(employee);
		
		return ResponseEntity.ok("Password changed successfully!");
		
	}
	

	public ResponseEntity<?> deleteEmployee(String eId) {
		Optional<EmployeeMaster> employeeopt = employeeRepo.findById(eId);

		if (employeeopt.isEmpty()) {
			return ResponseEntity.badRequest().body("employee not found with id:" + eId);
		}

		EmployeeMaster employee = employeeopt.get();

		List<ItemMaster> orphanItems = new ArrayList<>();
		List<EmployeeIssueDetails> issues = employeeIssueRepo.findByEmployee(employee);

		
		  for (EmployeeIssueDetails issue : issues) { 
			  ItemMaster item = issue.getItem(); 
			  orphanItems.add(item); 
		  }
		 

		this.employeeIssueRepo.hardDeleteEmployee(employee.getId());
		this.employeeCardRepo.hardDeleteEmployee(employee.getId());
		for(ItemMaster item : orphanItems) {
			this.itemMasterRepo.hardDeleteItem(item.getId());
		}
		this.roleRepository.hardDeleteEmployee(employee.getId());
		this.employeeRepo.delete(employee);

		return ResponseEntity.ok("Entry deleted successfully!");

	}

}
