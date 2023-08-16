package com.wellsfargo.lms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.lms.models.*;

@Repository
public interface EmployeeCardRepo extends JpaRepository<EmployeeCardDetails, String>	 {
	

}
