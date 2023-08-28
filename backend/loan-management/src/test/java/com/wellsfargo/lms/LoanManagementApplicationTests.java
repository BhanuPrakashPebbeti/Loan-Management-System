package com.wellsfargo.lms;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.hibernate.hql.spi.id.inline.AbstractInlineIdsBulkIdHandler;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.event.annotation.AfterTestClass;

import com.wellsfargo.lms.controllers.AuthController;
import com.wellsfargo.lms.controllers.ItemController;
import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.models.LoanCardMaster;
import com.wellsfargo.lms.payloads.ItemPayload;
import com.wellsfargo.lms.payloads.LoanPayload;
import com.wellsfargo.lms.payloads.SignUpRequest;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.ItemMasterRepo;
import com.wellsfargo.lms.repositories.LoanCardRepo;
import com.wellsfargo.lms.services.EmployeeService;
import com.wellsfargo.lms.services.ItemService;
import com.wellsfargo.lms.services.LoanServices;

@SpringBootTest
class LoanManagementApplicationTests {
	
	public String eId,itemId,loanId,cardId;
	
	
	@Test
	void contextLoads() {
	}
	
	@Autowired
	EmployeeMasterRepo employeeMasterRepo;
	
	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	AuthController authController;
	
	@Autowired
	ItemController itemController;
	
	@Autowired
	ItemService itemService;
	
	@Autowired
	ItemMasterRepo itemMasterRepo;
	
	@Autowired
	LoanCardRepo loanCardRepo;
	
	@Autowired
	LoanServices loanServices;
	
	@Test
	public void testSignUp() {
		
		Optional<EmployeeMaster> findEmp = employeeMasterRepo.findByEmail("junit@test.com");
		if(!findEmp.isEmpty()) {			
			employeeService.deleteEmployee(findEmp.get().getId());
		}
		
		
		Set<String> roles = new HashSet<>();
		roles.add("employee");
		SignUpRequest signUpRequest = new SignUpRequest("Tester", "Program Associate",
				"CTO", "M", "31 May 2001", "24 July 2023",
				"user@123", "junit@test.com", 0, roles);
		
		ResponseEntity<?> response = authController.registerUser(signUpRequest);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());

		Optional<EmployeeMaster> findEmp2 = employeeMasterRepo.findByEmail("junit@test.com");
		
		assertEquals(false,findEmp2.isEmpty());
		
		employeeService.deleteEmployee(findEmp2.get().getId());
		
	}
	
	@Test
	public void testItemCreation() {
		
		ItemPayload item =  new ItemPayload("chair", "description", 0, "wood", "Furniture", 10000);
		
		ResponseEntity<?> response = itemService.createItem(item);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		ItemMaster itemres = (ItemMaster) response.getBody();
		
		Optional<ItemMaster> itemOptional = itemMasterRepo.findById(itemres.getId());
		
		assertEquals(false,itemOptional.isEmpty());
		
		itemService.deleteItem(itemOptional.get().getId());
	}
	
	@Test
	public void testLoanCreation() {
		
		LoanPayload loan =  new LoanPayload("Furniture", 5);
		
		ResponseEntity<?> response = loanServices.createLoan(loan);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		LoanCardMaster loanres = (LoanCardMaster) response.getBody();
		
		Optional<LoanCardMaster> loanOptional = loanCardRepo.findById(loanres.getId());
		
		assertEquals(false, loanOptional.isEmpty());
		
		loanServices.deleteLoan(loanOptional.get().getId());
	}

}
