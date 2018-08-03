import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    headNav:'headNav1',
    togglePlayerHide:false,
    isPlay:false,
    audio: {
      songUrl:'',
      imgUrl:'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
      title:'慰问金慰问金慰问金',
      singer:'慰问金',
      songLength:'',
      curLength:''
    }
  },
  getters: {
    headNav: state => state.headNav,
    togglePlayerHide: state => state.togglePlayerHide,
    isPlay: state => state.isPlay,
    audio: state => state.audio
  },
  mutations: {
    setHeadNav: (state,nav) => {
      state.headNav = nav;
    },
    togglePlayerHide: (state,flag) => {
      state.togglePlayerHide = flag;
    },
    isPlay: (state,flag) =>{
      state.isPlay = flag;
    },
    setAudio: (state,audio) => {
      state.audio = {...(state.audio),...audio}
    }
  },
  actions: {
    getSong({commit,state},hash){
      axios.get(`/songList/yy/index.php?r=play/getdata&hash=${hash}`).then(({data})=>{
        data = data.data;
        console.log(1111,data)
        const songUrl = data.play_url;
        const imgUrl = data.img;
        const title = data.audio_name;
        const singer = data.author_name;
        const songLength = data.timelength / 1000;
        const curLength = 0;
        const audio = {songUrl,imgUrl,title,singer,songLength,curLength};
        commit('setAudio',audio)
        commit('isPlay',true)
      })
    },
    next(){

    }
  }
});

export default store
