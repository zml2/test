<template>
  <div>
    <span :style="advanced && {display:'none'} || {}">fafaf</span>
    <el-button type="text" @click="dialogVisible = true">对话框Dialog</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      top='30px'
      :show-close=false
      :before-close="handleClose">
      <!-- <span>这是一段信息</span> -->
      <el-carousel arrow="always" style="height:450px" :autoplay=false>
        <el-carousel-item v-for="item in 4" :key="item" style="height:450px">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name:'menu3',
    data(){
      return{
        advanced:true,
        dialogVisible: false,
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
        }
      }
    },
    components: {
    swiper,
    swiperSlide
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
     methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style lang="scss" scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel-item{
    height: 500px;
    background: red;
  }
</style>
