package co.yedam.prj.common;

import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class DataSource {
	private static SqlSessionFactory sqlSessionFactory;
	private DataSource() {}//내부생성자
	
	public static SqlSessionFactory getInstance() { //싱글톤 클래스
		String resource = "mybatis-config.xml";
		try {
			InputStream inputStream = Resources.getResourceAsStream(resource); // inputStream이란 버퍼에 저장해둠
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream); //factorybuilder를 통해 자신을 초기화함
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return sqlSessionFactory;
	}
}
