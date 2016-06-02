package com.colordata.michelin.rest.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

//
@Singleton
@Startup
//@EJB()
public class SqlServerConnectionService {

	private final static String SQL_JNDI = "java:jboss/datasources/colordatamichelin";
	private static Context ctx;
	private static DataSource ds;
	private static Connection conn;
	
	public static void initConnection() {


			try {
				ctx = new InitialContext();
				ds = (DataSource) ctx.lookup(SQL_JNDI);
			} catch (NamingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			try {
				System.out.println("try to get connection");
				conn = ds.getConnection();
				if (conn.isValid(5)) {
					System.out.println("Connection available");
				} else {
					System.out.println("SAD...");
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
//			try {
//			//创建存储过程的对象
//	         CallableStatement c=conn.prepareCall("{call pro(?)}");
//	        
//	         c.setInt(1,1);
//	        
////	         c.execute();
////	         c.exec
//	        
////	         c=conn.prepareCall("{call selePro}");
//	         ResultSet rs=c.executeQuery();
//	        
//	         while(rs.next())
//	         {
//	         String Stu=rs.getString("StuID");
//	         String name=rs.getString("StuName");
//	         String add=rs.getString("StuAddress");
//	         
//	         System.out.println ("学号:"+"     "+"姓名:"+"     "+"地址");
//	         System.out.println (Stu+"     "+name+"   "+add);
//	         }
//	         c.close();
//			} catch (SQLException ex) {
//				
//			}
	}
	
	public static Connection getConn() {
		if (conn == null) {
			initConnection();
		}
		return conn;
	}
	
	
	public void destoryConnection() {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
