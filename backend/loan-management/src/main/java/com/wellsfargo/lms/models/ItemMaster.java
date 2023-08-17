package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "item_master")
public class ItemMaster {
	@Id
	@Column(name = "item_id")
	@NotNull
	private String id;
	
	@Column(name = "item_description")
	@NotNull
	private String description;
	
	@Column(name = "issuse_status")
	@NotNull
	private int issueStatus;
	
	@Column(name = "item_make")
	@NotNull
	private String itemMake;
	
	@Column(name = "item_category")
	@NotNull
	private String category;
	
	@Column(name="item_name")
	@NotNull
	private String itemName;
	
	@Column(name = "item_valuation")
	@NotNull
	private int valuation;

	public ItemMaster() {
		super();
	}

	public ItemMaster(String itemName, String description, int issuse_status, String item_make, String category,
			int valuation) {
		super();
		String[] str = UUID.randomUUID().toString().split("-");
		this.id = str[0];
		this.itemName = itemName;
		this.description = description;
		this.issueStatus = issuse_status;
		this.itemMake = item_make;
		this.category = category;
		this.valuation = valuation;
	}


}
