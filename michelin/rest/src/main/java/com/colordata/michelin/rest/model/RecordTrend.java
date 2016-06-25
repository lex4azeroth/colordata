package com.colordata.michelin.rest.model;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class RecordTrend {
	private List<String> date;
	private List<String> brand;
	private List<String> product;
	private Map<String, List<BigDecimal>> brandRaitoPair;
	public List<String> getDate() {
		return date;
	}
	public void setDate(List<String> date) {
		this.date = date;
	}
	public List<String> getBrand() {
		return brand;
	}
	public void setBrand(List<String> brand) {
		this.brand = brand;
	}
	public Map<String, List<BigDecimal>> getBrandRaitoPair() {
		return brandRaitoPair;
	}
	public void setBrandRaitoPair(Map<String, List<BigDecimal>> brandRaitoPair) {
		this.brandRaitoPair = brandRaitoPair;
	}
	public List<String> getProduct() {
		return product;
	}
	public void setProduct(List<String> product) {
		this.product = product;
	}
}
