<template>
  <div class="singerList">
    <mt-cell v-for="(item,index) in singerList" :title="item.singername" :key="index" is-link :to="`/singer/info/${item.singerid}`">
      <img :src="item.imgurl.replace('{size}','400')" slot="icon" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import axios from 'axios'
  export default {
    data(){
      return {
        singerList :[]
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRankHead',true)
        vm.getSingerList()
        vm.$store.commit('setRankHeadStyle', {background: `rgba(43,162,251,1)`})
      })
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRankHead', false)
      next()
    },
    methods: {
      getSingerList:function () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        var singerId = this.$route.params.id;
        axios.get(`/songList/singer/list/${singerId}?json=true`).then(({data})=>{
          Indicator.close();
          this.singerList = data.singers.list.info;
          this.$store.commit('setRankHeadTitle',data.classname)
        })
      }
    }
  }
</script>



