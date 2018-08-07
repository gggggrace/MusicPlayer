<template>
    <div class="newSongs">
        <mt-swipe :auto="5000">
            <mt-swipe-item v-for="(banner,index) in bannerList" :key="index">
                <a :href="banner.extra.tourl">
                    <img :src="banner.imgurl" :title="banner.title">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <mt-cell v-for="(song,index) in songList" :title="song.filename" :key="index" @click.native="playAudio(index)">
            <img src="../assets/images/download_icon.png" width="20">
        </mt-cell>
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
            bannerList:[],
            songList: []
          }
      },
      created(){
          this.getSongs();
      },
      methods: {
          getSongs(){
            Indicator.open({
              text: '加载中...',
              spinnerType: 'snake'
            });
            axios.get(`/songList/?json=true`).then(({data})=>{
              Indicator.close();
              this.songList = data.data;
              this.bannerList = data.banner;
            })
          }
      }
    }
</script>

<style>
    .mint-swipe {
        height: 39vw !important;
    }
</style>


