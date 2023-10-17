//app.js
import myAddTodo from "./components/myAddTodo.js";

import myTodoList from "./components/myTodoList.js";
//Root Component Template
const template = `
<div>
  <my-todo-add v-if="addOK" v-on:save-todo="todoSave"></my-todo-add>
  <my-todo-list v-if="listOK" v-bind:datas="dataArray.todo" v-on:add-todo="addTodo" v-on:delete-todo="deleteTodo"
  v-on:line-todo="todoCheck"></my-todo-list>
</div>
`;

new Vue({
  el:'#app',
  template:template,
  data:{
    addOK:false,
    listOK:false,
    dataArray:{}
  },
  components:{
    'my-todo-add':myAddTodo,
    'my-todo-list':myTodoList
  },
  methods:{
    todoList(){ //목록화면 출력
    this.addOK=false;
    this.listOK=true;
    },
    addTodo(){ //등록화면 출력
      this.addOK=true;
      this.listOK=false;
    },
    todoSave(content,date,checkline){//todo 저장버튼
      let no =1;
     if(content !='' && date != ''){
       if(this.dataArray.todo.length != 0){
         let idx = this.dataArray.todo.length -1;
         no = Number(this.dataArray.todo[idx].no)+1;
       }
       let todo ={no, content, date, checkline}
 
       this.dataArray.todo.push(todo);
 
       this.todoList();
     }else{
      alert('todo를 입력하세요')
     }
    },
    deleteTodo(no){
      this.dataArray.todo.forEach((item,idx) => {
        if(item.no == no){
          this.dataArray.todo.splice(idx,1);
        }
      });
    },
    todoCheck(no){
      this.dataArray.todo.forEach((item,idx) => {
        if(item.no == no){
          if(item.checkline==true){
            item.checkline=false;
          }else{
            item.checkline=true;
          }
        }
      });
    }
  },
  created:function(){
    //Todo.json 데이터 목록 출력
    fetch('./data/Todo.json')
    .then(resolve => resolve.json())
    .then(result => {
      this.dataArray = result;
      this.todoList(); //목록페이지 open

    })
    .catch(err=>{
      console.log('passing error:',err);
    })
  }
})