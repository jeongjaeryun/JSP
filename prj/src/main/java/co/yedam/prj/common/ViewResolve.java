package co.yedam.prj.common;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ViewResolve {
	public static void forward(HttpServletRequest request, HttpServletResponse response, String path) throws ServletException, IOException {
		String prefix = "WEB-INF/views/";
		//String subfixjsp = ".jsp";
		String subfix = ".tiles";
		String page = path + subfix;
		
		if(path.endsWith(".jsp")) {//끝 문자열이 .jsp로 오면 tiles 안탐
			page = prefix + path;
		}
		
		
		RequestDispatcher dispatcher = request.getRequestDispatcher(page);
		dispatcher.forward(request, response);
	}
}
