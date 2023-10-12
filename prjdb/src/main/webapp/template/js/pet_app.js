
App = {
	adoptedAry: [],//adopted.json의 정보를 저장. 입양버튼을 클릭시 id를 저장 입양된 강아지들...
	init: function() {
		// adopted.json 파일의 정보를 읽어서 애완견의 정보를 활용해서 페이지 생성.
		
		fetch("./json/pets.json")
			.then((res) => {
				return res.json()
			})
			.then(obj => App.info(obj));

	}, // end of init;
	info: function(data){
		data.forEach((item,idx)=>{
			console.log(item.name);
			let template = document.querySelector('div.col-lg-3').cloneNode(true);
			document.querySelector('#petsRow').append(template);
		})
	},
	initContract: function() {
		// initMarkData 호출.
		// bindEvents 호출.

	}, // end of initContract;

	bindEvents: function() {
		// 입양버튼에 클릭이벤트 등록. -> markAdopted를 활용하기
	},

	initMarkData: function() {
		// adopted.json 정보를 활용해서 입양처리하기.

	},

	markAdopted: function() {
		// 입양처리. adoptedAry에 추가.

	}, // end of markAdopted;

	handleAdopt: function(event) {
		// 사용자화면에서 입양버튼 클릭 시 처리. 버튼 비활성화작업 disabled

	} // end of handleAdopt;

}; // end of App;


$(function() {
	App.init();
});
