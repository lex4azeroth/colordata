package com.colordata.michelin.rest.model;

import java.io.Serializable;

public class Report implements Serializable {

	/**
	 * Report data model
	 */
	private static final long serialVersionUID = 8135256822095461786L;
	
	private String rank;
	private String issueCategory;
	private String issue;
	private String productInvovled;
	private String grade;
	private String pvReplies;
	private String postDate;
	private String site;
	private String forun;
	private String authorName;
	private String title;
	private String forumUrl;
	
	public String getRank() {
		return rank;
	}
	public void setRank(String rank) {
		this.rank = rank;
	}
	public String getIssueCategory() {
		return issueCategory;
	}
	public void setIssueCategory(String issueCategory) {
		this.issueCategory = issueCategory;
	}
	public String getIssue() {
		return issue;
	}
	public void setIssue(String issue) {
		this.issue = issue;
	}
	public String getProductInvovled() {
		return productInvovled;
	}
	public void setProductInvovled(String productInvovled) {
		this.productInvovled = productInvovled;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getPvReplies() {
		return pvReplies;
	}
	public void setPvReplies(String pvReplies) {
		this.pvReplies = pvReplies;
	}
	public String getPostDate() {
		return postDate;
	}
	public void setPostDate(String postDate) {
		this.postDate = postDate;
	}
	public String getSite() {
		return site;
	}
	public void setSite(String site) {
		this.site = site;
	}
	public String getForun() {
		return forun;
	}
	public void setForun(String forun) {
		this.forun = forun;
	}
	public String getAuthorName() {
		return authorName;
	}
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getForumUrl() {
		return forumUrl;
	}
	public void setForumUrl(String forumUrl) {
		this.forumUrl = forumUrl;
	}

}
