package com.colordata.michelin.rest.impl;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.colordata.michelin.rest.model.BuzzTrend;
import com.colordata.michelin.rest.model.IWOMPostRecords;
import com.colordata.michelin.rest.model.IWOMTopic;
import com.colordata.michelin.rest.model.NSRTrend;
import com.colordata.michelin.rest.model.RecordTrend;
import com.colordata.michelin.rest.model.ValueNamePair;


@Path("/iwom")
@RequestScoped
@Stateful
public class IWOMRestFul {

	@GET
	@Path("nsrtrend/{department}/{tab}/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public NSRTrend getNSRTrend(
			@PathParam("department") String department, 
			@PathParam("tab") String tab, 
			@PathParam("start") String start, 
			@PathParam("end") String end) {
		NSRTrend trend = new NSRTrend();
		List<String> brands = new ArrayList<String>();
		List<String> dates = new ArrayList<String>();
		Map<String, List<BigDecimal>> brandRatioPairs = new HashMap<String, List<BigDecimal>>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMNSRTrendChart");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMOnlineBuzzOverviewNSRTrend(?,?,?,?) }");
			c.setInt(1, Integer.valueOf(department));
			c.setInt(2, Integer.valueOf(tab));
			c.setDate(3, Date.valueOf(start));
			c.setDate(4, Date.valueOf(end));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				String date = rs.getString("Date");
				String brand = null;
				
				if (tab.equals("2")) {
					brand = rs.getString("Brand");
				} 
				
				if (tab.equals("1")) {
					brand = rs.getString("Product");
				}
				
				BigDecimal ratio = rs.getBigDecimal("Ratio");
				if (!dates.contains(date)) {
//					System.out.println(String.format("date %s", date));
					dates.add(date);
				}
				
				if (!brands.contains(brand)) {
//					System.out.println(String.format("brand %s", brand));
					brands.add(brand);
				}
				
				if (!brandRatioPairs.containsKey(brand)) {
					// First time you get the Brand.
					List<BigDecimal> initList = new ArrayList<BigDecimal>();
					initList.add(ratio);
					brandRatioPairs.put(brand, initList);
//					System.out.println(String.format("pair brand %s", brand));
//					System.out.println(String.format("pair count %d", count));
				} else {
					List<BigDecimal> tempList = brandRatioPairs.get(brand);
					tempList.add(ratio);
				}
				
				trend.setDate(dates);
				trend.setBrand(brands);
				trend.setBrandRaitoPair(brandRatioPairs);
			}
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return trend;
	}
	
	@GET
	@Path("recordtrend/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public RecordTrend getRecordTrend(
			@PathParam("start") String start, 
			@PathParam("end") String end) {
		RecordTrend trend = new RecordTrend();
		List<String> brands = new ArrayList<String>();
		List<String> dates = new ArrayList<String>();
		Map<String, List<BigDecimal>> brandRatioPairs = new HashMap<String, List<BigDecimal>>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMRecordTrendChart");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMOnlineBuzzOverviewiRecoTrend(?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				String date = rs.getString("Date");
				String brand = rs.getString("Brand");
				
				BigDecimal ratio = rs.getBigDecimal("Ratio");
				if (!dates.contains(date)) {
//					System.out.println(String.format("date %s", date));
					dates.add(date);
				}
				
				if (!brands.contains(brand)) {
//					System.out.println(String.format("brand %s", brand));
					brands.add(brand);
				}
				
				if (!brandRatioPairs.containsKey(brand)) {
					// First time you get the Brand.
					List<BigDecimal> initList = new ArrayList<BigDecimal>();
					initList.add(ratio);
					brandRatioPairs.put(brand, initList);
//					System.out.println(String.format("pair brand %s", brand));
//					System.out.println(String.format("pair count %d", count));
				} else {
					List<BigDecimal> tempList = brandRatioPairs.get(brand);
					tempList.add(ratio);
				}
				
				trend.setDate(dates);
				trend.setBrand(brands);
				trend.setBrandRaitoPair(brandRatioPairs);
			}
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return trend;
	}
	
	@GET
	@Path("buzztrend/{department}/{tab}/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public BuzzTrend getBuzzTrend(
			@PathParam("department") String department, 
			@PathParam("tab") String tab, 
			@PathParam("start") String start, 
			@PathParam("end") String end) {
		BuzzTrend buzzTrend = new BuzzTrend();
		Connection conn = SqlServerConnectionService.getConn();
		List<String> dates = new ArrayList<String>();
		List<String> brands = new ArrayList<String>();
		Map<String, List<Integer>> brandCountPairs = new HashMap<String, List<Integer>>();
		System.out.println("getIWOMBuzzTrendChart");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMOnlineBuzzOverviewBuzzTrend(?,?,?,?) }");
			c.setInt(1, Integer.valueOf(department));
			c.setInt(2, Integer.valueOf(tab));
			c.setDate(3, Date.valueOf(start));
			c.setDate(4, Date.valueOf(end));
			
			ResultSet rs = c.executeQuery();
//			System.out.println("executing...");
			while (rs.next()) {
				String date = rs.getString("Date");
				String brand = null;
				if (tab.equals("2")) {
					brand = rs.getString("Brand");
				} 
				
				if (tab.equals("1")) {
					brand = rs.getString("Product");
				}
				
				int count = rs.getInt("Count");
				if (!dates.contains(date)) {
//					System.out.println(String.format("date %s", date));
					dates.add(date);
				}
				
				if (!brands.contains(brand)) {
//					System.out.println(String.format("brand %s", brand));
					brands.add(brand);
				}
				
				if (!brandCountPairs.containsKey(brand)) {
					// First time you get the Brand.
					List<Integer> initList = new ArrayList<Integer>();
					initList.add(count);
					brandCountPairs.put(brand, initList);
//					System.out.println(String.format("pair brand %s", brand));
//					System.out.println(String.format("pair count %d", count));
				} else {
					List<Integer> tempList = brandCountPairs.get(brand);
					tempList.add(count);
				}
				
				buzzTrend.setDate(dates);
				buzzTrend.setBrand(brands);
				buzzTrend.setBrandCountPair(brandCountPairs);
			}
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return buzzTrend;
	}

	@GET
	@Path("channel/{department}/{channel}/{product}/{platform}/{topic}/{sentiment}/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ValueNamePair> getWOMChannel(
			@PathParam("department") String department, 
			@PathParam("channel") String channel, 
			@PathParam("product") String product, 
			@PathParam("platform") String platform, 
			@PathParam("topic") String topic, 
			@PathParam("sentiment") String sentiment, 
			@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMChannelChart");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMBuzzChannelDistribution(?,?,?,?,?,?,?,?) }");
			c.setInt(1, Integer.valueOf(department));
			c.setDate(2, Date.valueOf(start));
			c.setDate(3, Date.valueOf(end));
			c.setInt(4, Integer.valueOf(channel));
			if (platform.equals("undefined")) {
				c.setInt(5, -1);
			} else {
				c.setInt(5, Integer.valueOf(platform));
			}
			if (product.equals("undefined")) {
				c.setInt(6, -1);
			} else {
				c.setInt(6, Integer.valueOf(product));
			}
			c.setInt(7, Integer.valueOf(topic));
			c.setInt(8, Integer.valueOf(sentiment));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				ValueNamePair pair = new ValueNamePair();
				pair.setName(rs.getString("ChannelName"));
				pair.setValue(rs.getInt("Count"));
				pairs.add(pair);
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return pairs;				
	}

	@GET
	@Path("topic/{department}/{channel}/{product}/{platform}/{topic}/{sentiment}/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public IWOMTopic getWOMTopic(
			@PathParam("department") String department, 
			@PathParam("channel") String channel, 
			@PathParam("product") String product, 
			@PathParam("platform") String platform, 
			@PathParam("topic") String topic, 
			@PathParam("sentiment") String sentiment, 
			@PathParam("start") String start, 
			@PathParam("end") String end) {
		IWOMTopic topics = new IWOMTopic();
		List<String> names = new ArrayList<String>();
		List<Integer> counts = new ArrayList<Integer>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMTopicChart");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMBuzzDiscussionTopicDistribution(?,?,?,?,?,?,?,?) }");
			c.setInt(1, Integer.valueOf(department));
			c.setDate(2, Date.valueOf(start));
			c.setDate(3, Date.valueOf(end));
			c.setInt(4, Integer.valueOf(channel));
			if (platform.equals("undefined")) {
				c.setInt(5, -1);
			} else {
				c.setInt(5, Integer.valueOf(platform));
			}
			if (product.equals("undefined")) {
				c.setInt(6, -1);
			} else {
				c.setInt(6, Integer.valueOf(product));
			}
			c.setInt(7, Integer.valueOf(topic));
			c.setInt(8, Integer.valueOf(sentiment));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				names.add(rs.getString("TopicAngleName"));
				counts.add(rs.getInt("Count"));
			}
			
			topics.setNames(names);
			topics.setCounts(counts);
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return topics;				
	}

	@GET
	@Path("positiveworldcloud/{department}/{channel}/{product}/{platform}/{topic}/{sentiment}/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ValueNamePair> getWOMPositiveWordCloud(
			@PathParam("department") String department, 
			@PathParam("channel") String channel, 
			@PathParam("product") String product, 
			@PathParam("platform") String platform, 
			@PathParam("topic") String topic, 
			@PathParam("sentiment") String sentiment, 
			@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMPostiveWordCloudChart");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMBuzzPositiveWordCloud(?,?,?,?,?,?,?,?) }");
			c.setInt(1, Integer.valueOf(department)); // department id
			c.setDate(2, Date.valueOf(start));
			c.setDate(3, Date.valueOf(end));
			c.setInt(4, Integer.valueOf(channel));
			if (platform.equals("undefined")) {
				// TODO, this is not right
				c.setInt(5, -1);
			} else {
				c.setInt(5, Integer.valueOf(platform));
			}
			if (product.equals("undefined")) {
				c.setInt(6, -1);
			} else {
				c.setInt(6, Integer.valueOf(product));
			}
			c.setInt(7, Integer.valueOf(topic));
			c.setInt(8, Integer.valueOf(sentiment));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				ValueNamePair pair = new ValueNamePair();
				pair.setName(rs.getString("Combination"));
				pair.setValue(rs.getInt("Count"));
				pairs.add(pair);
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return pairs;				
	}

	@GET
	@Path("negativeworldcloud/{department}/{channel}/{product}/{platform}/{topic}/{sentiment}/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ValueNamePair> getWOMNegativeWordCloud(
			@PathParam("department") String department, 
			@PathParam("channel") String channel, 
			@PathParam("product") String product, 
			@PathParam("platform") String platform, 
			@PathParam("topic") String topic, 
			@PathParam("sentiment") String sentiment, 
			@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<ValueNamePair> pairs = new ArrayList<ValueNamePair>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMNegativeWorldCloudChart");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMBuzzNegativeWordCloud(?,?,?,?,?,?,?,?) }");
			c.setInt(1, Integer.valueOf(department)); // department id
			c.setDate(2, Date.valueOf(start));
			c.setDate(3, Date.valueOf(end));
			c.setInt(4, Integer.valueOf(channel));
			if (platform.equals("undefined")) {
				c.setInt(5, -1);
			} else {
				c.setInt(5, Integer.valueOf(platform));
			}
			if (product.equals("undefined")) {
				c.setInt(6, -1);
			} else {
				c.setInt(6, Integer.valueOf(product));
			}
			c.setInt(7, Integer.valueOf(topic));
			c.setInt(8, Integer.valueOf(sentiment));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				ValueNamePair pair = new ValueNamePair();
				pair.setName(rs.getString("Combination"));
				pair.setValue(rs.getInt("Count"));
				pairs.add(pair);
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return pairs;				
	}

	@GET
	@Path("onlinetopicrecords/{department}/{channel}/{product}/{platform}/{topic}/{sentiment}/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<IWOMPostRecords> getWOMOnlineTopicPostRecords(
			@PathParam("department") String department, 
			@PathParam("channel") String channel, 
			@PathParam("product") String product, 
			@PathParam("platform") String platform, 
			@PathParam("topic") String topic, 
			@PathParam("sentiment") String sentiment, 
			@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<IWOMPostRecords> records = new ArrayList<IWOMPostRecords>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMTopicPostReocrdsChart");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMBuzzOnlineTopicPostsRecords(?,?,?,?,?,?,?,?) }");
			c.setInt(1, Integer.valueOf(department)); // department id
			c.setDate(2, Date.valueOf(start));
			c.setDate(3, Date.valueOf(end));
			c.setInt(4, Integer.valueOf(channel));
			if (platform.equals("undefined")) {
				c.setInt(5, -1);
			} else {
				c.setInt(5, Integer.valueOf(platform));
			}
			if (product.equals("undefined")) {
				c.setInt(6, -1);
			} else {
				c.setInt(6, Integer.valueOf(product));
			}
			c.setInt(7, Integer.valueOf(topic));
			c.setInt(8, Integer.valueOf(sentiment));
			
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				IWOMPostRecords record = new IWOMPostRecords();
				record.setId(rs.getInt("ID"));
				record.setChannel(rs.getString("Channel"));
				record.setPlatform(rs.getString("BBS Platform"));
				record.setProduct(rs.getString("Michelin Product"));
				record.setTitle(rs.getString("Title"));
				record.setContent(rs.getString("Content"));
				record.setPostDate(rs.getString("PostDate"));
				record.setUrl(rs.getString("URL"));
				records.add(record);
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return records;				
	}
}
