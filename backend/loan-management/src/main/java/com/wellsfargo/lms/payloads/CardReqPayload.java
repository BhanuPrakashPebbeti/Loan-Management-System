package com.wellsfargo.lms.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardReqPayload {
	
	private String employee_id;
	private String item_id;
	private String loan_id;
}
