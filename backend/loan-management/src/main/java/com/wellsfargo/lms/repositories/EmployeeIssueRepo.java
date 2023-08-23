package com.wellsfargo.lms.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.lms.models.*;

@Repository
public interface EmployeeIssueRepo extends JpaRepository<EmployeeIssueDetails, String>	 {
	List<EmployeeIssueDetails> findByEmployee(EmployeeMaster employee);

}
