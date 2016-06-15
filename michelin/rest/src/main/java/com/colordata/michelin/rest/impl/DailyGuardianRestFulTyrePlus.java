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

import com.colordata.michelin.rest.model.FilterChannel;
import com.colordata.michelin.rest.model.FilterIssueCategory_Tyreplus;
import com.colordata.michelin.rest.model.FilterIssueGrade;
import com.colordata.michelin.rest.model.IssueBreakdown;
import com.colordata.michelin.rest.model.IssueCategory;
import com.colordata.michelin.rest.model.IssueGrade;
import com.colordata.michelin.rest.model.IssuePlatform;
import com.colordata.michelin.rest.model.Report;
import com.colordata.michelin.rest.model.ValueNamePair;
import com.colordata.michelin.rest.model.WeeklyIssueTrend;

@Path("/dailyguardiantyreplus")
@RequestScoped
@Stateful
public class DailyGuardianRestFulTyrePlus {

	
	@GET
	@Path("FilterIssueGrade_TyrePlus")
	@Produces(MediaType.APPLICATION_JSON)
	public List<FilterIssueGrade> getIssueGrade() {
		List<FilterIssueGrade> issueGrades = new ArrayList<FilterIssueGrade>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIssueGrade_tyreplus");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianDimIssueGrade() }");
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				FilterIssueGrade IssueGrade = new FilterIssueGrade();
				IssueGrade.setIssueGrade(rs.getString("IssueGrade"));
				IssueGrade.setIssueGradeID(rs.getInt("IssueGradeID"));
				issueGrades.add(IssueGrade);
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return issueGrades;				
	}
	
	@GET
	@Path("Channel_TyrePlus")
	@Produces(MediaType.APPLICATION_JSON)
	public List<FilterChannel> getChannel() {
		List<FilterChannel> Channels = new ArrayList<FilterChannel>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getChannel_tyreplus");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianDimChannel()}");
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				FilterChannel Channel = new FilterChannel();
				Channel.setChannel(rs.getString("Channel"));
				Channel.setChannelID(rs.getInt("ChannelID"));
				Channels.add(Channel);
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return Channels;				
	}
	
	@GET
	@Path("IssueCategory_Tyreplus")
	@Produces(MediaType.APPLICATION_JSON)
	public List<FilterIssueCategory_Tyreplus> getIssueCategory_Tyreplus() {
		List<FilterIssueCategory_Tyreplus>IssueCategories_Tyreplus  = new ArrayList<FilterIssueCategory_Tyreplus>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("IssueCategory_Tyreplus");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianDimIssueCategory_TyrePlus()}");
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				FilterIssueCategory_Tyreplus IssueCategory_Tyreplus = new FilterIssueCategory_Tyreplus();
				IssueCategory_Tyreplus.setIssueCategory(rs.getString("IssueCategory"));
				IssueCategory_Tyreplus.setIssueCategoryID(rs.getInt("IssueCategoryID"));
				IssueCategories_Tyreplus.add(IssueCategory_Tyreplus);
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return IssueCategories_Tyreplus;				
	}
	
	
	
	@GET
	@Path("/reportdgtyreplus/{start}/{end}/{FilterIssueGrade_TyrePlus}/{Channel_TyrePlus}/{IssueCategory_Tyreplus}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Report> getReport(@PathParam("start") String start, 
			@PathParam("end") String end, 	@PathParam("FilterIssueGrade_TyrePlus") String FilterIssueGrade_TyrePlus , @PathParam("Channel_TyrePlus") String Channel_TyrePlus,  @PathParam("IssueCategory_Tyreplus") String IssueCategory_Tyreplus) {
		List<Report> reports = new ArrayList<Report>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("Report from " + start + " to " + end);
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianReport_TyrePlus(?,?,?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setString(3, String.valueOf(FilterIssueGrade_TyrePlus));
			c.setString(4, String.valueOf(Channel_TyrePlus));
			c.setString(5, String.valueOf(IssueCategory_Tyreplus));
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
	@Path("/issuebreakdowndgtyreplus/{start}/{end}/{FilterIssueGrade_TyrePlus}/{Channel_TyrePlus}/{IssueCategory_Tyreplus}")
	@Produces(MediaType.APPLICATION_JSON)
	public IssueBreakdown getIssueBreakdown(@PathParam("start") String start, 
			@PathParam("end") String end ,	@PathParam("FilterIssueGrade_TyrePlus") String FilterIssueGrade_TyrePlus , @PathParam("Channel_TyrePlus") String Channel_TyrePlus,  @PathParam("IssueCategory_Tyreplus") String IssueCategory_Tyreplus) {
		IssueBreakdown issueBreakdown = new IssueBreakdown();
		Connection conn = SqlServerConnectionService.getConn();
		List<String> issueBreakdowns = new ArrayList<String>();
		List<Integer> cnt = new ArrayList<Integer>();
		List<BigDecimal> percent = new ArrayList<BigDecimal>();
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianProductIssueBreakdown(?,?,?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setString(3, String.valueOf(FilterIssueGrade_TyrePlus));
			c.setString(4, String.valueOf(Channel_TyrePlus));
			c.setString(5, String.valueOf(IssueCategory_Tyreplus));
			
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
	@Path("/issuecategorydgtyreplus/{start}/{end}/{FilterIssueGrade_TyrePlus}/{Channel_TyrePlus}/{IssueCategory_Tyreplus}")
	@Produces(MediaType.APPLICATION_JSON)
	public IssueCategory getIssueCategory(@PathParam("start") String start, 
			@PathParam("end") String end ,	@PathParam("FilterIssueGrade_TyrePlus") String FilterIssueGrade_TyrePlus , @PathParam("Channel_TyrePlus") String Channel_TyrePlus,  @PathParam("IssueCategory_Tyreplus") String IssueCategory_Tyreplus) {
		IssueCategory issueCategory = new IssueCategory();
		Connection conn = SqlServerConnectionService.getConn();
		List<String> issueGrades = new ArrayList<String>();
		List<Integer> cnt = new ArrayList<Integer>();
		List<BigDecimal> percent = new ArrayList<BigDecimal>();
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianIssueCategory_TyrePlus(?,?,?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setString(3, String.valueOf(FilterIssueGrade_TyrePlus));
			c.setString(4, String.valueOf(Channel_TyrePlus));
			c.setString(5, String.valueOf(IssueCategory_Tyreplus));
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
	@Path("/issuegradedgtyreplus/{start}/{end}/{FilterIssueGrade_TyrePlus}/{Channel_TyrePlus}/{IssueCategory_Tyreplus}")
	@Produces(MediaType.APPLICATION_JSON)
	public IssueGrade getIssueGrade(@PathParam("start") String start, 
			@PathParam("end") String end ,	@PathParam("FilterIssueGrade_TyrePlus") String FilterIssueGrade_TyrePlus , @PathParam("Channel_TyrePlus") String Channel_TyrePlus,  @PathParam("IssueCategory_Tyreplus") String IssueCategory_Tyreplus) {
		IssueGrade issueGrade = new IssueGrade();
		Connection conn = SqlServerConnectionService.getConn();
		List<String> issueGrades = new ArrayList<String>();
		List<Integer> cnt = new ArrayList<Integer>();
		List<BigDecimal> percent = new ArrayList<BigDecimal>();
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianIssueGrade_TyrePlus(?,?,?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setString(3, String.valueOf(FilterIssueGrade_TyrePlus));
			c.setString(4, String.valueOf(Channel_TyrePlus));
			c.setString(5, String.valueOf(IssueCategory_Tyreplus));
			
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
    @Path("/issueplatformdgtyreplus/{start}/{end}/{FilterIssueGrade_TyrePlus}/{Channel_TyrePlus}/{IssueCategory_Tyreplus}")
    @Produces(MediaType.APPLICATION_JSON)
    public IssuePlatform getIssuePlatform(@PathParam("start") String start, 
    		@PathParam("end") String end ,	@PathParam("FilterIssueGrade_TyrePlus") String FilterIssueGrade_TyrePlus , @PathParam("Channel_TyrePlus") String Channel_TyrePlus,  @PathParam("IssueCategory_Tyreplus") String IssueCategory_Tyreplus) {
    	IssuePlatform issuePlatform = new IssuePlatform();
    	Connection conn = SqlServerConnectionService.getConn();
    	List<String> platforms = new ArrayList<String>();
    	List<Integer> cnt = new ArrayList<Integer>();
    	List<BigDecimal> percent = new ArrayList<BigDecimal>();
    	List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
    	try{
    		CallableStatement c = conn.prepareCall("{call mi.getDailyGuardianIssuePlatform_TyrePlus(?,?,?,?,?) }");
	        c.setDate(1, Date.valueOf(start));
	        c.setDate(2, Date.valueOf(end));
			c.setString(3, String.valueOf(FilterIssueGrade_TyrePlus));
			c.setString(4, String.valueOf(Channel_TyrePlus));
			c.setString(5, String.valueOf(IssueCategory_Tyreplus));
			
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
    @Path("/weeklyissuetrenddgtyreplus/{start}/{end}/{FilterIssueGrade_TyrePlus}/{Channel_TyrePlus}/{IssueCategory_Tyreplus}")
    @Produces(MediaType.APPLICATION_JSON)
    public WeeklyIssueTrend getWeeklyIssueTrend(@PathParam("start") String start, 
    		@PathParam("end") String end ,	@PathParam("FilterIssueGrade_TyrePlus") String FilterIssueGrade_TyrePlus , @PathParam("Channel_TyrePlus") String Channel_TyrePlus,  @PathParam("IssueCategory_Tyreplus") String IssueCategory_Tyreplus) {
    	Connection conn = SqlServerConnectionService.getConn();
    	WeeklyIssueTrend wiTrend = new WeeklyIssueTrend();
    	List<String> dates = new ArrayList<String>();
    	List<Integer> nagetiveIssue = new ArrayList<Integer>();
    	List<Integer> crisisIssue = new ArrayList<Integer>();
    	CallableStatement c = null;
		try {
			c = conn.prepareCall("{call mi.getDailyGuardianWeeklyIssueTrend_TyrePlus(?,?,?,?,?) }");
	        
	        c.setDate(1, Date.valueOf(start));
	        c.setDate(2, Date.valueOf(end));
	        c.setString(3, String.valueOf(FilterIssueGrade_TyrePlus));
			c.setString(4, String.valueOf(Channel_TyrePlus));
			c.setString(5, String.valueOf(IssueCategory_Tyreplus));
			
			
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
