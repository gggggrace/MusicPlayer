<template>
    <div class="detailPlayer" v-show="detailPlayerShow">
      <div class="detailPlayerBg" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
      <div class="detailPlayerContent">
        <div class="detailPlayerTop">
          <span class="back" @click="hideDetailPlayer"></span>
          {{audio.title}}
        </div>
        <div class="detailPlayerImg"><img :src="audio.imgUrl" alt=""></div>
        <div class="detailPlayerLrc">
          <div class="lrcContent" :style="{marginTop:lrcTop+'px'}">
            <p v-for="(item,index) in songLrc" :class="{isCurrentLrc:item.seconds >= audio.curLength}">{{item.lrcContent}}</p>
          </div>
        </div>
        <div class="detailPlayerRange">
          <div slot="start" class="detailPlayerTime">{{audio.curLength | time}}</div>
          <mt-range id="playRange"
                    :min="0"
                    :max="parseInt(audio.songLength)"
                    v-model="audio.curLength"
                    :bar-height="3" @click.native="rangeChange($event)"></mt-range>
          <div slot="end" class="detailPlayerTime">{{audio.songLength | time}}</div>
        </div>
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
    filters: {
      time(value){
        var timeL = Math.floor(parseInt(value));
        var minute = Math.floor(value/60)<10?('0'+Math.floor(value/60)):Math.floor(value/60);
        var second = Math.floor(timeL%60)<10?('0'+Math.floor(timeL%60)):Math.floor(timeL%60);
        return minute + ':' +second;
      }
    },
    computed: {
      ...mapGetters(['detailPlayerShow','audio','isPlay']),
      songLrc(){
        if(this.audio.lrc){
          var temp = this.audio.lrc.split('\r\n');
          temp = temp.splice(0, temp.length - 1);
          temp = temp.map((value) => {
            const time = value.substr(1,5);
            const seconds = parseInt(time.split(':')[0])*60+parseInt(time.split(':')[1]);
            const lrcContent = value.substr(10);
            return {
              seconds,
              lrcContent
            }
          });
          return temp;
        }
      },
      lrcTop(){
        if(this.songLrc){
          var top = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length-2)*(-20);
          return this.audio.curLength + top - this.audio.curLength;//this.audio.curLength在变化才会触发computed，所以加上又减掉
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
      },
      rangeChange(event){
        var offsetX = event.offsetX;
        var rangeWidth = (document.documentElement.clientWidth-20) * 0.75;
        var clickTime = Math.floor(offsetX * this.audio.songLength / rangeWidth);
        if(offsetX < rangeWidth){
          this.$store.commit('setAudioTime',clickTime);
          this.$store.commit('setCurrent',true);//手动调整当前播放位置
        }
      }
    }
  }
</script>


