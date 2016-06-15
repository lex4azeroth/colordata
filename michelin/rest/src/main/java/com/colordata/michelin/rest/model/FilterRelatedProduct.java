package com.colordata.michelin.rest.model;

public class FilterRelatedProduct {
	private String RelatedProduct;
	private int RelatedProductID;

	public int getRelatedProductID() {
		return RelatedProductID;
	}

	public void setRelatedProductID(int RelatedProductID) {
		this.RelatedProductID = RelatedProductID;
	}
	
	
	public String getRelatedProduct() {
		return RelatedProduct;
	}

	public void setRelatedProduct(String RelatedProduct) {
		this.RelatedProduct = RelatedProduct;
	}
	
}
