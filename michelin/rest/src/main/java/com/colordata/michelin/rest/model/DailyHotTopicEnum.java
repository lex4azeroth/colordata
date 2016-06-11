package com.colordata.michelin.rest.model;

public enum DailyHotTopicEnum {
	BBS(5),
	ZHIDAO(4),
	ZHIHU(3),
	WEIBO(2),
	WECHAT(1);
	
	private int id;
	
	public int getId() {
		return this.id;
	}
	
	DailyHotTopicEnum(int id) {
		this.id = id;
	}
	
	
	
}
