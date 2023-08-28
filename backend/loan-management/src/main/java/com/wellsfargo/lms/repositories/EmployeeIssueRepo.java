package com.wellsfargo.lms.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wellsfargo.lms.models.EmployeeIssueDetails;
import com.wellsfargo.lms.models.EmployeeMaster;

@Repository
public interface EmployeeIssueRepo extends JpaRepository<EmployeeIssueDetails, String>	 {
	List<EmployeeIssueDetails> findByEmployee(EmployeeMaster employee);

	
	@Query(value="DELETE FROM employee_issue_details WHERE employee_id = :eId",nativeQuery = true)
	void hardDeleteEmployee(String eId);
}
