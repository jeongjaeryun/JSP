//myTodoList.js
export default{
  template:`
  <div>
  <ul id="myUL"><!--컴포넌트2-->
    <li v-for="item in datas" v-on:click="todoCheck(item.no)" v-bind:class="{checked:item.checkline}">
      <span>
        {{item.no}}번 {{item.content}} {{item.date}} 
      </span>
      <span style="float: right;" v-on:click.stop="deleteTodo(item.no)">X</span>
    </li>
  </ul>
<button v-on:click="addTodo">등록화면</button>
</div>
  `,
  data:function(){
    return{

    }
  },
  props:['datas'],
  methods:{
    addTodo(){
      this.$emit('add-todo')
    },
    deleteTodo(no){
      this.$emit('delete-todo',no)
    },
    todoCheck(no){
      this.$emit('line-todo',no)
    }
  }
}