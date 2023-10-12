let memberAry = [];
fetch('./MOCK_DATA.json')
  .then(resolve => resolve.json()) //then은 함수를 매개값으로 받음
  .then(result => {
    memberAry = result;
    console.log(memberAry);
    let str = "";
    memberAry.forEach((member,idx,ary) => {
      if(idx==0){
        str += '<ul>';
      }
      if(idx < 5){
        str += '<li>id: '+member.id+', 이름: '+member.first_name+'</li>';
      }
      if(idx + 1 == memberAry.length){
        str += '</ul>'
      }
    });//end of memberAry;
    // document.querySelector('#list').innerHTML = str;

    let ary5 = memberAry.filter((member,idx,ary)=>{
      //console.log(member,idx,ary);
      return idx< 5;

    })
    console.log(ary5);

    ary5.reduce((acc, member, idx, ary)=>{
      console.log(acc, member, idx, ary);
      return member;
    },0); //초기값을 설정하면 누산값...뭐지? acc 초기값 0

    // [0,1,2,3,4].reduce(function(acc,num,idx,ary){
      
    // })

  //   result =  [0,1,2,3,4].reduce((acc,num,idx,ary)=>{//배열은 reduce 메소드를 쓸수있음
  //     console.log(acc, num, idx);
  //    // return acc+num; //초기값과 현재값 더한 값 => 배열의 누적값
  //    return acc > num ? acc:num;
  //   },10) //acc는 초기값, num은 현재값, idx는 인덱스 , 초기값(여기선 10)은 처음데이터의 누산값으로 활용됨!!
    
    
  //   console.log(result);
  // })

  result =  [3,2,6,9,5].reduce((acc,num,idx,ary)=>{//배열은 reduce 메소드를 쓸수있음
      console.log(acc, num, idx);
   
    //배열 평균값 구하기
     return (idx+1 == ary.length)? (acc+num)/ary.length:(acc+num); //idx+1 == ary.length => 마지막 순번을 알 수 있음
    },0) //acc는 초기값, num은 현재값, idx는 인덱스 , 초기값(여기선 0)은 처음데이터의 누산값으로 활용됨!!
    
    console.log(result);
  })
