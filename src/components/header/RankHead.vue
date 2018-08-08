<template>
  <div class="rankHead" :style="rankStyle">
    <a class="goBack" @click="goBack"></a>
    {{title}}
  </div>
</template>

<script>
  export default {
    props: ['title','rankStyle'],
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
