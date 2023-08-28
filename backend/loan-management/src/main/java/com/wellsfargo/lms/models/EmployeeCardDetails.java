package com.wellsfargo.lms.models;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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
	private LoanCardMaster loan;
	
	@Column(name = "card_issue_date")
	@NotNull
	private String issueDate;
	
	
//	@Column(name = "item_id")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "item_id")
	@NotNull
	private ItemMaster item;
	
	@Column(name = "approval_status")
	@NotNull
	@ColumnDefault("0")
	private int approvalStatus;



	public EmployeeCardDetails(EmployeeMaster employee, LoanCardMaster loan_id, String issuse_date, ItemMaster item_id,
			int approval_status) {
		super();
		this.cardId = UUID.randomUUID().toString();
		this.employee = employee;
		this.loan = loan_id;
		this.issueDate = issuse_date;
		this.item = item_id;
		this.approvalStatus = approval_status;
	}



	public EmployeeCardDetails(@NotNull EmployeeMaster employee, @NotNull LoanCardMaster loanId,
			@NotNull ItemMaster itemId) {
		super();
		String[] str = UUID.randomUUID().toString().split("-");
		this.cardId = str[0];
		LocalDate currentDate = LocalDate.now();

        // Define a formatter to format the date as a string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Format the date as a string
        String dateString = currentDate.format(formatter);
		this.issueDate = dateString;
		this.employee = employee;
		this.loan = loanId;
		this.item = itemId;
		this.approvalStatus = 0;
		
	}

	

	
	
	

}
