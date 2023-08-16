package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employee_issue_details")
public class EmployeeIssueDetails {
	@Id
	@Column(name = "issue_id")
	private String id;
	
	@Column(name = "employee_id")
	private String employeeId;
	
	@Column(name = "item_id")
	private String itemId;
	
	@Column(name = "issue_date")
	private String issueDate;
	
	@Column(name = "return_date")
	private String returnDate;

	public EmployeeIssueDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmployeeIssueDetails( String employee_id, String item_id, String issue_date, String return_date) {
		super();
		this.id = UUID.randomUUID().toString();
		this.employeeId = employee_id;
		this.itemId = item_id;
		this.issueDate = issue_date;
		this.returnDate = return_date;
	}

	

}
