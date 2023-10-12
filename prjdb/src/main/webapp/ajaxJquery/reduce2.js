//reduce2.js
//비동기방식 fetch();

async function asyncFunc() {
  let memAry = [];
  let promise = await fetch('./MOCK_DATA.json'); //fetch('./MOCK_DATA.json')리턴하는 밸류값을 promise 변수에 저장 
  let json = await promise.json(); //await 해줘야 순차적으로 진행됨
  console.log(json);

  memAry = json;
  //console.log(memAry);

  let ul = document.createElement('ul');

  memAry.reduce((acc, mem, idx, ary) => {

    let li = document.createElement('li');
    if(mem.gender=="Female"){
      li.innerHTML = 'id: ' + mem.id + ', 이름: ' + mem.first_name+', 성별: '+mem.gender;
      li.style.backgroundColor='beige';
    }else if(mem.gender =="Male"){
      li.innerHTML = 'id: ' + mem.id + ', 이름: ' + mem.first_name+', 성별: '+mem.gender;
      li.style.backgroundColor='lightblue';
    }else{
      li.innerHTML = 'id: ' + mem.id + ', 이름: ' + mem.first_name+', 성별: '+mem.gender;
      li.style.backgroundColor='purple';
    }
    
    if (idx < 20) {
      ul.append(li);
    }
    if (idx == 20) {
      acc.append(ul);
    }
    return acc;
  }, document.querySelector('#list'));




  //reduce 사용해서 
  // memAry.reduce((acc, mem, idx, ary) => {
  //   console.log(acc, mem);

  //   //마지막 순번에서 document.querySelector('#list').innerHTML = acc;
  //   if (idx + 1 == ary.length) {
  //     document.querySelector('#list').innerHTML = acc;
  //   }
  //   let str = '';
  //   if (idx == 0) {
  //     str += '</ul>';
  //   }
  //   if (idx == 5) {
  //     str += '</ul>';
  //   }
  //   str = '<li> id: ' + mem.id + ', 이름: ' + mem.first_name + '</li>';
  //   return idx < 5 ? acc + str : acc;
  // }, "");

}

asyncFunc();