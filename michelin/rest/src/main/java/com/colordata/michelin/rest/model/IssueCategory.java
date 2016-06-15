package com.colordata.michelin.rest.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public class IssueCategory implements Serializable {

	/**
	 * Issue category data model
	 */
	private static final long serialVersionUID = 736187007669239003L;
	
	private List<String> category;
	private List<Integer> cnt;
	private List<BigDecimal> percent;
	private List<ValueNamePair> pairs;
	
	public List<String> getCategory() {
		return category;
	}
	public void setCategory(List<String> category) {
		this.category = category;
	}
	public List<Integer> getCnt() {
		return cnt;
	}
	public void setCnt(List<Integer> cnt) {
		this.cnt = cnt;
	}
	public List<BigDecimal> getPercent() {
		return percent;
	}
	public void setPercent(List<BigDecimal> percent) {
		this.percent = percent;
	}
	public List<ValueNamePair> getPair() {
		return pairs;
	}
	public void setPair(List<ValueNamePair> pairs) {
		this.pairs = pairs;
	}

}
