<template>
  <!-- <div>
    <ul>
      <li
        class="titleItem"
        v-for="(row,index) in titList"
        :key="index"
      >{{row.name}}</li>
    </ul>
  </div> -->
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  <div>
    <div class="mainDiv" v-for="(row,index) in titList" :key="index">
      <h2>{{row.title}}</h2>
      <ul>
        <li><span>{{row.oldTit}}：{{row.oldDate}}</span></li>
        <li>{{row.ApiTit}}：{{row.ApiDate}}</li>
        <li>{{row.resTit}}：{{row.resource}}</li>
      </ul>
      <div class="viewDiv">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'typeMenu',
    props:{
      titList:Array
    }
  }
</script>

<style lang="scss" scoped>
.mainDiv{
  width: 600px;
  height:300px;
  // background: red;
  margin-top: 15px;
  margin-left: 30px;
  float: left;
  padding: 10px 0;
  border-bottom: 1px solid blue;
  h2{
    width:24px;
    height:100px;
    float: left;
    margin-top:70px;
    margin-left: 6px;
  }
  ul{
    float:right;
    li{
      float: left;
      width: 170px;
      border: 1px solid orange;
      height: 50px;
      text-align: center;
      line-height: 50px;
      margin-left: 20px;
    }
    li:nth-child(1){
      margin-left:0;
    }
  }
  .viewDiv{
    width: 550px;
    height:200px ;
    background: pink;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
}
</style>
