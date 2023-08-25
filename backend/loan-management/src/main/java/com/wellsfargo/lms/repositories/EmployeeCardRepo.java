package com.wellsfargo.lms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
	
}
