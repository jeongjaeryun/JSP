package co.yedam.project.member.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.project.common.ViewResolve;
import co.yedam.project.member.service.MemberService;
import co.yedam.project.member.service.MemberVO;
import co.yedam.project.member.serviceImpl.MemberServiceImpl;


@WebServlet("/login.do")
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public LoginController() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Service 객체 생성 DAO
		MemberService dao = new MemberServiceImpl();
		MemberVO vo = new MemberVO();
		// MemberVO 객체 생성
		// vo 객체에 넘어온 값을 담고 
		vo.setMemberId(request.getParameter("memberId"));
		vo.setMemberPassword(request.getParameter("memberPassword"));
		//vo.setMemberPassword(" 3ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4");
		
		String id = request.getParameter("memberId");
		String password = request.getParameter("memberPassword");
		// dao 호출 하고 db로 감
		vo = dao.memberSelect(vo);
		System.out.println("vo::::::: " + vo.toString());
		// 결과처리 결과를 request객체에 담아서 보내주면 페이지에 전달됨
		if(vo != null) {
			request.setAttribute("memssage", "로그인 성공");
			
		}else {
			request.setAttribute("memssage", "로그인 실패");
		}
		request.setAttribute("id", id); //리퀘스트에 담을때 setAttribute 쓰고 첫번째는 변수명 두번째는 값 => 결과를 처리해서 보여줄페이지에 값 전달 
		request.setAttribute("password", password);
		String page = "member/membermessage";
		ViewResolve.views(request, response, page);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
