<template>
  <div id="app">
    <Head />
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Player />
    <DetailPlayer />
  </div>
</template>

<script>
  import Head from './components/header/Head'
  export default {
    components:{
      Head
    }
  }
</script>

