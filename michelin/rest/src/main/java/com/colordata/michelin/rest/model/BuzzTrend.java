package com.colordata.michelin.rest.model;

import java.util.List;
import java.util.Map;

public class BuzzTrend {
	private List<String> date;
	private List<String> brand;
	private List<String> prouduct;
	private Map<String, List<Integer>> brandCountPair;
	public List<String> getDate() {
		return date;
	}
	public void setDate(List<String> date) {
		this.date = date;
	}
	public Map<String, List<Integer>> getBrandCountPair() {
		return brandCountPair;
	}
	public void setBrandCountPair(Map<String, List<Integer>> brandCountPair) {
		this.brandCountPair = brandCountPair;
	}
	public List<String> getBrand() {
		return brand;
	}
	public void setBrand(List<String> brand) {
		this.brand = brand;
	}
	public List<String> getProuduct() {
		return prouduct;
	}
	public void setProuduct(List<String> prouduct) {
		this.prouduct = prouduct;
	}
}
