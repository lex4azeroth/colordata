package com.colordata.michelin.rest.model;

import java.io.Serializable;

public class ValueNamePair implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3890119870677070686L;
	
	private int value;
	private String name;
		
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
