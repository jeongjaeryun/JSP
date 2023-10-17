export default{
  template:`
  <div id="myDIV" class="header">
  <h2 style="margin:5px">My To Do List</h2>
  <input type="text" id="myInput" v-model="content" placeholder="todo...">
  <input type="date" v-model="date" placeholder="Date...">
  <span v-on:click="todoSave" class="addBtn">Add</span>
</div>
  `,
  data:function(){
    return{
      content:'',
      date:'',
      checkline:false
    }
  },
  methods:{
    todoSave(){
      this.$emit('save-todo',this.content, this.date, this.checkline)
    }
  }
}