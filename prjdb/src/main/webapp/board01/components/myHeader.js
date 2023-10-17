//myHeader.js

export default{
  template:`
  <div>
   <h3>간단한 게시판</h3>
   <p>게시판 데이터는 board.json활용해서 초기화</p>
   <input type="file" v-on:change="loadData">
  </div>
  `,
  methods:{
    loadData(e){
      console.log(e.target.files[0]);
      let file = e.target.files[0];

      let reader = new FileReader();
      reader.addEventListener('loadend',()=>{
        let jsonData = JSON.parse(reader.result);
        console.log(jsonData); //json문자열 => JSON.parse() => object
        
        this.$emit('json-data', jsonData);//dataArray에 값을 저장
      })
      reader.readAsText(file); 
    }
  }
}