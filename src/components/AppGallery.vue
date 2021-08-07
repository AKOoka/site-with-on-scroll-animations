<template>
 <section class="gallery">
    <img
      v-for="(v, i) in imgNames"
      :key="v + i.toString()"
      :src="require(`../assets/images/${v}`)"
      class="gallery-img"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, h, PropType } from 'vue'

export default defineComponent({
  name: 'AppGallery',
  props: {
    imgNames: {
      type: Array as PropType<string[]>,
      required: true,
      validator (this: void, imgNames: string[]): boolean {
        return imgNames.every(v => typeof v === 'string')
      },
      deafult (this: void): string[] {
        return []
      }
    }
  },
  setup (props) {
    const createImgs = () => {
      let delay = 30

      return props.imgNames.map((v, i) => {
        const imgProps = {
          src: require(`../assets/images/${v}`),
          class: 'gallery-img ',
          style: {
            'transition-delay': ''
          }
        }

        if (i % 2 === 0) {
          delay = Math.max(5, delay - 5)
          imgProps.class += 'position-left'
        } else {
          imgProps.class += 'position-right'
        }

        imgProps.style['transition-delay'] = `0.${delay}s`

        return h(
          'img',
          imgProps
        )
      })
    }
    return () => (
      h(
        'section',
        { class: 'gallery' },
        { default () { return createImgs() } }
      )
    )
  }
})
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.gallery {
  display: grid;
  grid: {
    template-columns: 50% 50%;
    template-rows: 276px;
    auto-rows: 276px;
  }
  margin: 2em 2em 0;

  @media screen and (max-width: $screen-small-width-max) {
    grid-template-columns: 100%;
  }
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: {
    property: opacity, transform;
    duration: 1s, 1s;
    timing-function: ease, ease;
  }
}

.position-right {
  transform: translateX(100%);
}

.position-left {
  transform: translateX(-100%);
}

:global(.page-block.is-visible .gallery-img) {
  opacity: 1;
  transform: translateX(0%);
}

</style>
