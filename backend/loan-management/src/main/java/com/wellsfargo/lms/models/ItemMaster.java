package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
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
	private String issueStatus;
	
	@Column(name = "item_make")
	@NotNull
	private String itemMake;
	
	@Column(name = "item_category")
	@NotNull
	private String category;
	
	@Column(name = "item_valuation")
	@NotNull
	private int valuation;

	public ItemMaster() {
		super();
	}

	public ItemMaster(String description, String issuse_status, String item_make, String category,
			int valuation) {
		super();
		this.id = UUID.randomUUID().toString();
		this.description = description;
		this.issueStatus = issuse_status;
		this.itemMake = item_make;
		this.category = category;
		this.valuation = valuation;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getIssuse_status() {
		return issueStatus;
	}

	public void setIssuse_status(String issuse_status) {
		this.issueStatus = issuse_status;
	}

	public String getItem_make() {
		return itemMake;
	}

	public void setItem_make(String item_make) {
		this.itemMake = item_make;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getValuation() {
		return valuation;
	}

	public void setValuation(int valuation) {
		this.valuation = valuation;
	}
}
