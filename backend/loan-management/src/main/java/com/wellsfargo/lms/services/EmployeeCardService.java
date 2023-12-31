package com.wellsfargo.lms.services;

import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.EmployeeCardDetails;
import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.models.LoanCardMaster;
import com.wellsfargo.lms.repositories.EmployeeCardRepo;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.ItemMasterRepo;
import com.wellsfargo.lms.repositories.LoanCardRepo;

@Service
public class EmployeeCardService {
	
	@Autowired
	private EmployeeCardRepo employeeCardRepo;
	
	@Autowired
	private EmployeeMasterRepo employeeMasterRepo;
	
	@Autowired
	private LoanCardRepo loanCardRepo;
	
	@Autowired
	private ItemMasterRepo itemMasterRepo;
	
	public ResponseEntity<?> createEmployeeCard(String employee_id, String loan_id, String item_id) {
		
		
		Optional<EmployeeMaster> employee = employeeMasterRepo.findById(employee_id);
		
		Optional<LoanCardMaster> loan = loanCardRepo.findById(loan_id);
		
		Optional<ItemMaster> item = itemMasterRepo.findById(item_id);
			
		
		if(employee.isEmpty() || loan.isEmpty() || item.isEmpty()) {
			return ResponseEntity.internalServerError().body("Some argument does not exist."
					+ "TODO: Add explicit exceptions.");
		}
		
		if(item.get().getIssueStatus()!=0) {
			return ResponseEntity.badRequest().body("Item already issued.");
		}
		
		if(!item.get().getCategory().equalsIgnoreCase(loan.get().getLoanType())) {
			return ResponseEntity.badRequest().body("The loan is not available for this item.");
		}
		
		List<EmployeeCardDetails> dupeCards = employeeCardRepo.findByItemAndEmpAndLoan(item_id, employee_id, loan_id);
		
		if(!dupeCards.isEmpty()) {
			return ResponseEntity.badRequest().body("Already applied for this loan");
		}
		
		EmployeeCardDetails employeeCardDetails = new EmployeeCardDetails(employee.get(), loan.get(), item.get());
		try {
			EmployeeCardDetails resp = employeeCardRepo.save(employeeCardDetails);
			return ResponseEntity.ok().body(resp);
		}  catch(Exception e) {
			
			Throwable t = e.getCause();
			while ((t != null) && !(t instanceof ConstraintViolationException)) {
				t = t.getCause();
			}
			if (t instanceof ConstraintViolationException) {
				return ResponseEntity.internalServerError()
						.body("Item Already exists");
			}
			else {
				e.printStackTrace();
				return ResponseEntity.internalServerError()
						.body("Some weird error");
			}
		}
		
	}
	
	public List<EmployeeCardDetails> getAllCards(){
		return employeeCardRepo.findAll();
	}
	
	public Optional<EmployeeCardDetails> getCardById(String id) {
		return employeeCardRepo.findById(id);
	}
	
	public ResponseEntity<?> getCardByEmployee(String employee_id) {
		
		Optional<EmployeeMaster> employee = employeeMasterRepo.findById(employee_id);
		
		if(employee.isEmpty()) {
			return ResponseEntity.internalServerError().body("Employee id incorrect");
		}
		return ResponseEntity.ok(employeeCardRepo.findByEmployee(employee.get())) ;
	}
public ResponseEntity<?> getCardByItemAndEmp(String item_id,String employee_id) {
		
		List<EmployeeCardDetails> cards = employeeCardRepo.findByItemAndEmp(item_id, employee_id);
		if(cards.isEmpty()) {
			return ResponseEntity.badRequest().body("Card is not found");
		}
		return ResponseEntity.ok(employeeCardRepo.findByItemAndEmp(item_id, employee_id)) ;
	}
	
}
