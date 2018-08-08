<template>
  <div class="rankInfo">
    <div class="rankInfoBanner" :style="{backgroundImage:'url('+imgUrl+')'}">
      <div class="updateTime">
        <p>上次更新时间：{{updateTime()}}</p>
      </div>
    </div>

    <div class="rankInfoList">
      <mt-cell v-for="(item,index) in songList" :title="item.filename" :key="index" @click.native="playAudio(index)">
        <span class="rankIndex" :class="{'rankFirst':index==0,'rankSecond':index==1,'rankThird':index==2,'rankGood':index<3}">{{index + 1}}</span>
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
        opacity:0
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
      updateTime(){
        const time = new Date();
        const year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDay();
        month = (month < 10) ? ('0' + month) : month;
        date = (date < 10) ? ('0' + date) : date;
        return `${year}-${month}-${date}`
      },
      getRankInfo(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        var infoId = this.$route.params.id;
        axios.get(`/songList/rank/info/?rankid=${infoId}&page=1&json=true`).then(({data})=>{
          Indicator.close();
          this.imgUrl = data.info.banner7url.replace('{size}','400');
          this.songList = data.songs.list;
          var rankName = data.info.rankname;
          this.$store.commit('setRankHeadTitle',rankName)
        })
      }

    }
  }
</script>

<style>
  .rankInfo .mint-cell-title{padding-left: 35px;}
</style>


