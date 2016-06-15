package com.colordata.michelin.rest.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public class IssueBreakdown implements Serializable {

	/**
	 * Issue breakdown data model
	 */
	private static final long serialVersionUID = -4088952525728834951L;
	
	private List<String> breakdown;
	private List<Integer> cnt;
	private List<BigDecimal> percent;
	private List<ValueNamePair> pairs;
	
	public List<String> getBreakdown() {
		return breakdown;
	}
	public void setBreakdown(List<String> breakdown) {
		this.breakdown = breakdown;
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
