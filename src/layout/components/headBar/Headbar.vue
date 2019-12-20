<template>
  <div>
    <el-row>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <i class="el-icon-edit"></i>
          <p>当前用户：&nbsp; &nbsp;郭奕汐</p>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-light">
          <i class="el-icon-edit"></i>
          <p>当前登录时间：{{newDate}}</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <i class="el-icon-edit"></i>
          <p>认证方式：短信动态码认证</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <i class="el-icon-edit"></i>
          <p>登录IP：135.10.20.248</p>
        </div>
      </el-col>
      <el-col :span="6" style="float:right">
        <div class="grid-content bg-purple">
          <i class="el-icon-edit"></i>
          <p>【系统消息】您有一条工单待处理，请及时查看</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { timeFormat } from '../../../filter/index'
  export default {
    name:'Headbar',
    data(){
      return{
        newDate:''
      }
    },
    mounted(){
      const _this = this;
      let _time = (new Date()).getTime(); //返回1970年1月1日至当前时间的毫秒数
      _this.newDate = timeFormat(_time,'yyyy/mm/dd hh:min:ss');
      // console.log(_this.newDate)
      setInterval(function(){
        let _time = (new Date()).getTime();
        _this.newDate = timeFormat(_time,'yyyy/mm/dd hh:min:ss')
      },1000)

    }

  }
</script>

<style lang="scss" scoped>
.el-row {
  height: 36px;
  min-width: 1260px;
  background: #d3dce6;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    // background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    font-size: 12px;
    line-height: 36px;
    i{
      float: left;
      line-height: 36px;
    }
    p{
      float: left;
      margin-top: 0;
      margin-left: 10px;

    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
