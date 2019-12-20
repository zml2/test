<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <!-- <div class="mainDiv">
      <h2>数据资源</h2>
      <ul>
        <li>原始数据数量：1234个</li>
        <li>API数据数量：1234个</li>
        <li>资源申请量：235个</li>
      </ul>
      <div class="viewDiv">

      </div>
    </div> -->
    <!-- <svg-icon icon-class="user"></svg-icon> -->
    <typeMenu :titList='titList'></typeMenu>
  </div>
</template>

<script>
import typeMenu from '../../components/typeMenu.vue'
import { mapGetters } from 'vuex'
import data from '../../assets/js/dashboard'
export default {
  name: 'Dashboard',
  data(){
    return {
      titList:data.titList
    }
  },
  computed: {
    // ...mapGetters([
    //   'name'
    // ])
  },
  components:{
    typeMenu
  }
}
</script>

<style lang="scss" scoped>
.mainDiv{
  width: 600px;
  height:300px;
  background: red;
  margin-top: 15px;
  margin-left: 30px;
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
