<template>
  <div id="app">
    <Head />
    <div class="main" :class="{'marginBtm0':togglePlayerHide}">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Player />
    <DetailPlayer />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Head from './components/header/Head'
  import Player from './components/Player'
  export default {
    components:{
      Head,Player
    },
    computed: {
      ...mapGetters(['togglePlayerHide'])
    }
  }
</script>

