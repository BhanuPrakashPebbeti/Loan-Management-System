package com.wellsfargo.lms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellsfargo.lms.models.LoanCardMaster;

public interface LoanCardRepo extends JpaRepository<LoanCardMaster, String>	 {
		
	Optional<LoanCardMaster> findById(String id);
	
    List<LoanCardMaster> findByLoanType(String loanType);
    
    @Query(value="SELECT * FROM loan_card_master WHERE loan_type = :loanType AND duration_in_months = :duration", nativeQuery = true)
    List<LoanCardMaster> findByTypeAndDuration(String loanType,int duration);
    
}
