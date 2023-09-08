package co.yedam.prjdb.notice.service;

import java.util.List;

public interface EventService {
	List<EventVO> eventSelectList();
	EventVO eventSelect(EventVO vo);
	int eventInsert(EventVO vo);
	int eventUpdate(EventVO vo);
	int eventDelete(EventVO vo);
}
