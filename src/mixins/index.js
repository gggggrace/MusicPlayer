module.exports = {
  'PLAY_AUDIO' : {
    methods:{
      playAudio(index){
        const hash = this.songList[index].hash;
        const info = {
          list:this.songList,
          index:index
        };
        this.$store.dispatch('getSong',hash);
        this.$store.commit('setlistInfo',info)
      }
    }
  }
}
