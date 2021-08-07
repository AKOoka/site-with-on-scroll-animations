<template>
  <header class="l-header">
    <nav>
      <a
        v-for="(info, i) in navigationLinksInfo"
        :key="info.text + i.toString()"
        :href ="info.linkRef"
        class="default-color header-menu-link"
      >
        {{ info.text }}
      </a>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { INavigationLink } from '../types/INavigationLink'

export default defineComponent({
  name: 'TheHeader',
  props: {
    navigationLinksInfo: {
      type: Array as PropType<INavigationLink[]>,
      required: true,
      default (this: void) {
        return []
      },
      validator (this: void, navigationLinksInfo: INavigationLink[]): boolean {
        return navigationLinksInfo !== undefined
      }
    }
  }
})

</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.l-header {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 3em;
  line-height: 3;
  left: 0;
  top: 0;
  background-color: $white-opaque;
  box-shadow: 0 0 0.5em 0 rgba(0, 0, 0, 0.2);
  z-index: 10;

  @media screen and (max-width: $screen-smaller-width-max) {
    justify-content: center;
  }
}

.header-menu-link {
  text-decoration: none;
  font-size: 0.9em;
  margin-right: 1.5em;
  color: $dark-blue;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: $green;
  }
}
</style>
