package com.colordata.michelin.rest.impl;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.colordata.michelin.rest.model.IssueBreakdown;
import com.colordata.michelin.rest.model.IssueCategory;
import com.colordata.michelin.rest.model.IssueGrade;
import com.colordata.michelin.rest.model.IssuePlatform;
import com.colordata.michelin.rest.model.Report;
import com.colordata.michelin.rest.model.ValueNamePair;
import com.colordata.michelin.rest.model.WeeklyIssueTrend;

@Path("/dailyguardian")
@RequestScoped
@Stateful
public class DailyGuardianRestFul {

	@GET
	@Path("/report/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Report> getReport(@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<Report> reports = new ArrayList<Report>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("Report from " + start + " to " + end);
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianReport(?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				Report report = new Report();
				report.setRank(rs.getString("Rank"));
				report.setIssueCategory(rs.getString("Issue Category"));
				report.setIssue(rs.getString("Issue"));
				report.setProductInvovled(rs.getString("Product invovled"));
				report.setGrade(rs.getString("Grade"));
				report.setPvReplies(rs.getString("PV/Replies"));
				report.setPostDate(rs.getString("Post Date"));
				report.setSite(rs.getString("Site"));
				report.setForun(rs.getString("Forum"));
				report.setAuthorName(rs.getString("AuthorName"));
				report.setTitle(rs.getString("Title"));
				report.setForumUrl(rs.getString("URL"));
				reports.add(report);
			}
		} catch (SQLException ex) {
			
		}

		return reports;
	}
	
	@GET
	@Path("/issuebreakdown/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public IssueBreakdown getIssueBreakdown(@PathParam("start") String start, 
			@PathParam("end") String end) {
		IssueBreakdown issueBreakdown = new IssueBreakdown();
		Connection conn = SqlServerConnectionService.getConn();
		List<String> issueBreakdowns = new ArrayList<String>();
		List<Integer> cnt = new ArrayList<Integer>();
		List<BigDecimal> percent = new ArrayList<BigDecimal>();
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianProductIssueBreakdown(?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				String grade = rs.getString("ProductIssueBreakdown");
				issueBreakdowns.add(grade);
				
				int count = rs.getInt("Cnt");
				cnt.add(count);
				
				ValueNamePair pair = new ValueNamePair();
				pair.setName(grade);
				pair.setValue(count);
				pairs.add(pair);
				
				percent.add(rs.getBigDecimal("Percent"));
			}
		} catch (SQLException ex) {
			
		}
		
		issueBreakdown.setBreakdown(issueBreakdowns);
		issueBreakdown.setCnt(cnt);
		issueBreakdown.setPair(pairs);
		issueBreakdown.setPercent(percent);
		return issueBreakdown;
	}
	
	@GET
	@Path("/issuecategory/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public IssueCategory getIssueCategory(@PathParam("start") String start, 
			@PathParam("end") String end) {
		IssueCategory issueCategory = new IssueCategory();
		Connection conn = SqlServerConnectionService.getConn();
		List<String> issueGrades = new ArrayList<String>();
		List<Integer> cnt = new ArrayList<Integer>();
		List<BigDecimal> percent = new ArrayList<BigDecimal>();
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianIssueCategory(?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				String grade = rs.getString("IssueCategory");
				issueGrades.add(grade);
				
				int count = rs.getInt("Cnt");
				cnt.add(count);
				
				ValueNamePair pair = new ValueNamePair();
				pair.setName(grade);
				pair.setValue(count);
				pairs.add(pair);
				
				percent.add(rs.getBigDecimal("Percent"));
			}
		} catch (SQLException ex) {
			
		}
		
		issueCategory.setCategory(issueGrades);
		issueCategory.setCnt(cnt);
		issueCategory.setPair(pairs);
		issueCategory.setPercent(percent);
		return issueCategory;
	}
	
	@GET
	@Path("/issuegrade/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public IssueGrade getIssueGrade(@PathParam("start") String start, 
			@PathParam("end") String end) {
		IssueGrade issueGrade = new IssueGrade();
		Connection conn = SqlServerConnectionService.getConn();
		List<String> issueGrades = new ArrayList<String>();
		List<Integer> cnt = new ArrayList<Integer>();
		List<BigDecimal> percent = new ArrayList<BigDecimal>();
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianIssueGrade(?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				String grade = rs.getString("IssueGrade");
				issueGrades.add(grade);
				
				int count = rs.getInt("Cnt");
				cnt.add(count);
				
				ValueNamePair pair = new ValueNamePair();
				pair.setName(grade);
				pair.setValue(count);
				pairs.add(pair);
				
				percent.add(rs.getBigDecimal("Percent"));
			}
		} catch (SQLException ex) {
			
		}
		
		issueGrade.setIssueGrade(issueGrades);
		issueGrade.setCnt(cnt);
		issueGrade.setPair(pairs);
		issueGrade.setPercent(percent);
		return issueGrade;
	}
	
    @GET
    @Path("/issueplatform/{start}/{end}")
    @Produces(MediaType.APPLICATION_JSON)
    public IssuePlatform getIssuePlatform(@PathParam("start") String start, 
    		@PathParam("end") String end) {
    	IssuePlatform issuePlatform = new IssuePlatform();
    	Connection conn = SqlServerConnectionService.getConn();
    	List<String> platforms = new ArrayList<String>();
    	List<Integer> cnt = new ArrayList<Integer>();
    	List<BigDecimal> percent = new ArrayList<BigDecimal>();
    	List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
    	try{
    		CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianIssuePlatform(?,?) }");
	        c.setDate(1, Date.valueOf(start));
	        c.setDate(2, Date.valueOf(end));
         
	        ResultSet rs = c.executeQuery();
	        
	        while (rs.next()) {
	        	
	        	String platform = rs.getString("Platform");
	        	platforms.add(platform);
	        	
	        	int count = rs.getInt("Cnt");
	        	cnt.add(count);
	        	
	        	ValueNamePair pair = new ValueNamePair();
	        	pair.setName(platform);
	        	pair.setValue(count);
	        	pairs.add(pair);
	        	
	        	percent.add(rs.getBigDecimal("Percent"));
	        }
	        c.close();
    	} catch (SQLException ex) {
    		
    	}
    	
    	issuePlatform.setPlatform(platforms);
    	issuePlatform.setCnt(cnt);
    	issuePlatform.setPercent(percent);
    	issuePlatform.setPair(pairs);
    	
    	return issuePlatform;
    }
    
    @GET
    @Path("/weeklyissuetrend/{start}/{end}")
    @Produces(MediaType.APPLICATION_JSON)
    public WeeklyIssueTrend getWeeklyIssueTrend(@PathParam("start") String start, 
    		@PathParam("end") String end) {
    	Connection conn = SqlServerConnectionService.getConn();
    	WeeklyIssueTrend wiTrend = new WeeklyIssueTrend();
    	List<String> dates = new ArrayList<String>();
    	List<Integer> nagetiveIssue = new ArrayList<Integer>();
    	List<Integer> crisisIssue = new ArrayList<Integer>();
    	CallableStatement c = null;
		try {
			c = conn.prepareCall("{call mi.getDailyGuardianWeeklyIssueTrend(?,?) }");
	        
	        c.setDate(1, Date.valueOf(start));
	        c.setDate(2, Date.valueOf(end));
         
	        ResultSet rs = c.executeQuery();
	        
	        while (rs.next()) {
	        	Date date = rs.getDate("Date");
	        	dates.add(date.toString());
	        	int negativeCnt=rs.getInt("NegativeCnt");
	        	nagetiveIssue.add(negativeCnt);
	        	int crisisCnt = rs.getInt("CrisisCnt");
	        	crisisIssue.add(crisisCnt);
	        	System.out.println(
	        			String.format("Data retrieved, [%1$s, %2$d, %3$d]", date.toString(), negativeCnt, crisisCnt));
	        }
	        c.close();
		} catch (SQLException ex) {
			
		}
		
		wiTrend.setDates(dates);
		wiTrend.setNegativeIssue(nagetiveIssue);
		wiTrend.setCrisisIssue(crisisIssue);
    	
    	return wiTrend;
    }

}
