package com.wellsfargo.lms.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.lms.models.ERole;
import com.wellsfargo.lms.models.Roles;


public interface RoleRepository extends JpaRepository<Roles, Long> {
	Optional<Roles> findByName(ERole name);
}
