package co.yedam.prjdb.book.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.yedam.prjdb.book.service.BookService;
import co.yedam.prjdb.book.service.BookVO;
import co.yedam.prjdb.book.serviceImpl.BookServiceImpl;
import co.yedam.prjdb.common.ViewResolve;

@WebServlet("/bookSelectList.do")
public class BookSelectList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public BookSelectList() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		BookService dao = new BookServiceImpl();
		List<BookVO> books = new ArrayList<BookVO>();
		
		books = dao.bookSelectList();
		
		
		
		ObjectMapper objectMapper = new ObjectMapper(); 
		String json = objectMapper.writeValueAsString(books);
		
		response.setContentType("text/json; charset=utf-8"); // 한글깨짐방지
		PrintWriter out = response.getWriter(); // json 문자열로 반환해줌
		out.print(json);
		
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
