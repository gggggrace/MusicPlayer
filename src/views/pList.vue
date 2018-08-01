<template>
  <div class="pList">
    <mt-cell v-for="(pList,index) in pLists" :title="pList.specialname" :key="index" is-link :label="String(pList.playcount)">
      <img :src="pList.imgurl.replace('{size}','400')" slot="icon" width="60" height="60">

    </mt-cell>
  </div>
</template>

<script>
  import pListData from '../jsons/pList'
  export default {
    data(){
      return {
        pLists :[]
      }
    },
    created(){
      this.getPList()
    },
    methods: {
      getPList:function () {
        this.pLists = pListData.plist
      }
    }
  }
</script>

<style>
  .pList .mint-cell-wrapper{

  }
</style>


