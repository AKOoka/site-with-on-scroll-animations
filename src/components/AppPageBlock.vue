<template>
  <section
    ref="root"
    :id="blockId"
    :class="visible ? 'is-visible' : ''"
    class="page-block"
  >
    <slot class="page-block-child" />
    <a
      v-if="nextBlockId !== undefined"
      :href="`#${nextBlockId}`"
      class="link-to-next-block icon-arrow-down"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue'
import { IBlockBoundariesY } from '../types/IBlockBoundariesY'

export default defineComponent({
  name: 'AppPageBlock',
  props: {
    blockId: {
      type: String,
      required: true,
      validator (this: void, nextBlockId: string): boolean {
        return typeof nextBlockId === 'string'
      },
      default (this: void) {
        return ''
      }
    },
    visible: {
      type: Boolean,
      required: true,
      validator (this: void, visible: boolean): boolean {
        return typeof visible === 'boolean'
      },
      default (this: void) {
        return true
      }
    },
    nextBlockId: {
      type: String,
      required: false,
      validator (this: void, nextBlockId: string): boolean {
        return typeof nextBlockId === 'string'
      }
    }
  },
  emits: {
    mountedTemplate (payload: IBlockBoundariesY) {
      return typeof payload.height === 'number' && typeof payload.y === 'number'
    },
    resizeTemplate (payload: IBlockBoundariesY) {
      return typeof payload.height === 'number' && typeof payload.y === 'number'
    }
  },
  setup (_, context) {
    const root = ref<HTMLElement | null>(null)

    onMounted(() => {
      context.emit('mountedTemplate', { y: root.value?.offsetTop, height: root.value?.offsetHeight })

      window.addEventListener('resize', () => {
        context.emit('resizeTemplate', { y: root.value?.offsetTop, height: root.value?.offsetHeight })
      })
    })

    return {
      root
    }
  }
})
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";
@import "../styles/_extends.scss";
@import "../styles/_mixins.scss";

@mixin flex-column($justify: '', $align: '') {
  display: flex;
  flex-direction: column;

  @if ($justify != '') {
    justify-content: $justify;
  }
  @if ($align != '') {
    align-items: $align;
  }
}

.page-block {
  @extend %border-box;

  position: relative;
  overflow: hidden;

  &:last-child {
    padding: 6em 0 0;
  }
  &:nth-last-child(n+2) {
    padding: 6em 0;
    min-height: 100vh;
  }
}

.link-to-next-block {
  @extend %border-box;

  position: absolute;
  align-self: center;
  text-align: center;
  bottom: 0;
  display: block;
  width: 5em;
  height: 5em;
  line-height: 5em;
  border: {
    top: solid 2px $light-blue;
    left: solid 2px $light-blue;
    right: solid 2px $light-blue;
  }
  border-radius: 3em 3em 0 0;
  background: none;
  text-decoration: none;
  color: $light-blue;

  &:hover {
    background-color: $black-opaque;
  }
  &:active {
    background-color: $black-opaque-active;
  }
}

.icon-arrow-down::before {
  @include icon("\f063", 2em, 900);
}

#first, #second, #third {
  background: {
    size: 256px 256px, cover;
    position: top left, bottom center;
    repeat: repeat, no-repeat;
    attachment: fixed;
  }
}

#first {
  @include flex-column(center, center);

  background-image: $url-overlay, url("../assets/images/woman-face.jpg");
}

#second {
  @include flex-column(center, flex-end);

  background-image: $url-overlay, url("../assets/images/mountains.jpg");
}

#third {
  @include flex-column(center, flex-start);

  background-image: $url-overlay, url("../assets/images/man-face.jpg");
}

#fourth {
  @include flex-column(center, center);

  background-color: white;
}

#fifth {
  @include flex-column(flex-end, center);

  background-color: $light-blue;
}

</style>
