package com.wellsfargo.lms.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.EmployeeCardDetails;
import com.wellsfargo.lms.models.EmployeeIssueDetails;
import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.payloads.ItemPayload;
import com.wellsfargo.lms.payloads.UserDetailsPayload;
import com.wellsfargo.lms.repositories.EmployeeCardRepo;
import com.wellsfargo.lms.repositories.EmployeeIssueRepo;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.ItemMasterRepo;

@Service
public class ItemService {

	@Autowired
	private ItemMasterRepo itemMasterRepo;
	
	@Autowired
	private EmployeeCardRepo employeeCardRepo;
	
	@Autowired
	private EmployeeMasterRepo employeeMasterRepo;
	
	
	@Autowired
	private EmployeeIssueRepo employeeIssueRepo;
	
	public ResponseEntity<?> createItem(ItemPayload itemreq) {

		ItemMaster ite = new ItemMaster(itemreq.getItemName(),itemreq.getDescription(),itemreq.getIssueStatus(),
				itemreq.getItemMake(),itemreq.getCategory(),itemreq.getValuation());
		
		try {
			ItemMaster resp = itemMasterRepo.save(ite);
			return ResponseEntity.ok().body(resp);
		}  catch(Exception e) {
			
			Throwable t = e.getCause();
			while ((t != null) && !(t instanceof ConstraintViolationException)) {
				t = t.getCause();
			}
			if (t instanceof ConstraintViolationException) {
				return ResponseEntity.internalServerError()
						.body("Item Already exists");
			}
			else {
				e.printStackTrace();
				return ResponseEntity.internalServerError()
						.body("Some weird error");
			}
		}
		}
	
	public List<ItemMaster> getAllItems(){
		return itemMasterRepo.findAll();
	}
	
	
	public List<ItemMaster> getAllUnissuedItems(){
		return itemMasterRepo.findByIssueStatus(0);
	}
	
	
	public Optional<ItemMaster> getItemById(String id) {
		return itemMasterRepo.findById(id);
	}
	
	public ResponseEntity<?> updateItem(ItemMaster itemDetails) {

		Optional<ItemMaster> itemopt= itemMasterRepo.findById(itemDetails.getId());
				
		if(itemopt.isEmpty()) {
			return ResponseEntity.badRequest().body("item not found with id:"+itemDetails.getId());
		}
		
		ItemMaster item = itemopt.get();

		if(item.getIssueStatus()!=0) {
			return ResponseEntity.badRequest().body("Cannot edit issued item");
		}
		
		if(itemDetails.getCategory()!= null) {
			item.setCategory(itemDetails.getCategory());
		}

		if(itemDetails.getDescription()!= null) {
			item.setDescription(itemDetails.getDescription());
		}

		if(itemDetails.getItemMake()!= null) {
			item.setItemMake(itemDetails.getItemMake());
		}
		if(itemDetails.getItemName()!= null) {
			item.setItemName(itemDetails.getItemName());
		}
		if(itemDetails.getValuation()!= 0) {
			item.setValuation(itemDetails.getValuation());
		}
		
		return ResponseEntity.ok(this.itemMasterRepo.save(item));
	}
	
	public ResponseEntity<?> deleteItem(String id) {
		Optional<ItemMaster> itemopt = itemMasterRepo.findById(id);
		
		if(itemopt.isEmpty()) {
			return ResponseEntity.badRequest().body("item not found with id:"+id);
		}
		
		ItemMaster item = itemopt.get();
				
		if(item.getIssueStatus()!=0) {
			return ResponseEntity.badRequest().body("Cannot edit issued item");
		}
		
		this.itemMasterRepo.delete(item);

		return ResponseEntity.ok("Entry deleted successfully!");
		
	}
	
	public ResponseEntity<?> getAppliedItems(String id) {
		
		Optional<EmployeeMaster> empOptional = employeeMasterRepo.findById(id);
		
		if(empOptional.isEmpty()) {
			return ResponseEntity.badRequest().body("employee not found with id:"+id);
		}
		
		EmployeeMaster employee = empOptional.get();
		
		List<EmployeeCardDetails> cards = employeeCardRepo.findByEmployee(employee);
		
		List<ItemMaster> items = new ArrayList<ItemMaster>();
		
		for(EmployeeCardDetails card: cards) {
			items.add(card.getItem());
		}
		
		return ResponseEntity.ok(items);
		
	}
	
public ResponseEntity<?> getPendingItems(String id) {
		
		Optional<EmployeeMaster> empOptional = employeeMasterRepo.findById(id);
		
		if(empOptional.isEmpty()) {
			return ResponseEntity.badRequest().body("employee not found with id:"+id);
		}
		
		EmployeeMaster employee = empOptional.get();
		
		List<EmployeeCardDetails> cards = employeeCardRepo.findByEmployee(employee);
		
		List<ItemMaster> items = new ArrayList<ItemMaster>();
		
		for(EmployeeCardDetails card: cards) {
			if(card.getApprovalStatus() == 0) {
				items.add(card.getItem());
			}
		}
		
		return ResponseEntity.ok(items);
		
	}
	
	
	
public ResponseEntity<?> getApprovedItems(String id) {
	
	Optional<EmployeeMaster> empOptional = employeeMasterRepo.findById(id);
	
	if(empOptional.isEmpty()) {
		return ResponseEntity.badRequest().body("employee not found with id:"+id);
	}
	
	EmployeeMaster employee = empOptional.get();
	
	List<EmployeeCardDetails> cards = employeeCardRepo.findByEmployee(employee);
	
	List<ItemMaster> items = new ArrayList<ItemMaster>();
	
	for(EmployeeCardDetails card: cards) {
		if(card.getApprovalStatus() == 1) {
			items.add(card.getItem());
		}
	}
	
	return ResponseEntity.ok(items);
	
}

public ResponseEntity<?> getDeclinedItems(String id) {
	
	Optional<EmployeeMaster> empOptional = employeeMasterRepo.findById(id);
	
	if(empOptional.isEmpty()) {
		return ResponseEntity.badRequest().body("employee not found with id:"+id);
	}
	
	EmployeeMaster employee = empOptional.get();
	
	List<EmployeeCardDetails> cards = employeeCardRepo.findByEmployee(employee);
	
	List<ItemMaster> items = new ArrayList<ItemMaster>();
	
	for(EmployeeCardDetails card: cards) {
		if(card.getApprovalStatus() == 2) {
			items.add(card.getItem());
		}
	}
	
	return ResponseEntity.ok(items);
	
}

	
}
