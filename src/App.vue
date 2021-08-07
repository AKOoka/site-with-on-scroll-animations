<template>
  <TheHeader :navigation-links-info='navigationLinksInfo'/>
  <TheMain :content-blocks='mainBlocks'/>
  <TheFooter/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import { INavigationLink } from './types/INavigationLink'
import TheMain from './components/TheMain.vue'
import { blocks } from './blocks'
import { IBlock } from './types/IBlock'

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    TheMain,
    TheFooter
  },
  setup () {
    const mainBlocks: IBlock[] = blocks
    const navigationLinksInfo: INavigationLink[] = mainBlocks.map(v => {
      return { text: v.name[0].toUpperCase() + v.name.slice(1), linkRef: `#${v.name}` }
    })

    return {
      mainBlocks,
      navigationLinksInfo
    }
  }
})

</script>

<style lang="scss">
@import "./assets/fonts/fontawesome-all.min.css";
@import "./styles/_variables.scss";

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font: {
    size: 17pt;
    weight: 300;
    family: "Source Sans Pro", "sans-serif";
  }

  @media screen and (max-width: $screen-biggest-width-max) {
    font-size: 15pt;
  }

  @media screen and (max-width: $screen-bigger-width-max) {
    font-size: 13pt;
  }

  @media screen and (max-width: $screen-small-width-max) {
    font-size: 12pt;
  }
}
</style>
