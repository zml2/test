<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click='handlePrev'
      @next-click='handleClick'
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      background
      :total="pageObj.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name:'pagination',
    data(){
      return{
        currentPage2: 1,
      }
    },
    props:['pageObj'],
    methods:{
      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit('callback',val)
      console.log(this.pageObj)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handlePrev(val){
      console.log(`上一页 ${val}`)
    },
    handleClick(val){
      console.log(`下一页 ${val}`)
    }

    }
  }
</script>

<style lang="scss" scoped>

</style>
