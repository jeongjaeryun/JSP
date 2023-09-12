package co.yedam.prjdb.item.service;

import lombok.Data;

@Data
public class ItemVO {
	private int itemId;
	private String itemName;
	private String itemContent;
	private int itemPrice;
	private int itemSalerate;
	private int itemStar;
	private String itemImage;
}
