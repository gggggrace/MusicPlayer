<template>
  <div class="headNav">
   <mt-navbar v-model="headNav">
     <mt-tab-item id="headNav1">新歌</mt-tab-item>
     <mt-tab-item id="headNav2">排行</mt-tab-item>
     <mt-tab-item id="headNav3">歌单</mt-tab-item>
     <mt-tab-item id="headNav4">歌手</mt-tab-item>
   </mt-navbar>
  </div>
</template>

<script>
  export default {
    name:'head-nav',
    computed: {
      headNav: {
        get(){
          return this.$store.getters.headNav
        },
        set(nav) {
          this.$store.commit('setHeadNav',nav)
          const index = nav.substr(-1);
          this.goRouter(Number(index));
        }
      }
    },
    methods: {
      goRouter(index){
        switch (index) {
          case 1:
            this.$router.push({path: '/'});
            break;
          case 2:
            this.$router.push({path: '/rank'});
            break;
          case 3:
            this.$router.push({path: '/pList'});
            break;
          case 4:
            this.$router.push({path: '/singer'});
            break;
        }
      }
    }
  }
</script>
