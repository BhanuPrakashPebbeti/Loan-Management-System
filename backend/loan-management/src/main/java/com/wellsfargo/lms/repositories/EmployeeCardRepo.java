package com.wellsfargo.lms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.lms.models.*;

@Repository
public interface EmployeeCardRepo extends JpaRepository<EmployeeCardDetails, String>	 {
	
	Optional<EmployeeCardDetails> findById(String id);

	List<EmployeeCardDetails> findByEmployee(EmployeeMaster employee);
}
