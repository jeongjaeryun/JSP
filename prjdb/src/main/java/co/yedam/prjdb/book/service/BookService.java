package co.yedam.prjdb.book.service;

import java.util.List;

public interface BookService {
	List<BookVO> bookSelectList();
	boolean bookInsert(BookVO vo);
	boolean bookDelete(int bid);
}
