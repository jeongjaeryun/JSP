package co.yedam.prjdb.book.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.prjdb.book.service.BookService;
import co.yedam.prjdb.book.service.BookVO;
import co.yedam.prjdb.book.serviceImpl.BookServiceImpl;

@WebServlet("/AjaxBookDelete.do")
public class AjaxBookDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AjaxBookDelete() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String bid = request.getParameter("bid");
		BookService dao = new BookServiceImpl();
		BookVO vo = new BookVO();
		if(dao.bookDelete(Integer.parseInt(bid))) {
			response.getWriter().print("{\"retCode\":\"Success\"}");
		}else {
			response.getWriter().print("{\"retCode\":\"Fail\"}");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
