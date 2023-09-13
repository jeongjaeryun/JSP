package co.yedam.prj.common;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class EncodingFilter implements Filter {
	private String encode;
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		encode = filterConfig.getInitParameter("encode");//web.xml에 설정해놓겠다
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		//동작할때 어떻게 할거냐
		if(request.getCharacterEncoding()==null) {
			request.setCharacterEncoding(encode); //web.xml의 utf8이 담김
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		
	}

}
