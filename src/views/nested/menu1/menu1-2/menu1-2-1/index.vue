<template>
  <div>
    <div class="model">
      <div class="page-container">
        <div class="step1 text-center shadow" v-show='step === 1'>
          <i class="btn-close el-icon-close" @click='closeGuide'></i>
          <!-- <img src="./../images/guide/guide-img-start.png" alt=""> -->
          <p class="font-18 color-333 text">{{$t('m.guide.text1')}}</p>
          <p class="font-12 color-999 choose">{{$t('m.guide.choose')}}</p>
          <el-popover
            placement="bottom"
            width="160"
            v-model="showPopover"
            trigger="hover">
            <ul class="lang-list">
              <li class="font-14"  @click='changeLang(item)' v-for="(item,index) in list" :key='index' :value='item.lang'>{{item.lang}}</li>
            </ul>
            <span slot="reference" class="color-555 touch">{{lang}} &nbsp;&nbsp; <i class="el-icon-arrow-down"></i> </span>
          </el-popover>
          <br>
          <el-button type='warning' @click="step = 2" class="btn">{{$t('m.common.next')}}</el-button>
        </div>
        <div class="step2 shadow"
              :class="{nextStep2: step === 2 && direction === 'next', preStep2: step === 2 && direction === 'pre',
                      nextStep3: step === 3 && direction === 'next', preStep3: step === 3 && direction === 'pre',
                      nextStep4: step === 4 && direction === 'next', preStep4: step === 4 && direction === 'pre',
                      nextStep5: step === 5 && direction === 'next'}"
              v-show='step !== 1'>
          <div class="mark text-center">
            <span v-if='step === 2'>{{$t('m.menu.title2')}}</span>
            <span v-if='step === 3'>{{$t('m.menu.title3')}}</span>
            <span v-if='step === 4'>{{$t('m.menu.title4')}}</span>
            <span v-if='step === 5'>{{$t('m.header.helpCenter')}}</span>
            &nbsp;&nbsp; <i class="el-icon-arrow-down"></i></div>
          <div class="vl"></div>
          <div class="main">
            <i class="btn-close el-icon-close" @click='closeGuide'></i>
            <!-- <img src="./../images/guide/guide-img-adcenter.png" class="fl" alt=""> -->
            <div class="fr right">
              <p v-if='step === 2'>{{$t('m.guide.text2')}}</p>
              <p v-if='step === 3'>{{$t('m.guide.text3')}}</p>
              <p v-if='step === 4'>{{$t('m.guide.text4')}}</p>
              <p v-if='step === 5'>{{$t('m.guide.text5')}}</p>
              <p class="text-right btn-list">
                <el-button plain @click="step--, direction = 'pre'">
                  <!-- <img src="./../images/guide/guide-icon-left-default.png" alt=""> -->
                </el-button>
                <el-button class="btn-next"  v-if='step !== 5'  @click="step++, direction = 'next'">
                  <!-- <img src="./../images/guide/guide-icon-right-default.png" alt=""> -->
                </el-button>
                <el-button  v-if='step === 5'  @click='closeGuide' class="btn-next">
                  {{$t('m.guide.start')}}
                </el-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: [ 'step' ],
  data () {
    return {
      step: 1,
      direction: 'next',
      showPopover: false,
      list: [
        {
          lang: 'English',
          code: 'en'
        }, {
          lang: 'Spanish',
          code: 'es'
        }, {
          lang: 'Portuguese',
          code: 'pt'
        }, {
          lang: 'Russian',
          code: 'ru'
        }, {
          lang: 'Italian',
          code: 'id'
        }, {
          lang: 'French',
          code: 'fr'
        }, {
          lang: 'German',
          code: 'de'
        }, {
          lang: 'Polish',
          code: 'pl'
        }
      ],
      lang: 'English'
    }
  },

  components: {},

  created: function () {
  },

  methods: {
    changeLang: function (item) {
      this.$emit('changeLang', item)
      this.lang = item.lang
      this.showPopover = false
    },
    closeGuide: function () {
      this.$emit('closeGuide')
    }
  }
}

</script>
<style lang='scss' scoped>
.page-container{
  position :relative;
  line-height :12px;
}
.model{
  width: 100vw;
  height:100vh;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.shadow{
  box-shadow:0px 2px 3px 1px rgba(0,0,0,0.1);
  border-radius: 4px;
}
.btn-close{
  position :absolute;
  top :5px;
  right :5px;
  cursor: pointer;
}
.main{
  padding :16px 7px 12px 16px;
  .right{
    width: 240px;
    p{
      font-size :14px;
      color: #333333;
      line-height :22px;
    }
    .btn-list{
      position :absolute;
      bottom :12px;
      right: 7px;
      .el-button{
        width :60px;
        height: 24px;
      }
      .btn-next{
        background: rgba(255,233,207,1);
        border-radius :2px;
        border: 1px solid rgba(251,136,0,1);
      }
    }
  }
}
.step1{
  width: 400px;
  height: 474px;
  margin :auto;
  padding :60px 48px 0;
  background: #fff;
  margin-top :200px;
  position: relative;
  .text{
    line-height: 28px;
    margin-top: 40px;
    margin-bottom :30px;
  }
  .choose{
    line-height :17px;
    font-style :italic;
    margin-bottom: 10px;
  }
  .btn{
    width :140px;
    height: 40px;
    margin-top: 40px;
  }
}
.step2{
  position: absolute;
  top: 170px;
  left: 80px;
  width: 388px;
  height: 140px;
  background: #fff;
}
.nextStep2{
  animation: goToStep2 0.5s ease;
}
.preStep2{
  animation :backToStep2 0.5s ease;
}
.preStep3{
  left: 200px;
  animation :backToStep3 0.5s ease;
}
.nextStep3{
  left :200px;
  animation: goToStep3 0.5s ease;
}
.preStep4{
  left: 320px;
  width :388px;
  animation: backToStep4 0.6s ease;
  .mark{
    width: 160px;
  }
}
.nextStep4{
  left :320px;
  width: 388px;
  animation: goToStep4 0.5s ease;
  .mark{
    width: 160px;
  }
}
.nextStep5{
  left :unset;
  left: 825px;
  top :90px;
  animation :goToStep5 0.6s ease;
  .mark{
    width: 180px;
    left: 40px;
  }
  .vl{
    left :100px;
  }
}
@keyframes backToStep2 {
  0% {
    transform: scale(1.0);
    left: 200px;
  }
  50%{
    transform: scale(0);
    left: 0px;
  }
  100% {
    transform: scale(1.0);
    left: 80px;
  }
}
@keyframes goToStep2 {
  from {
    transform: scale(0)
  }
  to{
    transform: scale(1.0)
  }
}
@keyframes goToStep3 {
  0% {
    transform: scale(1.0);
    left: 80px;
  }
  50%{
    transform: scale(0);
    left: 140px;
  }
  100% {
    transform: scale(1.0);
    left :200px;
  }
}
@keyframes backToStep3 {
  0% {
    transform: scale(1.0);
    left: 320px;
  }
  50%{
    transform: scale(0);
    left: 160px;
  }
  100% {
    transform: scale(1.0);
    left :200px;
  }
}
@keyframes goToStep4 {
  0% {
    transform: scale(1.0);
    left :200px;
  }
  50%{
    transform: scale(0);
    left :240px;
  }
  100% {
    transform: scale(1.0);
    left :320px;
  }
}
@keyframes backToStep4 {
  0% {
    transform: scale(1.0);
    left: 825px;
  }
  50%{
    transform: scale(0);
    left: 520px;
    top: 120px;
  }
  100% {
    transform: scale(1.0);
    left: 320px;
    top: 170px;
  }
}
@keyframes goToStep5 {
  0% {
    transform: scale(1.0);
    left: 320px;
  }
  50%{
    transform: scale(0);
    left :520px;
    top :120px;
  }
  100% {
    transform: scale(1.0);
    left: 825px;
    top: 90px;
  }
}
.mark{
  width: 125px;
  height: 40px;
  line-height: 40px;
  border-radius :20px;
  position :absolute;
  font-size: 13px;
  top :-60px;
  left: 0;
  background: #fff;
}
.vl{
  width: 2px;
  height :20px;
  background :#ffffff;
  position :absolute;
  top :-20px;
  left: 60px;
}
.lang-list{
    cursor: pointer;
    list-style: none;
    color: #222222;
    line-height: 36px;
    padding-top: 10px;
    .user-email{
      padding-left :24px;
      color :#555;
      border-bottom :1px solid #ddd;
    }
    li{
      padding-left: 24px;
    }
    li:hover{
      color: #ff9e00;
      background :rgba(255,158,0,0.1);
    }
  }
</style>
