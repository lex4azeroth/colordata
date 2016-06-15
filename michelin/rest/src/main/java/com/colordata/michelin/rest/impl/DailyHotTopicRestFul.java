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

import com.colordata.michelin.rest.model.BBSTopic;
import com.colordata.michelin.rest.model.DailyHotTopicEnum;
import com.colordata.michelin.rest.model.WeChatTopic;
import com.colordata.michelin.rest.model.WeiboTopic;
import com.colordata.michelin.rest.model.ZhidaoTopic;
import com.colordata.michelin.rest.model.ZhihuTopic;

@Path("/dailyhottopic")
@RequestScoped
@Stateful
public class DailyHotTopicRestFul {
	
	@GET
	@Path("bbs/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<BBSTopic> getBBSTopic(@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<BBSTopic> bbsTopics = new ArrayList<BBSTopic>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getBBSTopic from " + start + " to " + end);
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDHTRecords(?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setInt(3, DailyHotTopicEnum.BBS.getId());
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				BBSTopic bbsTopic = new BBSTopic();
				bbsTopic.setId(rs.getInt("ID"));
				bbsTopic.setAuthor(rs.getString("Author"));
				bbsTopic.setContent(rs.getString("title"));
				bbsTopic.setForumName(rs.getString("ForumName"));
				bbsTopic.setPlatform(rs.getString("Platform"));
				bbsTopic.setPostDate(rs.getString("PostDate"));
				bbsTopic.setReadNum(rs.getInt("NumRead"));
				bbsTopic.setReplyNum(rs.getInt("NumReply"));
				bbsTopic.setURL(rs.getString("URL"));
				bbsTopics.add(bbsTopic);
			}
			
			// For test only
//			if (bbsTopics.size() == 0) {
//				BBSTopic bbsTopic = new BBSTopic();
//				bbsTopic.setId(1111);
//				bbsTopic.setAuthor("bbsAuthor");
//				bbsTopic.setContent("bbsTitle");
//				bbsTopic.setForumName("kds");
//				bbsTopic.setPlatform("what?");
//				bbsTopic.setPostDate("2016-01-01");
//				bbsTopic.setReadNum(1111);
//				bbsTopic.setReplyNum(5555);
//				bbsTopics.add(bbsTopic);
//			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return bbsTopics;				
	}
	
	@GET
	@Path("zhidao/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ZhidaoTopic> getZhidaoTopic(@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<ZhidaoTopic> zhidaoTopics = new ArrayList<ZhidaoTopic>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getZhidaoTopic from " + start + " to " + end);
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDHTRecords(?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setInt(3, DailyHotTopicEnum.ZHIDAO.getId());
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				ZhidaoTopic zhidao = new ZhidaoTopic();
				zhidao.setId(rs.getInt("ID"));
				zhidao.setAuthor(rs.getString("Author"));
				zhidao.setContent(rs.getString("title"));
				zhidao.setPostDate(rs.getString("PostDate"));
				zhidao.setQuestion(rs.getString("Question"));
				zhidao.setLikeNum(rs.getInt("NumLike"));
				zhidao.setDislikeNum(rs.getInt("NumDislike"));
				zhidao.setURL(rs.getString("URL"));
				zhidaoTopics.add(zhidao);
			}
			
			// For test only
//			if (zhidaoTopics.size() == 0) {
//				ZhidaoTopic zhidao = new ZhidaoTopic();
//				zhidao.setId(1101);
//				zhidao.setAuthor("zhidaoAuthor");
//				zhidao.setContent("zhidaoTitle");
//				zhidao.setPostDate("2016-06-11");
//				zhidao.setQuestion("Do you zhidao?");
//				zhidao.setLikeNum(5);
//				zhidao.setDislikeNum(5);
//				zhidaoTopics.add(zhidao);
//			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return zhidaoTopics;				
	}
	
	@GET
	@Path("zhihu/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ZhihuTopic> getZhihuTopic(@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<ZhihuTopic> zhihuTopics = new ArrayList<ZhihuTopic>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getZhihuTopic from " + start + " to " + end);
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDHTRecords(?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setInt(3, DailyHotTopicEnum.ZHIHU.getId());
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				ZhihuTopic zhihu = new ZhihuTopic();
				zhihu.setId(rs.getInt("ID"));
				zhihu.setAuthor(rs.getString("Author"));
				zhihu.setLikeNum(rs.getInt("NumLike"));
				zhihu.setContent(rs.getString("title"));
				zhihu.setPostDate(rs.getString("PostDate"));
				zhihu.setQuestion(rs.getString("Question"));
				zhihu.setReplyNum(rs.getInt("NumReply"));
				zhihu.setURL(rs.getString("URL"));
				zhihuTopics.add(zhihu);
			}
			
			// For test only
//			if (zhihuTopics.size() == 0) {
//				ZhihuTopic zhihu = new ZhihuTopic();
//				zhihu.setId(1005);
//				zhihu.setAuthor("ZhihuAuthor");
//				zhihu.setContent("zhihuTitle");
//				zhihu.setLikeNum(9834);
//				zhihu.setPostDate("2016-04-05");
//				zhihu.setQuestion("Can you see me?");
//				zhihu.setReplyNum(8000);
//				zhihuTopics.add(zhihu);
//			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return zhihuTopics;		
		
	}
	
	@GET
	@Path("weibo/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<WeiboTopic> getWeiboTopic(@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<WeiboTopic> weiboTopics = new ArrayList<WeiboTopic>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getWeiboTopic from " + start + " to " + end);
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDHTRecords(?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setInt(3, DailyHotTopicEnum.WEIBO.getId());
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				WeiboTopic weibo = new WeiboTopic();
				weibo.setId(rs.getInt("ID"));
				weibo.setAuthor(rs.getString("Author"));
				weibo.setForwardNum(rs.getInt("NumForward"));
				weibo.setContent(rs.getString("title"));
				weibo.setLikeNum(rs.getInt("NumLike"));
				weibo.setPostDate(rs.getString("PostDate"));
				weibo.setVip(rs.getString("IsVIP"));
				weibo.setReplyNum(rs.getInt("NumReply"));
				weibo.setURL(rs.getString("URL"));
				weiboTopics.add(weibo);
			}
			
			// For test only
//			if (weiboTopics.size() == 0) {
//				WeiboTopic weibo = new WeiboTopic();
//				weibo.setId(1002);
//				weibo.setAuthor("weiboAuthor");
//				weibo.setContent("weiboTitle1");
//				weibo.setForwardNum(101);
//				weibo.setLikeNum(100);
//				weibo.setPostDate("2016-01-02");
//				weibo.setVIP(true);
//				weibo.setReplyNum(80);
//				weiboTopics.add(weibo);
//				
//				WeiboTopic weibo2 = new WeiboTopic();
//				weibo2.setId(1003);
//				weibo2.setAuthor("weiboAuthor2");
//				weibo2.setContent("weiboTitle2");
//				weibo2.setForwardNum(80);
//				weibo2.setLikeNum(70);
//				weibo2.setPostDate("2016-01-05");
//				weibo2.setVIP(false);
//				weibo2.setReplyNum(50);
//				weiboTopics.add(weibo2);
//			}
			
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}
		
		return weiboTopics;
	}

	@GET
	@Path("/wechat/{start}/{end}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<WeChatTopic> getWeChatTopic(@PathParam("start") String start, 
			@PathParam("end") String end) {
		List<WeChatTopic> weChats = new ArrayList<WeChatTopic>();
		Connection conn = SqlServerConnectionService.getConn();
		System.out.println("getWeChatTopic from " + start + " to " + end);
		try {
			CallableStatement c = conn.prepareCall("{call mi.getDHTRecords(?,?,?) }");
			c.setDate(1, Date.valueOf(start));
			c.setDate(2, Date.valueOf(end));
			c.setInt(3, DailyHotTopicEnum.WECHAT.getId());
			ResultSet rs = c.executeQuery();
			
			while (rs.next()) {
				WeChatTopic weChat = new WeChatTopic();
				weChat.setId(rs.getInt("ID"));
				weChat.setAuthor(rs.getString("Author"));
				weChat.setContent(rs.getString("title"));
				weChat.setPostDate(rs.getString("PostDate"));
				weChat.setLikeNum(rs.getInt("NumLike"));
				weChat.setReadNum(rs.getInt("NumRead"));
				weChat.setURL(rs.getString("URL"));
				weChats.add(weChat);
			}
			
			// For test only
//			if (weChats.size() == 0) {
//				WeChatTopic weChat = new WeChatTopic();
//				weChat.setId(1001);
//				weChat.setAuthor("testAuthor");
//				weChat.setContent("wechatTitle");
//				weChat.setPostDate("2016-06-11");
//				weChat.setLikeNum(11);
//				weChat.setReadNum(22);
//				weChats.add(weChat);
//			}
		} catch (SQLException ex) {
			System.out.println(ex.toString());
		}			
		return weChats;
	}
}
