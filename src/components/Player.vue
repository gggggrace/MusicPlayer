<template>
    <div class="player" :class="{'audioPanelHide':togglePlayerHide}">
      <audio :src="audio.songUrl" id="audioPlay"  autoplay></audio>
      <!--显示隐藏底部播放悬浮框按钮-->
      <div class="audioControl" @click="togglePanel"></div>
      <!--底部播放悬浮框-->
      <div class="audioPanel">
        <img class="panelImg" :src="audio.imgUrl"  alt="">
        <div class="playerDetail">
          <p class="playerTitle">{{audio.title}}</p>
          <p class="playerSinger">{{audio.singer}}</p>
        </div>
        <div class="playerControl">
          <span class="playerPlay" :class="{'playerPause':isPlay}" @click="togglePlay"></span>
          <span class="playerNext"></span>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'player',
    data () {
      return {

      }
    },
    computed: {
        ...mapGetters(['audio','togglePlayerHide','isPlay']),
    },
    methods: {
      togglePanel(){
        this.$store.commit('togglePlayerHide', !this.togglePlayerHide);
      },
      togglePlay(){
        if(this.isPlay){
          document.getElementById("audioPlay").pause();
        } else {
          document.getElementById("audioPlay").play();
        }
        this.$store.commit('isPlay', !this.isPlay);
      }
    }
  }
</script>


