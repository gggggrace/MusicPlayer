import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    headNav:'headNav1',
    togglePlayerHide:false,
    detailPlayerShow:false,
    isPlay:false,
    firstEnter:false,
    count:0,
    audio: {
      songUrl:'',
      imgUrl:'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
      title:'',
      singer:'',
      songLength:'',
      curLength:'',
      changeCurFlag:false
    },
    listInfo: { //存储当前播放歌曲信息和序号
      list:[],
      index:0
    },

  },
  getters: {
    headNav: state => state.headNav,
    togglePlayerHide: state => state.togglePlayerHide,
    detailPlayerShow: state => state.detailPlayerShow,
    isPlay: state => state.isPlay,
    audio: state => state.audio,
    firstEnter: state => state.firstEnter
  },
  mutations: {
    setHeadNav: (state,nav) => {
      state.headNav = nav;
    },
    togglePlayerHide: (state,flag) => {
      state.togglePlayerHide = flag;
    },
    detailPlayerShow: (state,flag) => {
      state.detailPlayerShow =flag;
    },
    isPlay: (state,flag) =>{
      state.isPlay = flag;
    },
    // firstEnter: (state,flag) => {
    //   state.firstEnter = flag;
    // },
    setAudio: (state,audio) => {
      if(state.count == 0){ //首次进入不可进入播放详情
        state.firstEnter = true;
      }
      state.count ++;
      state.audio = {...(state.audio),...audio}
    },
    setAudioTime: (state,time) => {
      state.audio.curLength = time;
    },
    setCurrent: (state,flag) => {
      state.audio.changeCurFlag = flag;
    },
    setlistInfo: (state,{list,index}) =>{
      state.listInfo.list = list;
      state.listInfo.index =index;
    },
    setLrc: (state,lrc) => {
      state.audio = {...(state.audio),lrc}
    }

  },
  actions: {
    getSong({commit,state},hash){
      axios.get(`/songInfo/yy/index.php?r=play/getdata&hash=${hash}`).then(({data})=>{
        data = data.data;
        const songUrl = data.play_url;
        const imgUrl = data.img;
        const title = data.audio_name;
        const singer = data.author_name;
        const songLength = data.timelength / 1000;
        const curLength = 0;
        const lrc = data.lyrics;
        const audio = {songUrl,imgUrl,title,singer,songLength,curLength};
        commit('setAudio',audio);
        commit('isPlay',true);
        commit('setLrc',lrc);
      })
    },
    prev({dispatch,state}){
      const list = state.listInfo.list;
      if(state.listInfo.index == 0){
        state.listInfo.index = list.length;
      }else {
        state.listInfo.index--;
      }
      const hash = list[state.listInfo.index].hash;
      dispatch('getSong',hash)
    },
    next({dispatch,state}){
      const list = state.listInfo.list;
      if(state.listInfo.index == list.length - 1){
        state.listInfo.index = 0;
      }else {
        state.listInfo.index++;
      }
      const hash = list[state.listInfo.index].hash;
      dispatch('getSong',hash)
    }
  }
});

export default store
