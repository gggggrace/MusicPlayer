module.exports = {
  'PLAY_AUDIO' : {
    methods:{
      playAudio(index){
        const hash = this.songList[index].hash;
        this.$store.dispatch('getSong',hash)
      }
    }
  }
}
