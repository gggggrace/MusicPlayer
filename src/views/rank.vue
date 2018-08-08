<template>
  <div class="rank">
    <mt-cell v-for="(rank,index) in rankList" :title = "rank.rankname" :key="index" is-link :to="`/rank/info/${rank.rankid}`">
      <img slot="icon" :src="rank.imgurl.replace('{size}','400')" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import axios from 'axios'
  export default {
    data(){
      return {
        rankList: []
      }
    },
    created(){
      this.getRank()
    },
    methods: {
      getRank(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        axios.get(`/songList/rank/list&json=true`).then(({data})=>{
          Indicator.close();
          this.rankList = data.rank.list
        })

      }
    }
  }
</script>

<style>
  .rank .mint-cell-wrapper{
    font-size: 16px;
  }
  .rank .mint-cell-wrapper img{
    margin-right: 10px;
  }
</style>


