package com.wellsfargo.lms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellsfargo.lms.models.ItemMaster;


public interface ItemMasterRepo extends JpaRepository<ItemMaster, String>	 {
	

	Optional<ItemMaster> findById(String id);
	
	List<ItemMaster> findByIssueStatus(int issueStatus);
	
	@Query(value = "delete from item_master where item_id=:itemId",nativeQuery = true)
	void hardDeleteItem(String itemId);
	
}
