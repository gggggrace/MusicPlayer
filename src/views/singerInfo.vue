<template>
  <div class="singerInfo">
    <div class="rankInfoBanner" :style="{backgroundImage:'url('+imgUrl+')'}"></div>
    <div class="plistDetail" :class="{'showDetail' : toggleDetail}">
      <p>{{singerDetail}}</p>
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
        singerDetail:'',
        toggleDetail:false
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRankHead',true)
        vm.getSingerInfo();
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
      getSingerInfo(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        var infoId = this.$route.params.id;
        axios.get(`/songList/singer/info/${infoId}&json=true`).then(({data})=>{
          Indicator.close();
          this.imgUrl = data.info.imgurl.replace('{size}','400');
          this.songList = data.songs.list;
          this.singerDetail = data.info.intro;
          var rankName = data.info.singername;
          this.$store.commit('setRankHeadTitle',rankName)
        })
      },
      toggleDetailBtn(){
        this.toggleDetail = !this.toggleDetail
      }

    }
  }
</script>


