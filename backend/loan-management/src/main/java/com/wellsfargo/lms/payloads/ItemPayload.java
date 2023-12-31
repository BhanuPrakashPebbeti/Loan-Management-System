package com.wellsfargo.lms.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemPayload {

private String itemName;
	
	private String description;

	private int issueStatus;

	private String itemMake;

	private String category;

	private int valuation;
	
}
