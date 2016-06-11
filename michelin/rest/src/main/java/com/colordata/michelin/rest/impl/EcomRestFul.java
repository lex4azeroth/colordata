package com.colordata.michelin.rest.impl;

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

import com.colordata.michelin.rest.model.EcomJD;
import com.colordata.michelin.rest.model.EcomProductLines;
import com.colordata.michelin.rest.model.EcomScore;
import com.colordata.michelin.rest.model.EcomTmall;
import com.colordata.michelin.rest.model.EcomTuhu;

@Path("/ecom")
@RequestScoped
@Stateful
public class EcomRestFul {

	@GET
	@Path("tuhu/{start}/{end}/{id}/{score}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<EcomTuhu> getEcomTuhu(@PathParam("start") String start, 
			@PathParam("end") String end, @PathParam("id") String id,  @PathParam("score") String score) {
		List<EcomTuhu> tuhus = new ArrayList<EcomTuhu>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println(String.format("getEcomTuhu: [%1$s, %2$s, %3$s, %4$s]", start, end, id, score));
		try {
			CallableStatement c = conn.prepareCall("{call mi.getEcomRecordsJD(?,?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(start));
			c.setInt(3,  Integer.valueOf(id));
			c.setInt(4, Integer.valueOf(score));
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				EcomTuhu tuhu = new EcomTuhu();
				tuhu.setId(rs.getInt("ID"));
				tuhu.setChannel(rs.getString("Channel"));
				tuhu.setComment(rs.getString("Comment"));
				tuhu.setPostTime(rs.getString("PostDate"));
				tuhu.setProductLine(rs.getString("ProductLine"));
				tuhu.setProductName(rs.getString("ProductName"));
				tuhu.setUserName(rs.getString("UserName"));
				tuhu.setScore(rs.getString("Score"));
				tuhu.setStore(rs.getString("Store"));
				tuhus.add(tuhu);
			}
			
			// For test only
			if (tuhus.size() == 0) {
				EcomTuhu tuhu = new EcomTuhu();
				tuhu.setId(12323);
				tuhu.setChannel("TmallChannel");
				tuhu.setComment("TmallComment");
				tuhu.setPostTime("2016-11-12");
				tuhu.setProductLine("TmallProductLine");
				tuhu.setProductName("TmallProductName");
				tuhu.setUserName("TmallUserName");
				tuhu.setScore("333");
				tuhu.setStore("222");
				tuhus.add(tuhu);
			}
			
		} catch (SQLException ex) {
			
		}
		
		return tuhus;
	}
	
	@GET
	@Path("tmall/{start}/{end}/{id}/{score}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<EcomTmall> getEcomTmall(@PathParam("start") String start, 
			@PathParam("end") String end, @PathParam("id") String id,  @PathParam("score") String score) {
		List<EcomTmall> tmalls = new ArrayList<EcomTmall>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println(String.format("getEcomTmall: [%1$s, %2$s, %3$s, %4$s]", start, end, id, score));
		try {
			CallableStatement c = conn.prepareCall("{call mi.getEcomRecordsJD(?,?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(start));
			c.setInt(3,  Integer.valueOf(id));
			c.setInt(4, Integer.valueOf(score));
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				EcomTmall tmall = new EcomTmall();
				tmall.setId(rs.getInt("ID"));
				tmall.setChannel(rs.getString("Channel"));
				tmall.setComment(rs.getString("Comment"));
				tmall.setPostTime(rs.getString("PostDate"));
				tmall.setProductLine(rs.getString("ProductLine"));
				tmall.setProductName(rs.getString("ProductName"));
				tmall.setUserName(rs.getString("UserName"));
				tmall.setScore(rs.getString("Score"));
				tmall.setStore(rs.getString("Store"));
				tmalls.add(tmall);
			}
			
			// For test only
			if (tmalls.size() == 0) {
				EcomTmall tmall = new EcomTmall();
				tmall.setId(12323);
				tmall.setChannel("TmallChannel");
				tmall.setComment("TmallComment");
				tmall.setPostTime("2016-11-12");
				tmall.setProductLine("TmallProductLine");
				tmall.setProductName("TmallProductName");
				tmall.setUserName("TmallUserName");
				tmall.setScore("333");
				tmall.setStore("222");
				tmalls.add(tmall);
			}
			
		} catch (SQLException ex) {
			
		}
		
		return tmalls;
	}
	
	@GET
	@Path("jd/{start}/{end}/{id}/{score}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<EcomJD> getEcomJD(@PathParam("start") String start, 
			@PathParam("end") String end, @PathParam("id") String id,  @PathParam("score") String score) {
		List<EcomJD> jds = new ArrayList<EcomJD>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println(String.format("getEcomJD: [%1$s, %2$s, %3$s, %4$s]", start, end, id, score));
		
		try {
			CallableStatement c = conn.prepareCall("{call mi.getEcomRecordsJD(?,?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(start));
			c.setInt(3,  Integer.valueOf(id));
			c.setInt(4, Integer.valueOf(score));
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				EcomJD jd = new EcomJD();
				jd.setId(rs.getInt("ID"));
				jd.setChannel(rs.getString("Channel"));
				jd.setComment(rs.getString("Comment"));
				jd.setPostTime(rs.getString("PostDate"));
				jd.setProductLine(rs.getString("ProductLine"));
				jd.setProductName(rs.getString("ProductName"));
				jd.setUserName(rs.getString("UserName"));
				jd.setScore(rs.getString("Score"));
				jd.setStore(rs.getString("Store"));
				jds.add(jd);
			}
			
			if (jds.size() == 0) {
				EcomJD jd = new EcomJD();
				jd.setId(12323);
				jd.setChannel("JDChannel");
				jd.setComment("JDComment");
				jd.setPostTime("2016-11-12");
				jd.setProductLine("JDProductLine");
				jd.setProductName("JDProductName");
				jd.setUserName("JDUserName");
				jd.setScore("333");
				jd.setStore("222");
				jds.add(jd);
			}
			
		} catch (SQLException ex) {
			
		}
		
		return jds;
	}

	@GET
	@Path("scores")
	@Produces(MediaType.APPLICATION_JSON)
	public List<EcomScore> getEcomScore() {
		List<EcomScore> scores = new ArrayList<EcomScore>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getEcomScore");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getEcomScore() }");
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				EcomScore score = new EcomScore();
				score.setScore(rs.getInt("Score"));
				scores.add(score);
			}
			
		} catch (SQLException ex) {
			
		}
		
		return scores;				
	}
	
	@GET
	@Path("productlines")
	@Produces(MediaType.APPLICATION_JSON)
	public List<EcomProductLines> getProductLines() {
		List<EcomProductLines> ecomProductLines = new ArrayList<EcomProductLines>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getProductLines");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getEcomProductLines() }");
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				EcomProductLines ecomProductLine = new EcomProductLines();
				ecomProductLine.setId(rs.getInt("ProductLinesID"));
				ecomProductLine.setLines(rs.getString("ProductLines"));
				ecomProductLines.add(ecomProductLine);
			}
			
		} catch (SQLException ex) {
			
		}
		
		return ecomProductLines;				
	}
}
