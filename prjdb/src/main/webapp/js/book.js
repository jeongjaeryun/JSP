/**
 * book.js
 */
console.log('js/book.js');

class Book{
	showInfo() {
		console.log('sssss');
	}//end of showInfo
	//목록조회
	bookList(callback, errorcall){
		fetch('bookSelectList.do')
			.then((resolve)=>resolve.json())
			.then(result => callback(result))
			.catch(err => errorcall(err));
	}
	
	//등록
	bookAdd(book = {bookCode:'p1234567',bookName:'ajax뭘까',bookWriter:'ajax의 신',bookPublisher:'ajax출판사',bookPrice:'500'},callback){
		fetch('AjaxBookAdd.do',{
			method: "POST",
			headers:{
			'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: 'bookCode='+book.bookCode+'&bookName='+book.bookName+'&bookWriter='+book.bookWriter+'&bookPublisher='+book.bookPublisher+'&bookPrice='+book.bookPrice
		})
		.then(resolve => resolve.json())
		.then(result => callback(result))
		.catch(console.log);
	}
	
	//삭제
	bookDelete(bookId, callback, errorcall){
		fetch('AjaxBookDelete.do?bid='+bookId)
		.then(resolve => resolve.json())
		.then(result => callback(result))
		.catch(err => errorcall(err));
	}
}//end of BookClass