// cart.js 의 시작부분.
console.log('cart.js');

// Intl 객체를 사용하여 포맷 지정.
function number_format(amount) {
	return new Intl.NumberFormat('ko-KR', {
		style: 'currency',
		currency: 'KRW'
	}).format(amount);
}

// prototype에 정의해서 메소드 추가: 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function () {
	if (this == 0) return 0;
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
	return nstr;
};

// 1,000,000 => 1000000
//console.log('1,000,000'.replace(/,/g, ''));

let basket = {
	cartCount: 0,
	cartTotal: 0,
	delCheckedItem: function () {
	// 선택된 상품을 삭제....금액을 재계산.
		document.querySelectorAll('input[name=buy]:checked').forEach(function (e) {
            e.closest('.data').remove();
        });
         this.reCalc();
	},
	delAllItem: function () {
	// 장바구니 비우기 하면 실행되도록..
		 document.querySelectorAll('.row.data').forEach(function (e) {
            e.remove();
        });
         this.reCalc();
	},
	reCalc: function () {
	// 금액을 재계산.
		//수량
		let count = document.querySelectorAll('.p_num');
		let num = 0;
		
		count.forEach(function(e){
			num += Number(e.value);
		})
		//수량
		document.querySelector('div.sumcount').innerText = "상품갯수: "+num+"개";
		//합계
		let sumList = document.querySelectorAll('div.sum');
		num = 0;
		sumList.forEach(function(e){
			num += Number(e.getAttribute('data-sum'));
		})
		document.querySelector('div.summoney').innerText = "합계금액: "+num.formatNumber()+"원";
	
	},
	updateUI: function () {
	// 화면을 refresh.
	},
	changePNum: function (e,type) {
	// 수량변경. 
/*		let up = document.querySelectorAll('#countUp');
		let down = document.querySelectorAll('#countDown');*/
		let countVal = e.target.closest('.updown').querySelector('.p_num');
		
		if(type=="up"){
			countVal.value= Number(countVal.value)+ 1;
		}else if(type=="down"){
			if(Number(countVal.value)>1){
			countVal.value= Number(countVal.value)- 1;
			}
			
		}
		let price = e.target.closest('.data').querySelector('div.basketprice');
		console.log(price.getAttribute('data-price'));
		
		let sum = price.getAttribute('data-price')*Number(countVal.value);
		console.log(sum);
		let totalSum=e.target.closest('.data').querySelector('.sum');
		totalSum.setAttribute('data-sum',sum);
		totalSum.innerText = sum;
		this.reCalc();
		
	},
	delItem: function (e) {
	// 삭제버튼 클릭시.
		e.parentElement.parentElement.parentElement.remove();
		this.reCalc();
	},
	cartList: function () {
	// 상품목록 출력...아래에 있는 상품정보를 활용해서 수량만큼 출력이 되도록.
		cartItems.forEach((item, idx) => {
			let template = document.querySelector('div.row.data').cloneNode(true);
			//이미지
			let img = template.querySelector('.img>img');
			img.src="./img/"+item.image;
			//let img = document.getElementById('pic').setAttribute('src', "./img/"+cartItems[idx].image);
			//상품명
			let pname = template.getElementsByClassName("pname")[0];
			pname.innerText=item.productNm;
			//상품가격
			let price = template.getElementsByClassName("basketprice")[0];
			price.innerText=(item.price).formatNumber()+"원";
			price.setAttribute('data-price',item.price);
			/*
			let sum = template.getElementsByClassName("sum")[0];
			let num = template.querySelector('input[name=p_num1]').value;
			sum.innerText = (item.price * num).formatNumber()+"원";*/
			//수량(id,name,value,button)
			
			template.childNodes[3].childNodes[3].childNodes[1].childNodes[1].setAttribute('id','p_num'+item.no);
			template.childNodes[3].childNodes[3].childNodes[1].childNodes[1].setAttribute('name','p_num'+item.no);
			template.childNodes[3].childNodes[3].childNodes[1].childNodes[1].setAttribute('value',item.qty);
			template.childNodes[3].childNodes[3].childNodes[1].childNodes[3].setAttribute('onclick','basket.changePNum(event, "up")');
			template.childNodes[3].childNodes[3].childNodes[1].childNodes[3].setAttribute('id','countUp');
			template.childNodes[3].childNodes[3].childNodes[1].childNodes[5].setAttribute('onclick','basket.changePNum(event, "down")');
			template.childNodes[3].childNodes[3].childNodes[1].childNodes[5].setAttribute('id','countDown');

			//합계
			template.childNodes[3].childNodes[5].setAttribute('data-sum',item.price*item.qty);
			template.childNodes[3].childNodes[5].innerText = (item.price*item.qty).formatNumber()+"원";
			//삭제
			template.childNodes[5].childNodes[1].childNodes[1].setAttribute('onclick','basket.delItem(this)');
			document.querySelector('.basketdiv').append(template);
			
		})
		document.querySelector('div.row.data').style.display="none";
		basket.reCalc();
	}
};

var cartItems = [{
		no: 1,
		productNm: '장바구니1',
		qty: 2,
		price: 12000,
		image: 'basket1.jpg'
	},
	{
		no: 2,
		productNm: '장바구니2',
		qty: 1,
		price: 22000,
		image: 'basket2.jpg'
	},
	{
		no: 3,
		productNm: '고급장바구니',
		qty: 1,
		price: 13600,
		image: 'basket3.jpg'
	}
]
	



basket.cartList();

document.querySelector('#ckDel').addEventListener('click',function(e){
	basket.delCheckedItem();
})

document.querySelector('#cartDel').addEventListener('click',function(e){
	basket.delAllItem();
})

// 1. db를 연결해서 사용하려면 아래의 내용으로 작업을 하면 됨.
//fetch('cartSelectList')
//	.then(resolve => resolve.json())
//	.then(result => {
//		//console.log(result);
//		basket.cartList();
//	})
//	.catch(err => console.log(err))

