<template>
  <div class="pList">
    <mt-cell v-for="(pList,index) in pLists" :title="pList.specialname" :key="index" is-link :label="String(pList.playcount)">
      <img :src="pList.imgurl.replace('{size}','400')" slot="icon" width="60" height="60">

    </mt-cell>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import axios from 'axios'
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
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        axios.get(`/songList/plist/index&json=true`).then(({data})=>{
          Indicator.close();
          this.pLists = data.plist.list.info
        })
      }
    }
  }
</script>



