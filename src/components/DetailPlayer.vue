<template>
    <div class="detailPlayer" v-show="detailPlayerShow">
      <div class="detailPlayerBg" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
      <div class="detailPlayerContent">
        <div class="detailPlayerTop">
          <span class="back" @click="hideDetailPlayer"></span>
          {{audio.title}}
        </div>
        <div class="detailPlayerImg"><img :src="audio.imgUrl" alt=""></div>
        <div class="detailPlayerLrc"></div>
        <div class="detailPlayerRange"></div>
        <div class="detailPlayerControl">
          <span class="detailPrev" @click="prev"></span>
          <span class="detailPlay" :class="{'detailPause':isPlay}" @click="togglePlay"></span>
          <span class="detailNext" @click="next"></span>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters(['detailPlayerShow','audio','isPlay']),
      songLrc(){
        if(this.audio.lrc){

        }


      }
    },
    methods: {
      hideDetailPlayer(){
        this.$store.commit('detailPlayerShow',false)
      },
      togglePlay(){
        if(this.isPlay){
          document.getElementById("audioPlay").pause();
        } else {
          document.getElementById("audioPlay").play();
        }
        this.$store.commit('isPlay', !this.isPlay);
      },
      prev(){
        this.$store.dispatch('prev');
      },
      next(){
        this.$store.dispatch('next');
      }
    }
  }
</script>


