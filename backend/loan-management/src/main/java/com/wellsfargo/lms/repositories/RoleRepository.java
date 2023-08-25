package com.wellsfargo.lms.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellsfargo.lms.models.ERole;
import com.wellsfargo.lms.models.Roles;


public interface RoleRepository extends JpaRepository<Roles, Long> {
	Optional<Roles> findByName(ERole name);
	
	@Query(value="delete from user_roles where user_id = :eId",nativeQuery = true)
	void hardDeleteEmployee(String eId);
	
}
