package com.wellsfargo.lms.services;

import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.EmployeeCardDetails;
import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.models.LoanCardMaster;
import com.wellsfargo.lms.payloads.LoanPayload;
import com.wellsfargo.lms.repositories.EmployeeCardRepo;
import com.wellsfargo.lms.repositories.LoanCardRepo;

@Service
public class LoanServices {

	@Autowired
	private LoanCardRepo loanCardRepo;
	
	@Autowired
	private EmployeeCardRepo employeeCardRepo;
	
	
	public ResponseEntity<?> createLoan(LoanPayload loanreq) {

		if(loanreq.getDuration() == 0) {
			return ResponseEntity.badRequest().body("Duration cannot be zero.");
		}
		
		List<LoanCardMaster> duploans = loanCardRepo.findByTypeAndDuration(loanreq.getLoanType(), loanreq.getDuration());
		
		if(!duploans.isEmpty()) {
			return ResponseEntity.badRequest().body("Duplicate loan card exists");
		}
		
		LoanCardMaster loan = new LoanCardMaster(loanreq.getLoanType(),loanreq.getDuration());
		
		try {
			LoanCardMaster resp = loanCardRepo.save(loan);
			return ResponseEntity.ok().body(resp);
		}  catch(Exception e) {
			
			Throwable t = e.getCause();
			while ((t != null) && !(t instanceof ConstraintViolationException)) {
				t = t.getCause();
			}
			if (t instanceof ConstraintViolationException) {
				return ResponseEntity.internalServerError()
						.body("Loan Already exists");
			}
			else {
				e.printStackTrace();
				return ResponseEntity.internalServerError()
						.body("Some weird error");
			}
		}
		}
	
	public List<LoanCardMaster> getAllLoans(){
		return loanCardRepo.findAll();
	}
	
	public Optional<LoanCardMaster> getLoanById(String id) {
		return loanCardRepo.findById(id);
	}
	
	public List<LoanCardMaster> getLoanByType(String type) {
		return loanCardRepo.findByLoanType(type);
	}
	
	public ResponseEntity<?> updateLoan(LoanCardMaster loanDetails) {

		Optional<LoanCardMaster> loanopt= loanCardRepo.findById(loanDetails.getId());
				
		if(loanopt.isEmpty()) {
			return ResponseEntity.badRequest().body("loan not found with id:"+loanDetails.getId());
		}
		
		LoanCardMaster loan= loanopt.get();

		List<EmployeeCardDetails> cards = employeeCardRepo.findByLoan(loan);
		
		if(!cards.isEmpty()) {
			return ResponseEntity.badRequest().body("Cannot edit. Loan already applied");
		}
		
		if(loanDetails.getDuration()!= 0) {
			loan.setDuration(loanDetails.getDuration());
		}

		if(loanDetails.getLoanType()!= null) {
			loan.setLoanType(loanDetails.getLoanType());
		}

		
		return ResponseEntity.ok(this.loanCardRepo.save(loan));
	}
	
	public ResponseEntity<?> deleteLoan(String id) {
		Optional<LoanCardMaster> loanopt= loanCardRepo.findById(id);
		
		if(loanopt.isEmpty()) {
			return ResponseEntity.badRequest().body("loan not found with id:"+id);
		}
		
		LoanCardMaster loan = loanopt.get();
		
		List<EmployeeCardDetails> cards = employeeCardRepo.findByLoan(loan);
		
		if(!cards.isEmpty()) {
			return ResponseEntity.badRequest().body("Cannot delete. Loan already applied");
		}
				
		this.loanCardRepo.delete(loan);

		return ResponseEntity.ok("Entry deleted successfully!");
		
	}
	
	
	
}
