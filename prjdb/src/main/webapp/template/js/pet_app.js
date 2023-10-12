
App = {
	adoptedAry: [],//adopted.json의 정보를 저장. 입양버튼을 클릭시 id를 저장 입양된 강아지들...
	init: function() {
		// adopted.json 파일의 정보를 읽어서 애완견의 정보를 활용해서 페이지 생성.

		fetch("./json/pets.json")
			.then((res) => {
				return res.json()
			})
			.then(obj => App.info(obj));
		//console.log(App.adoptedAry); App.initMarkData();가 비동기라서(실행과 동시에 실행돼) 빈배열 나옴
	}, // end of init;
	info: function(data) {
		//목록불러오기
		data.forEach((item, idx) => {
			let template = document.querySelector('#petTemplate').cloneNode(true);
			template.style.display = 'block';
			//console.log(item.name);
			//이미지
			let img = template.querySelector('.panel-body>img');
			img.src = "./" + item.picture;
			//강아지 이름
			let name = template.getElementsByClassName("panel-title")[0];
			name.innerText = item.name;
			//강아지종
			let breed = template.getElementsByClassName("pet-breed")[0];
			breed.innerText = item.breed;
			//지역
			let location = template.getElementsByClassName("pet-location")[0];
			location.innerText = item.location;
			//나이
			let age = template.getElementsByClassName("pet-age")[0];
			age.innerText = item.age;
			let btn = template.getElementsByClassName("btn-adopt")[0];
			btn.setAttribute("data-id", item.id);

			document.querySelector('#petsRow').append(template);

		})
		App.initContract();

		//document.querySelector('div.col-lg-3').style.display = "none";
	},//end of info
	initContract: function() {
		App.initMarkData();
		// initMarkData 호출.
		// bindEvents 호출.
		App.bindEvents();

	}, // end of initContract;

	bindEvents: function() {
		// 입양버튼에 클릭이벤트 등록. -> markAdopted를 활용하기
		let btn = document.querySelectorAll('.btn-adopt');
		for(let i=0; i<btn.length; i++){
			btn[i].setAttribute('onclick','App.markAdopted(event)');
		}
	},

	initMarkData: function() {
		// adopted.json 정보를 활용해서 입양처리하기.
		fetch("./json/adopted.json")
			.then((res) => {
				return res.json()
			})
			.then((obj) => {
				//console.log(obj);
				obj.forEach((item, idx) => {
					App.adoptedAry.push(item);

				})
				//버튼 disable
				//1. ary애들이랑 버튼에 있는 넘버랑 비교
				//1-1. ary애들 : App.adoptedAry, 버튼들 : document.querySelectorAll('.btn-adopt');
				console.log(App.adoptedAry);
				let btn = document.querySelectorAll('.btn-adopt');
				console.log(btn);
				//1-2. ary애들, 버튼들의 data-id를 비교
				for (let i = 0; i < btn.length; i++) {
					for (let j = 0; j < App.adoptedAry.length; j++) {
						if (btn[i].getAttribute('data-id') == App.adoptedAry[j]) {
							btn[i].disabled = true;
						}
					}

				}

			})


	},

	markAdopted: function(e) {
		// 입양처리. adoptedAry에 추가.
		//클릭해서 배열에 그강아지의 no가 추가
		App.adoptedAry.push(Number(e.target.getAttribute('data-id')));
		console.log(App.adoptedAry);
		App.handleAdopt(e);
		
	}, // end of markAdopted;

	handleAdopt: function(e) {
		// 사용자화면에서 입양버튼 클릭 시 처리. 버튼 비활성화작업 disabled
		e.target.disabled = true;
	//e.target.disabled=true;
	} // end of handleAdopt;

}; // end of App;


$(function() {
	App.init();
});
