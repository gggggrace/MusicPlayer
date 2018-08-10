<template>
  <div class="headLogo">
    <div class="logo">
      <img src="http://m.kugou.com/v3/static/images/index/logo.png" alt="">
    </div>
    <div class="search" @click="goSearch">
      <img src="http://m.kugou.com/v3/static/images/index/search.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goSearch(){
      this.$store.commit('detailPlayerShow',false);//正在播放中点击搜索则隐藏播放详情
      this.$router.push({path:'/search'})
    }
  }
}
</script>
