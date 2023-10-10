package co.yedam.prjdb.book.service;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookVO {
	private int bookId;
	private String bookCode;
	private String bookName;
	private String bookWriter;
	private String bookPublisher;
	private String bookPrice;
}
