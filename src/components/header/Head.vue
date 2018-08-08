<template>
  <div class="header">
    <HeadLogo />
    <RankHead v-if="rankHead.toggle" :title="rankHead.title" :rankStyle="rankHead.style"/>
    <HeadNav v-else />
  </div>
</template>

<script>
  import HeadLogo from './HeadLogo'
  import HeadNav from './HeadNav'
  import RankHead from './RankHead'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['rankHead'])
    },
    components: {
      HeadLogo,HeadNav,RankHead
    }
  }
</script>
