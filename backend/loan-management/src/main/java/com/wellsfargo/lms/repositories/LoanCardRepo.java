package com.wellsfargo.lms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wellsfargo.lms.models.*;

@Repository
public interface LoanCardRepo extends JpaRepository<LoanCardMaster, String>	 {
		
	Optional<LoanCardMaster> findById(String id);
	
    List<LoanCardMaster> findByLoanType(String loanType);
}
