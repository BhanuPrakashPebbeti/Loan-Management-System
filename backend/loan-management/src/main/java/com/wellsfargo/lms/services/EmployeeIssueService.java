package com.wellsfargo.lms.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.EmployeeCardDetails;
import com.wellsfargo.lms.models.EmployeeIssueDetails;
import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.models.LoanCardMaster;
import com.wellsfargo.lms.repositories.EmployeeCardRepo;
import com.wellsfargo.lms.repositories.EmployeeIssueRepo;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.ItemMasterRepo;

@Service
public class EmployeeIssueService {

	@Autowired
	private EmployeeIssueRepo employeeIssueRepo;
	
	@Autowired
	private EmployeeCardRepo employeeCardRepo;
	
	@Autowired
	private ItemMasterRepo itemMasterRepo;
	
	@Autowired
	private EmployeeMasterRepo employeeMasterRepo;
	
	
	public ResponseEntity<?> approveLoan(String cardId){
		
		Optional<EmployeeCardDetails> employeeCardDetails = employeeCardRepo.findById(cardId);
		
		if(employeeCardDetails.isEmpty()) {
			return ResponseEntity.badRequest().body("Coould not find card");
		}
		EmployeeCardDetails cardDetails = employeeCardDetails.get();
		
		EmployeeMaster employee = cardDetails.getEmployee();
		
		LoanCardMaster loanCardMaster = cardDetails.getLoan();
		
		ItemMaster item = cardDetails.getItem();
		
		if(item.getIssueStatus() != 0) {
			return ResponseEntity.badRequest().body("Item already issued");
		}
		
		if(cardDetails.getApprovalStatus()!= 0 ) {
			return ResponseEntity.badRequest().body("Admin has already taken an action");
		}
		
		int duration = loanCardMaster.getDuration();
		
		LocalDate currentDate = LocalDate.now();

        // Define a formatter to format the date as a string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Format the date as a string
        String issueDate = currentDate.format(formatter);
        


        // Calculate the date after duration months
        LocalDate returnDate = currentDate.plusMonths(duration);
        
        String reutrnDateString = returnDate.format(formatter);
        
		
		EmployeeIssueDetails issueDetails = new EmployeeIssueDetails(employee, item,
				issueDate, reutrnDateString);
		
		
		try {
			
			EmployeeIssueDetails resp = employeeIssueRepo.save(issueDetails);
			List<EmployeeCardDetails> cards = employeeCardRepo.findByItem(item);
			for(EmployeeCardDetails card : cards) {
				if(!card.equals(cardDetails)) {
					card.setApprovalStatus(2);
				}
			}
			cardDetails.setApprovalStatus(1);
			
			employeeCardRepo.save(cardDetails);
			item.setIssueStatus(1);
			itemMasterRepo.save(item);
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
	
	public List<EmployeeIssueDetails> getAllIssues(){
		return employeeIssueRepo.findAll();
	}
	
public ResponseEntity<?> declineLoan(String cardId){
		
		Optional<EmployeeCardDetails> employeeCardDetails = employeeCardRepo.findById(cardId);
		
		if(employeeCardDetails.isEmpty()) {
			return ResponseEntity.badRequest().body("Coould not find card");
		}
		EmployeeCardDetails cardDetails = employeeCardDetails.get();
		
		EmployeeMaster employee = cardDetails.getEmployee();
		
		LoanCardMaster loanCardMaster = cardDetails.getLoan();
		
		ItemMaster item = cardDetails.getItem();
		
		if(item.getIssueStatus() != 0) {
			return ResponseEntity.badRequest().body("Item already issued");
		}
		
		if(cardDetails.getApprovalStatus()!= 0 ) {
			return ResponseEntity.badRequest().body("Admin has already taken an action");
		}
			
		
		try {
			
			cardDetails.setApprovalStatus(2);
			employeeCardRepo.save(cardDetails);
			return ResponseEntity.ok().body("Loan declined.");
		}  catch(Exception e) {
			
			Throwable t = e.getCause();
			while ((t != null) && !(t instanceof ConstraintViolationException)) {
				t = t.getCause();
			}
			if (t instanceof ConstraintViolationException) {
				return ResponseEntity.internalServerError()
						.body("Constraint Violated");
			}
			else {
				e.printStackTrace();
				return ResponseEntity.internalServerError()
						.body("Some weird error");
			}
		}
	}

public ResponseEntity<?> getIsuuesByEmployee(String employee_id) {
	
	Optional<EmployeeMaster> employee = employeeMasterRepo.findById(employee_id);
	
	if(employee.isEmpty()) {
		return ResponseEntity.internalServerError().body("Employee id incorrect");
	}
	return ResponseEntity.ok(employeeCardRepo.findByEmployee(employee.get())) ;
}
	
}
