package co.yedam.project.common;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ViewResolve {
	public static void views(HttpServletRequest request, HttpServletResponse response, String page) throws ServletException, IOException { //page 선택할 jsp명
		String jspPage = "WEB-INF/views/"+ page + ".jsp"; //page에 "home/home"이 들어옴 요렇게 하나의 문자열로 만듦=> WEB-INF/views/home/home.jsp
				
		RequestDispatcher dispatcher = request.getRequestDispatcher(jspPage);
		dispatcher.forward(request, response); //forward는 권한 이름, html로 변환해서 나한테 결과물 보여줌
		
	}
}
