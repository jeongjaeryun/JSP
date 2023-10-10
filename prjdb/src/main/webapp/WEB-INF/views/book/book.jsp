<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<title>Book</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
		<script src="//cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

	</head>

	<body>
		<div align="center">
			<jsp:include page="../menu/header.jsp" />
			<div>
				<table border="1">
					<tr>
						<th>도서코드</th>
						<td><input type="text" name="rid"></td>
					</tr>

					<tr>
						<th>도서명</th>
						<td><input type="text" name="content"></td>
					</tr>

					<tr>
						<th>저자</th>
						<td><input type="text" name="writer"></td>
					</tr>

					<tr>
						<th>출판사</th>
						<td><input type="text" name="replyDate"></td>
					</tr>
					<tr>
						<th>금액</th>
						<td><input type="text" name="replyDate"></td>
					</tr>
					<tr>
						<td colspan="2"><button class="addRow">저장</button><button id="button">선택삭제</button></td>
					</tr>
				</table>
			</div>
		</div>
	</body>

	</html>