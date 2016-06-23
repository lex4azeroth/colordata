package com.colordata.michelin.rest.model;

import java.util.List;

public class IWOMTopic {

	private List<String> names;
	private List<Integer> counts;
	public List<String> getNames() {
		return names;
	}
	public void setNames(List<String> names) {
		this.names = names;
	}
	public List<Integer> getCounts() {
		return counts;
	}
	public void setCounts(List<Integer> counts) {
		this.counts = counts;
	}
}
