package com.wellsfargo.lms;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.hibernate.hql.spi.id.inline.AbstractInlineIdsBulkIdHandler;
import org.hibernate.service.spi.InjectService;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.event.annotation.AfterTestClass;

import com.wellsfargo.lms.controllers.AuthController;
import com.wellsfargo.lms.controllers.ItemController;
import com.wellsfargo.lms.models.EmployeeCardDetails;
import com.wellsfargo.lms.models.EmployeeIssueDetails;
import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.models.LoanCardMaster;
import com.wellsfargo.lms.payloads.ItemPayload;
import com.wellsfargo.lms.payloads.LoanPayload;
import com.wellsfargo.lms.payloads.SignUpRequest;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;
import com.wellsfargo.lms.repositories.ItemMasterRepo;
import com.wellsfargo.lms.repositories.LoanCardRepo;
import com.wellsfargo.lms.services.EmployeeCardService;
import com.wellsfargo.lms.services.EmployeeIssueService;
import com.wellsfargo.lms.services.EmployeeService;
import com.wellsfargo.lms.services.ItemService;
import com.wellsfargo.lms.services.LoanServices;

@ExtendWith(MockitoExtension.class)
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
	
	@Autowired
	EmployeeCardService employeeCardService;
	
	@Autowired
	EmployeeIssueService employeeIssueService;
	
	@Mock
	ItemMasterRepo itemMasterRepoMock;
	
	@InjectMocks
	ItemService itemServiceMock;
	
	@Mock
	LoanCardRepo loanCardRepoMock;
	
	@InjectMocks
	LoanServices loanServicesMock;
	
	
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
		
		ItemMaster itemMaster = new ItemMaster("chair", "description", 0, "wood", "Furniture", 10000);
		
		Mockito.lenient().when(itemMasterRepoMock.save(itemMaster)).thenReturn(itemMaster);
		
		ResponseEntity<?> response = itemServiceMock.createItem(item);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());

	}
	
	@Test
	public void testLoanCreation() {
		
		LoanPayload loan =  new LoanPayload("Furniture", 5);
		
		LoanCardMaster loanCardMaster = new LoanCardMaster("Furniture", 5);
		
		Mockito.lenient().when(loanCardRepoMock.save(loanCardMaster)).thenReturn(loanCardMaster);
		
		ResponseEntity<?> response = loanServicesMock.createLoan(loan);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
	}
	
	@Test
	public void testCardIsuue() {
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

		findEmp = employeeMasterRepo.findByEmail("junit@test.com");
		
		assertEquals(false,findEmp.isEmpty());
		
		String eId = (findEmp.get().getId());
		
		ItemPayload item =  new ItemPayload("chair", "description", 0, "wood", "Furniture", 10000);

		response = itemService.createItem(item);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		ItemMaster itemres = (ItemMaster) response.getBody();
		
		String itemId = itemres.getId();
		
		ItemPayload item2 =  new ItemPayload("chair", "description", 1, "wood", "Furniture", 10000);

		response = itemService.createItem(item2);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		ItemMaster itemres2 = (ItemMaster) response.getBody();
		
		String itemId2 = itemres2.getId();
		
		LoanPayload loan =  new LoanPayload("Furniture", 5);
		
		response = loanServices.createLoan(loan);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		LoanCardMaster loanres = (LoanCardMaster) response.getBody();
		
		String loanId = loanres.getId();
		
		LoanPayload loan2 =  new LoanPayload("Other", 10);
		
		response = loanServices.createLoan(loan2);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		LoanCardMaster loanres2 = (LoanCardMaster) response.getBody();
		
		String loanId2 = loanres2.getId();
		
		response = employeeCardService.createEmployeeCard(eId, loanId, itemId);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		// Check for already issued item
		response = employeeCardService.createEmployeeCard(eId, loanId, itemId2);
		
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		
		// Check for loan type mismatch
		response = employeeCardService.createEmployeeCard(eId, loanId2, itemId);
		
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		
		ResponseEntity<?> cardDetails = employeeCardService.getCardByEmployee(eId);
		
		assertEquals(HttpStatus.OK, cardDetails.getStatusCode());
		
		employeeService.deleteEmployee(findEmp.get().getId());
		
		loanServices.deleteLoan(loanId);
		
		loanServices.deleteLoan(loanId2);
	}
	
	@Test
	public void testCardApproval() {
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

		findEmp = employeeMasterRepo.findByEmail("junit@test.com");
		
		assertEquals(false,findEmp.isEmpty());
		
		String eId = (findEmp.get().getId());
		
		ItemPayload item =  new ItemPayload("chair", "description", 0, "wood", "Furniture", 10000);

		response = itemService.createItem(item);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		ItemMaster itemres = (ItemMaster) response.getBody();
		
		String itemId = itemres.getId();
		
		LoanPayload loan =  new LoanPayload("Furniture", 5);
		
		response = loanServices.createLoan(loan);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		LoanCardMaster loanres = (LoanCardMaster) response.getBody();
		
		String loanId = loanres.getId();
		
		response = employeeCardService.createEmployeeCard(eId, loanId, itemId);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		ResponseEntity<?> cardDetails = employeeCardService.getCardByEmployee(eId);
		
		assertEquals(HttpStatus.OK, cardDetails.getStatusCode());
		
		List<EmployeeCardDetails> employeeCardDetails = (List<EmployeeCardDetails>) cardDetails.getBody();
		
		String cardId = employeeCardDetails.get(0).getCardId();

		response = employeeIssueService.approveLoan(cardId);
		
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		EmployeeCardDetails card = employeeCardService.getCardById(cardId).get();
		
		// Check if loan is approved
		assertEquals(1, card.getApprovalStatus());
		
		ItemMaster item2 = card.getItem();
		
		// Check if item is issued
		assertEquals(1, item2.getIssueStatus());
		
		response = employeeIssueService.approveLoan(cardId);
		
		// Check already approved card
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		
		employeeService.deleteEmployee(findEmp.get().getId());
		
		loanServices.deleteLoan(loanId);
	}

}
