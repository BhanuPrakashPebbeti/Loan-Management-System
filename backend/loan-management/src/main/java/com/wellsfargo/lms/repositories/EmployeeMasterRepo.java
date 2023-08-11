package com.wellsfargo.lms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.lms.models.*;

@Repository
public interface EmployeeMasterRepo extends JpaRepository<EmployeeMaster, Long>	 {
	

}
