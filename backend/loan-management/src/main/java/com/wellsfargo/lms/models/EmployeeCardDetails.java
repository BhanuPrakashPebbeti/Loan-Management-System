package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employee_card_details")
public class EmployeeCardDetails {

	@Id
	@Column(name="card_id")
	private String cardId;
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="employee_id")
	private EmployeeMaster employee;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="loan_id")
	private LoanCardMaster loanId;
	
	@Column(name = "card_issue_date")
	private String issueDate;
	
	
	@Column(name = "item_id")
	private String itemId;
	
	@Column(name = "approval_status")
	private int approvalStatus;



	public EmployeeCardDetails(EmployeeMaster employee, LoanCardMaster loan_id, String issuse_date, String item_id,
			int approval_status) {
		super();
		this.cardId = UUID.randomUUID().toString();
		this.employee = employee;
		this.loanId = loan_id;
		this.issueDate = issuse_date;
		this.itemId = item_id;
		this.approvalStatus = approval_status;
	}

	

	
	
	

}
