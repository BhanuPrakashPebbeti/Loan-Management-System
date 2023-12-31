package com.wellsfargo.lms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wellsfargo.lms.models.EmployeeMaster;


public interface EmployeeMasterRepo extends JpaRepository<EmployeeMaster, String>	 {
	
	Optional<EmployeeMaster> findById(String id);
	List<EmployeeMaster> findByName(String name);
	
	Optional<EmployeeMaster> findByEmail(String email);
	
	@Query(value="SELECT em.* FROM employee_master em JOIN user_roles ur ON em.employee_id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE r.name = :roleName",nativeQuery = true)
	List<EmployeeMaster> findByRoleName(@Param("roleName") String roleName);
	
	@Query(value="DELETE FROM employee_master WHERE employee_id = :eId",nativeQuery = true)
	void hardDelete(String eId);
	
}
