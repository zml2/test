<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 2" />
    <ul class="ulMock">
      <li v-for="(item,i) in list"><span>{{item.email}}</span><span>{{item.name}}</span></li>
    </ul>
  </div>
</template>
<script>
import { getMenu } from '@/api/menu2'
// import { getList } from '@/api/table'
export default {
  data(){
    return {
      list: [],
    }
  },
  mounted() {
    getMenu().then(response => {
      console.log(response)
      this.list = response.data.items;
      console.log(this.list)

    })
  }

}
</script>

<style scoped>
.ulMock{
  width: 500px;
  height: 500px;
  background: pink;
  margin:0 auto;
}
</style>
