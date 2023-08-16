package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

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
	@NotNull
	private String cardId;
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="employee_id")
	@NotNull
	private EmployeeMaster employee;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="loan_id")
	@NotNull
	private LoanCardMaster loanId;
	
	@Column(name = "card_issue_date")
	@NotNull
	private String issueDate;
	
	
//	@Column(name = "item_id")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "item_id")
	@NotNull
	private ItemMaster itemId;
	
	@Column(name = "approval_status")
	@NotNull
	@ColumnDefault("0")
	private int approvalStatus;



	public EmployeeCardDetails(EmployeeMaster employee, LoanCardMaster loan_id, String issuse_date, ItemMaster item_id,
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
