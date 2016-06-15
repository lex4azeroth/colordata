package com.colordata.michelin.rest.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class IssuePlatform implements Serializable {

	/**
	 * Issue platform data model
	 */
	private static final long serialVersionUID = 1208191419234485894L;

	private List<String> platform;
	private List<Integer> cnt;
	private List<BigDecimal> percent;
	private List<ValueNamePair> pairs;
	
	public List<String> getPlatform() {
		return platform;
	}
	public void setPlatform(List<String> platform) {
		this.platform = platform;
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
