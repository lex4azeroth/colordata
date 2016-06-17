package com.colordata.michelin.rest.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
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

import com.colordata.michelin.rest.model.BBSPlatform;
import com.colordata.michelin.rest.model.Channel;
import com.colordata.michelin.rest.model.DiscussionSentiment;
import com.colordata.michelin.rest.model.DiscussionTopic;
import com.colordata.michelin.rest.model.MichelinProduct;
import com.colordata.michelin.rest.model.TireStoreBrand;

@Path("/iwomfilter")
@RequestScoped
@Stateful
public class IWOMFilterRestFul {
	@GET
	@Path("channel")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Channel> getWOMChannel() {
		List<Channel> channels = new ArrayList<Channel>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMChannel");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMChannel() }");
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				Channel channel = new Channel();
				channel.setId(rs.getInt("ChannelID"));
				channel.setChannelName(rs.getString("ChannelName"));
				channels.add(channel);
				
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return channels;				
	}
	
	@GET
	@Path("bbsplatform/{channelid}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<BBSPlatform> getWOMBBSPlatform(@PathParam("channelid") String id) {
		List<BBSPlatform> platforms = new ArrayList<BBSPlatform>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMBBSPlatform");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMBBSPlatform(?) }");
			c.setInt(1, Integer.valueOf(id));
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				BBSPlatform platform = new BBSPlatform();
				platform.setId(rs.getInt("PlatformID"));
				platform.setName(rs.getString("PlatformName"));
				platforms.add(platform);
				
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return platforms;				
	}
	
	@GET
	@Path("micheinproduct/{brandid}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<MichelinProduct> getMichelinProduct(@PathParam("brandid") String id) {
		List<MichelinProduct> michelinProducts = new ArrayList<MichelinProduct>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMMichelinProducts");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMMichelinProduct(?) }");
			c.setInt(1, Integer.valueOf(id));
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				MichelinProduct product = new MichelinProduct();
				product.setId(rs.getInt("ProductID"));
				product.setName(rs.getString("ProductName"));
				michelinProducts.add(product);			
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return michelinProducts;				
	}
	
	@GET
	@Path("tirebrand")
	@Produces(MediaType.APPLICATION_JSON)
	public List<TireStoreBrand> getTireBrand() {
		List<TireStoreBrand> tireStoreBrands = new ArrayList<TireStoreBrand>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMBBSTireBrand");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMTireStoreBrand(?) }");
			c.setInt(1, 1);
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				TireStoreBrand tireStoreBrand = new TireStoreBrand();
				tireStoreBrand.setId(rs.getInt("BrandID"));
				tireStoreBrand.setName(rs.getString("BrandName"));
				tireStoreBrands.add(tireStoreBrand);
				
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return tireStoreBrands;				
	}
	
	@GET
	@Path("discussiontopic")
	@Produces(MediaType.APPLICATION_JSON)
	public List<DiscussionTopic> getDiscussionTopic() {
		List<DiscussionTopic> discussionTopics = new ArrayList<DiscussionTopic>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMDiscussionTopics");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMDiscussionTopic() }");
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				DiscussionTopic discussionTopic = new DiscussionTopic();
				discussionTopic.setId(rs.getInt("TopicAngleID"));
				discussionTopic.setName(rs.getString("TopicAngleName"));
				discussionTopics.add(discussionTopic);
				
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return discussionTopics;				
	}
	
	@GET
	@Path("discussionsentiment")
	@Produces(MediaType.APPLICATION_JSON)
	public List<DiscussionSentiment> getDiscussionSentiment() {
		List<DiscussionSentiment> discussionSentiments = new ArrayList<DiscussionSentiment>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getIWOMDiscussionSentiments");
		try {
			CallableStatement c = conn.prepareCall("{call mi.getiWoMDiscussionSentiment() }");
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				DiscussionSentiment discussionSentiment = new DiscussionSentiment();
				discussionSentiment.setId(rs.getInt("SentimentID"));
				discussionSentiment.setName(rs.getString("Sentiment"));
				discussionSentiments.add(discussionSentiment);
				
			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return discussionSentiments;				
	}
}