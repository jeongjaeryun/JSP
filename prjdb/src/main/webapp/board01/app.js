//app.js
import myBoardWrite from './components/myBoardWrite.js';

import myHeader from './components/myHeader.js';

import myBoardList from './components/myBoardList.js';

import myBoardRead from './components/myBoardRead.js';

//  const myHeader = {
// //   template:``,
// //   data: function(){
// //     return{

// //     }
// //   },
// //   method:{

// //   }
//  }
// //목록
// const myBoardList ={

// }
// //상세 글 페이지
// const myBoardRead={
  
// }
// // //작성 페이지
// // const myBoardWrite={
// //   print: function(){
// //     console.log('myboardwrite print')
// //   }
// // }
// myBoardWrite.print();

//Root Component Template
const template = `
<div>
  <my-header v-on:json-data="jsonData"></my-header>
  <my-board-list v-if="listOK" v-bind:obj="dataArray.board"
   v-on:board-write="boardWrite" v-on:board-delete="boardDelete" v-on:board-read="boardReadEvent"></my-board-list>
  <my-board-read v-if="readOK" v-bind:obj="board" v-on:board-list="boardList"></my-board-read>
  <my-board-write v-if="writeOK" v-on:board-list="boardList" v-on:board-save="boardSave"></my-board-write>
</div>
`;

new Vue({
  el:'#app', //div app에 들어갈 템플릿으로 사용하겠다...
  template:template,
  data:{
    listOK:false,
    readOK:false,
    writeOK:false,
    dataArray:{},//board.json {board:[{},{},{}]}값을 넘겨줄거임
    board:{},
  
  },
  components:{
    'my-header': myHeader,
    'my-board-list':myBoardList,
    'my-board-read':myBoardRead,
    'my-board-write':myBoardWrite
  },
  methods:{
    boardList(){ // 목록화면 출력
      this.listOK=true;
      this.readOK=false;
      this.writeOK=false;
    },
    boardWrite(){ // 작성화면 출력
      this.writeOK=true;
      this.listOK=false;
      this.readOK=false;
    },
    boardRead(){ // 상세화면 출력
      this.readOK=true;
      this.writeOK=false;
      this.listOK=false;
    },
    boardSave(title, content){
      // no=max+1, view=0;
      let no = 1;
      let view = 0;
      if(this.dataArray.board.length != 0){
        let idx = this.dataArray.board.length -1;
        no = Number(this.dataArray.board[idx].no) + 1; 
      }

      let board={no, title, content, view}

      this.dataArray.board.push(board);

      //목록화면 실행
      this. boardList();

    },
    boardDelete(no){
      //no 삭제 후 dataArray에 바뀐 값을 저장
      this.dataArray.board.forEach((item,idx) => {
        if(item.no==no){
          this.dataArray.board.splice(idx, 1);
        }
        
      });
    },
    boardReadEvent(board){ // 목록에서 제목 누르면 글상세
      // this.dataArray.board.view = board.view+1;
      this.boardRead();
      //board.view = Number(board.view)+1;
      board.view++;
      this.board = board;
    },
    jsonData(jsonData){
      this.dataArray = jsonData;
      this.boardList();
    }
  },

  created:function(){
    //board.json 데이터 목록 출력
    // fetch('./data/board.json')
    // .then(resolve => resolve.json())
    // .then(result => {
    //   this.dataArray = result;
    //   this.boardList(); //목록페이지 open

    // })
    // .catch(err=>{
    //   console.log('passing error:',err);
    // })
  }
})