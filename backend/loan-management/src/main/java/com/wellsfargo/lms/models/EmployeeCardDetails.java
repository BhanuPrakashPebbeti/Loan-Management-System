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
	private String card_id;
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="employee_id")
	private EmployeeMaster employee;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="loan_id")
	private LoanCardMaster loan_id;
	
	@Column(name = "card_issue_date")
	private String issue_date;
	
	
	@Column(name = "item_id")
	private String item_id;
	
	@Column(name = "approval_status")
	private int approval_status;



	public EmployeeCardDetails(EmployeeMaster employee, LoanCardMaster loan_id, String issuse_date, String item_id,
			int approval_status) {
		super();
		this.card_id = UUID.randomUUID().toString();
		this.employee = employee;
		this.loan_id = loan_id;
		this.issue_date = issuse_date;
		this.item_id = item_id;
		this.approval_status = approval_status;
	}

	

	
	
	

}
