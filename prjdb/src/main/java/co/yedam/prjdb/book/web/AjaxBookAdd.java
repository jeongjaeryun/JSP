package co.yedam.prjdb.book.web;

import java.io.IOException;
import java.util.HashMap;
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

@WebServlet("/AjaxBookAdd.do")
public class AjaxBookAdd extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AjaxBookAdd() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String bookCode = request.getParameter("bookCode");
		String bookName = request.getParameter("bookName");
		String bookWriter = request.getParameter("bookWriter");
		String bookPublisher = request.getParameter("bookPublisher");
		String bookPrice = request.getParameter("bookPrice");
		System.out.println("book찍음"+bookCode+bookName+bookWriter+bookPublisher+bookPrice);
		
		BookVO vo = new BookVO();
		vo.setBookCode(bookCode);
		vo.setBookName(bookName);
		vo.setBookWriter(bookWriter);
		vo.setBookPublisher(bookPublisher);
		vo.setBookPrice(bookPrice);
		
		BookService dao = new BookServiceImpl();
		Map<String, Object>resultMap = new HashMap<>();
		if(dao.bookInsert(vo)) {
			resultMap.put("retCode", "Success");
			resultMap.put("data", vo);

		}else {
			resultMap.put("retCode", "Fail");
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(resultMap);
		
		response.setContentType("text/json;charset=utf-8");
		response.getWriter().print(json);//response 출력스트림
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
