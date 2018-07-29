<template>
  <div class="rank">
    <mt-cell v-for="(rank,index) in rankList" :title = "rank.rankname" :key="index" is-link>
      <img slot="icon" :src="rank.imgurl.replace('{size}','400')" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script>
  import rank from '../jsons/rank'
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
      this.rankList = rank.rankList.list
    }
  }
}
</script>

<style>
  .rank .mint-cell-wrapper{
    padding: 10px 5px;
  }
</style>


