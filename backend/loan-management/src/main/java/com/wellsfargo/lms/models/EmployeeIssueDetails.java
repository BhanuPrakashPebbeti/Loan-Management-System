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
	private String employee_id;
	
	@Column(name = "item_id")
	private String item_id;
	
	@Column(name = "issue_date")
	private String issue_date;
	
	@Column(name = "return_date")
	private String return_date;

	public EmployeeIssueDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmployeeIssueDetails( String employee_id, String item_id, String issue_date, String return_date) {
		super();
		this.id = UUID.randomUUID().toString();
		this.employee_id = employee_id;
		this.item_id = item_id;
		this.issue_date = issue_date;
		this.return_date = return_date;
	}

	

}
