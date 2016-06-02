package com.colordata.michelin.rest.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public class IssueGrade implements Serializable {

	/**
	 * Issue grade data model
	 */
	private static final long serialVersionUID = 5706187189165321560L;

	private List<String> issueGrade;
	private List<Integer> cnt;
	private List<BigDecimal> percent;
	private List<ValueNamePair> pairs;
	
	public List<String> getIssueGrade() {
		return issueGrade;
	}
	public void setIssueGrade(List<String> issueGrade) {
		this.issueGrade = issueGrade;
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
	public void setPair(List<ValueNamePair> pair) {
		this.pairs = pair;
	}
}
