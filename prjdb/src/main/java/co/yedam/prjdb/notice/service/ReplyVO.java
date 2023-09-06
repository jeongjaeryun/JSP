package co.yedam.prjdb.notice.service;

import java.time.LocalDate;
import java.util.Date;

import lombok.Data;

@Data
public class ReplyVO {
	private int replyId;
	private int noticeId;
	private String replyer; //댓글작성자
	private String reply; //댓글 
	private LocalDate replyDate;
	private LocalDate updateDate;
}
