package com.wellsfargo.lms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wellsfargo.lms.models.*;

@Repository
public interface EmployeeCardRepo extends JpaRepository<EmployeeCardDetails, String>	 {
	
	Optional<EmployeeCardDetails> findById(String id);

	List<EmployeeCardDetails> findByEmployee(EmployeeMaster employee);
	
	List<EmployeeCardDetails> findByItem(ItemMaster item);
	
	List<EmployeeCardDetails> findByLoan(LoanCardMaster loan);
	
	@Query(value="SELECT * FROM employee_card_details WHERE item_id = :itemId AND employee_id = :eId", nativeQuery = true)
	List<EmployeeCardDetails> findByItemAndEmp(String itemId, String eId);
	
	@Query(value="DELETE FROM employee_card_details WHERE employee_id = :eId",nativeQuery = true)
	void hardDeleteEmployee(String eId);
	
	List<EmployeeCardDetails> findByApprovalStatus(int approvalStatus);
	
	@Query(value="SELECT cd.* FROM employee_card_details cd JOIN loan_card_master lc ON cd.loan_id = lc.loan_id WHERE lc.loan_type = :loanType",nativeQuery = true)
	List<EmployeeCardDetails> findByLoanType(@Param("loanType") String loanType);
	
	@Query(value="SELECT * FROM employee_card_details WHERE item_id = :itemId AND employee_id = :eId AND loan_id = :loanId", nativeQuery = true)
	List<EmployeeCardDetails> findByItemAndEmpAndLoan(String itemId, String eId, String loanId);
	
}
