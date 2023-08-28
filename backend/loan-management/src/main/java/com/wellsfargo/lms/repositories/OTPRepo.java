package com.wellsfargo.lms.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.lms.models.OTPModel;

public interface OTPRepo extends JpaRepository<OTPModel, Long>	 {
		
	List<OTPModel> findByEid(String eid);
}