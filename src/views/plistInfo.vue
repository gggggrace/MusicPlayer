<template>
  <div class="plistInfo">
    <div class="rankInfoBanner" :style="{backgroundImage:'url('+imgUrl+')'}"></div>
    <div class="plistDetail" :class="{'showDetail' : toggleDetail}">
      <p>{{plistDetail}}</p>
      <span class="plistDetailShow" @click="toggleDetailBtn"></span>
    </div>
    <div class="rankInfoList">
      <mt-cell v-for="(item,index) in songList" :title="item.filename" :key="index" @click.native="playAudio(index)">
        <img src="../assets/images/download_icon.png" width="20">
      </mt-cell>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import { PLAY_AUDIO } from '../mixins'
  import axios from 'axios'
  export default {
    mixins: [PLAY_AUDIO],
    data(){
      return {
        imgUrl:'',
        songList:[],
        opacity:0,
        plistDetail:'',
        toggleDetail:false
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRankHead',true)
        vm.getRankInfo()
        window.onscroll = () => {
          vm.opacity = window.pageYOffset / 250;
          vm.$store.commit('setRankHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
        }
      })
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRankHead', false)
      // window.onscroll = null
      next()
    },
    methods: {
      getRankInfo(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        var infoId = this.$route.params.id;
        axios.get(`/songList/plist/list/${infoId}&json=true`).then(({data})=>{
          Indicator.close();
          console.log(1111,data)
          this.imgUrl = data.info.list.imgurl.replace('{size}','400');
          this.songList = data.list.list.info;
          this.plistDetail = data.info.list.intro;
          var rankName = data.info.list.specialname;
          this.$store.commit('setRankHeadTitle',rankName)
        })
      },
      toggleDetailBtn(){
        this.toggleDetail = !this.toggleDetail
      }

    }
  }
</script>

<style>
  .rankInfo .mint-cell-title{padding-left: 35px;}
</style>


