package com.colordata.michelin.rest.model;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class WeeklyIssueTrend implements Serializable {
	
	/**
	 * WeeklyIssuTrend data model
	 */
	private static final long serialVersionUID = -4941379194183071781L;
	private List<String> dates;
	private List<Integer> negativeIssue;
	private List<Integer> crisisIssue;
	
	
	public List<String> getDates() {
		return dates;
	}
	public void setDates(List<String> dates) {
		this.dates = dates;
	}
	public List<Integer> getNegativeIssue() {
		return negativeIssue;
	}
	public void setNegativeIssue(List<Integer> negativeIssue) {
		this.negativeIssue = negativeIssue;
	}
	public List<Integer> getCrisisIssue() {
		return crisisIssue;
	}
	public void setCrisisIssue(List<Integer> crisisIssue) {
		this.crisisIssue = crisisIssue;
	}
}
