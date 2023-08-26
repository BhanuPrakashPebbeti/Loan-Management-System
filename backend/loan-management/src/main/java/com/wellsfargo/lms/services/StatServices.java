package com.wellsfargo.lms.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.lms.models.EmployeeCardDetails;
import com.wellsfargo.lms.models.EmployeeIssueDetails;
import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.repositories.EmployeeCardRepo;
import com.wellsfargo.lms.repositories.EmployeeIssueRepo;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.ItemMasterRepo;
import com.wellsfargo.lms.repositories.LoanCardRepo;


@Service
public class StatServices {

	@Autowired
	private LoanCardRepo loanCardRepo;
	
	@Autowired
	private EmployeeCardRepo employeeCardRepo;
	
	@Autowired
	private EmployeeMasterRepo employeeMasterRepo;
	
	@Autowired
	private EmployeeIssueRepo employeeIssueRepo;
	
	@Autowired
	private ItemMasterRepo itemMasterRepo;
	
	public HashMap<String, Integer> CardStats(){
		HashMap<String, Integer> stats = new HashMap<>();
		
		List<EmployeeCardDetails> pendingCards = employeeCardRepo.findByApprovalStatus(0);
		
		List<EmployeeCardDetails> approvedCards = employeeCardRepo.findByApprovalStatus(1);
		
		List<EmployeeCardDetails> declinedCards = employeeCardRepo.findByApprovalStatus(2);
		
		stats.put("Pending", pendingCards.size());
		
		stats.put("Approved", approvedCards.size());
		
		stats.put("Declined", declinedCards.size());
		
		return stats;
	}
	
	public HashMap<String, Integer> ItemStats(){
		
		List<ItemMaster> unissuedItems = itemMasterRepo.findByIssueStatus(0);
		
		List<ItemMaster> issuedItems = itemMasterRepo.findByIssueStatus(1);
		
		HashMap<String, Integer> stats = new HashMap<>();
		
		stats.put("Issued", issuedItems.size());
		
		stats.put("Unissued", unissuedItems.size());
		
		return stats;
		
	}
	
	public HashMap<String, Integer> UserStats(){
		
		List<EmployeeMaster> users = employeeMasterRepo.findByRoleName("ROLE_EMPLOYEE");
		
		List<EmployeeMaster> admins = employeeMasterRepo.findByRoleName("ROLE_ADMIN");
		
		HashMap<String, Integer> stats = new HashMap<>();
		
		stats.put("Users", users.size());
		
		stats.put("Admins", admins.size());
		
		return stats;
		
	}
	
	public HashMap<String, Integer> IssueStats(){
		
		List<EmployeeIssueDetails> issuesDetails = employeeIssueRepo.findAll();
		
		HashMap<String, Integer> stats = new HashMap<>();
		
		stats.put("Total issues", issuesDetails.size());
		
		return stats;
		
	}
	
	public HashMap<String, Integer> CardByTypeStats(){
		
		List<EmployeeCardDetails> furniture = employeeCardRepo.findByLoanType("Furniture");
		
		List<EmployeeCardDetails> home = employeeCardRepo.findByLoanType("Home");
		
		List<EmployeeCardDetails> vehicle = employeeCardRepo.findByLoanType("Vehicle");
		
		List<EmployeeCardDetails> jewellery = employeeCardRepo.findByLoanType("Jewellery");
		
		List<EmployeeCardDetails> property = employeeCardRepo.findByLoanType("Property");
		
		List<EmployeeCardDetails> other = employeeCardRepo.findByLoanType("Other");
		
		HashMap<String, Integer> stats = new HashMap<>();
		
		stats.put("Furniture", furniture.size());
		
		stats.put("Home", home.size());
		
		stats.put("Vehicle", vehicle.size());
		
		stats.put("Jewellery", jewellery.size());
		
		stats.put("Property", property.size());
		
		stats.put("Others", other.size());
		
		return stats;
		
	}
	
}
