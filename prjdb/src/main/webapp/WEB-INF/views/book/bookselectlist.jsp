<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<title>Book</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
		<script src="//cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
		<script src="js/book.js"></script>
		<style type="text/css">
			.booknav {
				padding: 30px;
			}

			.input {
				width: 600px;
				height: 30px;
			}

			button {
				padding: 5px;
			}

			.firstTr {
				background: #dcf1f5;
			}

			.totalBtn {
				text-align: right;
			}

			#bookTable {
				margin-top: 50px;
				margin-bottom: 20px;
			}

			#bookTable tbody {
				display: flex;
				flex-direction: column;
				width: 700px;
				gap: 10px;
			}

			#bookTable tbody tr {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				gap: 10px;
			}

			#bookTable tr th {
				width: 70px;
			}

			#example td {
				padding: 5px;
			}
		</style>
	</head>

	<body>
		<div align="center">
			<jsp:include page="../menu/header.jsp" />
			<!-- <div align="center"> -->
			<table id="bookTable">
				<tr>
					<th class="bookinsert">도서코드</th>
					<td><input type="text" class="input" name="bCode"></td>
				</tr>

				<tr>
					<th class="bookinsert">도서명</th>
					<td><input type="text" class="input" name="bName"></td>
				</tr>

				<tr>
					<th class="bookinsert">저자</th>
					<td><input type="text" class="input" name="bWriter"></td>
				</tr>

				<tr>
					<th>출판사</th>
					<td class="bookinsert"><input type="text" class="input" name="bPublisher"></td>
				</tr>
				<tr>
					<th class="bookinsert">금액</th>
					<td><input type="text" class="input" name="bPrice"></td>
				</tr>
				<tr>
					<td colspan="2" class="totalBtn"><button class="addRow">저장</button>
						<button class="delBtn" id="delBtn" name="delBtn">선택삭제</button>
					</td>
				</tr>
			</table>
			<div>
				<table id="example" class="display">
					<thead>
						<tr class="firstTr">
							<th class="booknav">
								<input type="checkbox" id="checkAll" name="check" />
							</th>
							<th class="booknav">도서코드</th>
							<th class="booknav">도서명</th>
							<th class="booknav">저자</th>
							<th class="booknav">출판사</th>
							<th class="booknav">금액</th>
							<th class="booknav">삭제</th>
						</tr>

					</thead>
					<tbody id="bookList" align="center">
					</tbody>
				</table>
			</div>
			<!-- </div> -->
		</div>

		<script>
			const bookObj = new Book(); //bookList()가 있음
			bookObj.showInfo();
			//목록
			fetch('bookSelectList.do')
				.then(resolve => resolve.json())
				.then(bookList => {
					let tbody = document.getElementsByTagName('#bookList');
					let html = "";
					for (let b in bookList) {
						console.log(bookList[b]);
						let tr = makeTr(bookList[b]);
						document.querySelector('#bookList').appendChild(tr);
						console.log('tr찍어봄');
						/* html += '<tr>';
						html += '<td><input type="checkbox"></td>';
						html += '<td>' + bookList[b].bookCode + '</td>';
						html += '<td>' + bookList[b].bookName + '</td>';
						html += '<td>' + bookList[b].bookWriter + '</td>';
						html += '<td>' + bookList[b].bookPublisher + '</td>';
						html += '<td>' + bookList[b].bookPrice + '</td>';
						html += '<td><button onclick="bookDel(' + bookList[b].bookId + ',this)">삭제</button></td>';
						html += '</tr>'
 */
					}


				})

			//tr생성
			const fields = ['bookCode', 'bookName', 'bookWriter', 'bookPublisher', 'bookPrice'];
			function makeTr(book) {
				console.log(book);
				let tr = document.createElement('tr');
				tr.setAttribute('class', 'listTr')
				let td = document.createElement('td');
				//체크박스
				let check = document.createElement('input');
				check.setAttribute('type', 'checkbox');
				//td.append(check);
				//tr.append(td);
				//체크박스 속성 / data-사용자속성 정의
				check.setAttribute('data-bid', book.bookId);
				check.setAttribute('class', 'book_chk');
				td.append(check);
				tr.append(td);

				for (let prop of fields) {

					let td = document.createElement('td');
					console.log(book[prop]);
					td.innerText = book[prop];
					tr.append(td);
				}
				td = document.createElement('td');
				let btn = document.createElement('button');
				btn.innerText = "삭제";
				btn.addEventListener('click', bookDel);
				td.appendChild(btn);
				tr.appendChild(td);

				return tr;
			}


			//등록
			document.querySelector('.addRow').addEventListener('click', function (e) {
				let bookCode = document.querySelector('input[name=bCode]').value;
				let bookName = document.querySelector('input[name=bName]').value;
				let bookWriter = document.querySelector('input[name=bWriter]').value;
				let bookPublisher = document.querySelector('input[name=bPublisher]').value;
				let bookPrice = document.querySelector('input[name=bPrice]').value;
				const book = { bookCode: bookCode, bookName: bookName, bookWriter: bookWriter, bookPublisher: bookPublisher, bookPrice: bookPrice }
				console.log(book);

				bookObj.bookAdd(book, function (data) {
					console.log('bookadd 들어옴')
					console.log(data);
					//등록 code here

					if (data.retCode == 'Success') {
						let tr = makeTr(data.data);
						document.querySelector('#bookList').appendChild(tr);
						fieldInit();//댓글등록후창비우기

					} else if (data.retCode == 'Fail') {
						alert("처리중 에러")
					} else {
						alert("잘못된코드반환")
					}
				})
			});

			function fieldInit() { //댓글등록후 창 비우기
				document.querySelector('input[name=bCode]').value = '';
				document.querySelector('input[name=bName]').value = '';
				document.querySelector('input[name=bWriter]').value = '';
				document.querySelector('input[name=bPublisher]').value = '';
				document.querySelector('input[name=bPrice]').value = '';
			}


			//삭제
			/* function deleteBook(e) {
				let bookId = e.target.parentElement.parentElement.getAttribute('bookId');

				bookObj.bookDelete(bookId, function (result) { //result는 변수이름
					console.log(bookId);
					console.log(result);
					if (result.retCode == 'Success') {
						e.target.parentElement.parentElement.remove();
					} else if (result.retCode == 'Fail') {
						alert("처리중 에러.");
					} else {
						alert("잘못된코드반환.");
					}
				});
			} */
			function bookDel(bookId, obj) {
				bookObj.bookDelete(bookId, function (result) {
					console.log(result);
					console.log(obj);
					if (result.retCode == 'Success') {
						obj.parentElement.parentElement.remove();
					} else if (result.retCode == 'Fail') {
						alert("처리중 에러.");
					} else {
						alert("잘못된코드반환.");
					}
				})
			}
			//체크된거 삭제
			document.querySelector('#delBtn').addEventListener('click', function (e) {
				let checkbox = document.querySelectorAll('.book_chk');
				console.log('del들어오나요');
				for (let c of checkbox) {
					if (c.checked == true) {
						let bookId = c.getAttribute('data-bid');
						console.log(bookId);

						bookObj.bookDelete(bookId, function (data) {
							console.log(data);

							if (data.retCode == 'Success') {
								c.parentElement.parentElement.remove();
							} else if (data.retCode == 'Fail') {
								alert("처리중 에러.");
							} else {
								alert("잘못된코드반환.");
							}
						})
					}
				}
			})

			//전체 체크
			document.querySelector('#checkAll').addEventListener('change', function (e) {
				let checkbox = document.querySelectorAll('input[type=checkbox]');
				console.log(e);
				console.log(e.target.checked);
				if (e.target.checked == true) {
					for (let prop of checkbox) {
						prop.checked = true;
					}
				} else {
					for (let prop of checkbox) {
						prop.checked = false;
					}
				}
			})
		</script>
	</body>

	</html>