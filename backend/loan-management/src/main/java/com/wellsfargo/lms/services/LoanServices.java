package com.wellsfargo.lms.services;

import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.models.LoanCardMaster;
import com.wellsfargo.lms.payloads.LoanPayload;
import com.wellsfargo.lms.repositories.LoanCardRepo;

@Service
public class LoanServices {

	@Autowired
	private LoanCardRepo loanCardRepo;
	
	
	public ResponseEntity<?> createLoan(LoanPayload loanreq) {

		LoanCardMaster loan = new LoanCardMaster(loanreq.getType(),loanreq.getDuration());
		
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
	
}
