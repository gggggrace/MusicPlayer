<template>
  <div class="search">
    <div class="searchPanel">
      <div class="searchInput">
        <span class="searchIcon"></span>
        <input type="text" placeholder="歌手/歌名/拼音" v-model="keyword" @keydown.enter="search">
      </div>
      <button class="searchBtn" @click="search">搜索</button>
    </div>

    <div class="hot" v-show="toggleSearch">
      <p>最近热门</p>
      <mt-cell v-for="(item,index) in hotList" :title="item.keyword" :key="index" @click.native="clickSearch(item)"></mt-cell>
    </div>

    <div class="songList" v-show="!toggleSearch">
      <div class="searchTotal">
        <span>共有{{total}}条搜索结果</span>
        <span class="backSearch" @click="backSearch">返回</span>
      </div>
      <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
        <img src="../assets/images/download_icon.png" width="20" height="20">
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
        keyword:'',
        hotList:[],
        songList:[],
        toggleSearch:true,
        total:null
      }
    },
    created(){
      this.getHotList()
    },
    methods: {
      getHotList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        axios.get(`/searchList/api/v3/search/hot?format=json&plat=0&count=30`).then(({data})=>{
          Indicator.close();
          this.hotList = data.data.info;
        })
      },
      clickSearch(item){
        this.keyword = item.keyword;
        this.search();
      },
      search(){
        if(this.keyword){
          this.toggleSearch = false;
          Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
          });
          axios.get(`/searchList/api/v3/search/song?format=json&keyword=${this.keyword}&page=1&pagesize=30&showtype=1`).then(({data})=>{
            Indicator.close();
            this.songList = data.data.info;
            this.total = data.data.total;
          })
        }else{
          this.backSearch()
        }
      },
      backSearch(){
        this.keyword = '';
        this.songList = '';
        this.toggleSearch = true;
      }
    }
  }
</script>
