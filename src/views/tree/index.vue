<template>
  <div class="app-container">
    <!-- <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    /> -->
    <div class="headDiv">
      <h2>数据筛选</h2>
      <div class="formDiv">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <el-form-item label="数据名称" prop="name">
            <el-input v-model="formInline.name" placeholder="请填写数据名称"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="sts">
            <el-select v-model="formInline.sts" placeholder="请选择">
              <el-option label="启用" value="shanghai"></el-option>
              <el-option label="停用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="formInline.type" placeholder="类型">
              <el-option label="类型A" value="shanghai"></el-option>
              <el-option label="类型B" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="submitForm('formInline')">查询</el-button>
            <el-button @click="resetForm('formInline')">
              <svg-icon icon-class='重置'></svg-icon>
              重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tableDiv">
      <h2>原始数据列表</h2>
      <!-- header-cell-style属性改变table表格表头的背景颜色和字体颜色 -->
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        border
        style="width: 1050px">
        <el-table-column
          prop="oldName"
          label="原始数据名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="scene"
          label="场景">
        </el-table-column>
        <el-table-column
          prop="sts"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="text">查看详情</el-button>
        </el-table-column>
      </el-table>
      <div class="bottomDiv">
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click='handlePrev'
          @next-click='handleClick'
          :current-page.sync="currentPage2"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          background
          :total="1000">
        </el-pagination> -->
        <pagination :pageObj='pageObj' @callback='callBackFun'></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import pagination from '../../components/pagination'
export default {
  data() {
    return {
      formInline: {
          name: '',
          sts: '',
          type:''
        },
         tableData: [{
          oldName: '2019年上半年用电量',
          type: '类型A',
          scene: '场景A，场景B',
          sts:'启用',
          createTime:'2019-09-23 9:00:21'
        }],
        // 接收分页组件传来的值
        pages:'',
        // 传给分页组件的数据
        pageObj:{
          total:200
        }
    }
  },
  components:{
    pagination
  },
  methods: {
    // 提交
      submitForm(formName) {
        console.log(this.formInline)
        const _this = this
        let formInline = _this.formInline
        console.log(formInline)
        // 发送网络请求，请求接口数据
        // this.$post('url',formInline).then(response=>{
        //   console.log(response)
        // })
        // console.log(this.$refs[formName].validate())
        // this.$refs[formName].validate((valid) => {
        //   console.log(valid)
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();// 使用重置按钮时，el-form-item标签后必须使用prop属性，不然无法重置
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    // handlePrev(val){
    //   console.log(`上一页 ${val}`)
    // },
    // handleClick(val){
    //   console.log(`下一页 ${val}`)
    // }
    callBackFun(val){
      this.pages = val;
      console.log(this.pages)
    }
  }
}
</script>
<style lang="scss">
  .app-container{
    // width: 1100px;
    .headDiv{
      width: 1100px;
      height: 120px;
      border: 1px solid #ccc;
      h2{
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
        text-indent: 16px;
      }
      .formDiv{
        .demo-form-inline{
          margin-top: 14px;
          margin-left: 16px;
        }
      }
    }
    .tableDiv{
      margin-top: 20px;
      border: 1px solid #ccc;
      width: 1100px;
      h2{
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
        text-indent: 16px;
      }
      .el-table{
        margin-top: 20px;
        margin-left: 10px;
      }
      .cell{
        text-align: center;
      }
    }
    .bottomDiv{
      margin:10px 0;
    }
  }
</style>
