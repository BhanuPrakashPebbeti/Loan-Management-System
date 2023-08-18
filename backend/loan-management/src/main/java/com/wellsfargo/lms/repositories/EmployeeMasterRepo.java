package com.wellsfargo.lms.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.lms.models.*;
import java.util.List;


@Repository
public interface EmployeeMasterRepo extends JpaRepository<EmployeeMaster, String>	 {
	
	Optional<EmployeeMaster> findById(String id);
	List<EmployeeMaster> findByName(String name);
}
