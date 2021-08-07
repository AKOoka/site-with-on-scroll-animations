<template>
  <div :class="`text-container ${animationType}`">
    <component
      v-if="heading !== undefined"
      :is="heading.type"
      class="text-heading"
    >
      {{ heading.content }}
    </component>
    <p class="text">
      {{ contentText }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { AppearAnimation } from '../types/AppearAnimation'

enum HEADING {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6'
}

interface IHeadingProps {
  type: HEADING
  content: string
}

export default defineComponent({
  name: 'AppText',
  props: {
    heading: {
      type: Object as PropType<IHeadingProps>,
      required: false,
      validator (this: void, heading: IHeadingProps): boolean {
        return (
          Object.values(HEADING).includes(heading.type) &&
          typeof heading.content === 'string'
        )
      }
    },
    contentText: {
      type: String,
      required: true,
      validator (this: void, textContent: string): boolean {
        return typeof textContent === 'string'
      },
      deafult (this: void): string {
        return ''
      }
    },
    appearAnimation: {
      type: Number as PropType<AppearAnimation>,
      required: false,
      validator (this: void, appearAnimation: AppearAnimation): boolean {
        return Object.values(AppearAnimation).includes(appearAnimation)
      },
      default (this: void): AppearAnimation {
        return AppearAnimation.Static
      }
    }
  },
  setup (props) {
    let animationType = ''

    switch (props.appearAnimation) {
      case AppearAnimation.SlidingRight:
        animationType = 'sliding-animation sliding-right'
        break
      case AppearAnimation.SlidingLeft:
        animationType = 'sliding-animation sliding-left'
        break
      case AppearAnimation.Opacity:
        animationType = 'opacity-animation'
        break
      case AppearAnimation.Static:
        animationType = 'static'
        break
    }

    return {
      animationType
    }
  }
})

</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";
@import "../styles/_extends.scss";

.text-container {
  @extend %border-box;
}

.text-heading {
  @extend %h-font-weight, %margin-zero;
}

h1.text-heading {
  @extend %h1;
}

h2.text-heading {
  @extend %h2;
}

.text {
  @extend %text;

  margin: 1em 0 0;
}

.static {
  text-align: center;
  padding: 0 2.5em;

  @media screen and (min-width: $screen-big-width-min) {
    width: 45em;
  }
}

.opacity-animation {
  @extend .static;

  color: white;
  opacity: 0;
  transition: opacity $transition;
}

.sliding-animation {
  position: relative;
  width: 40%;
  padding: 3.5em 2.5em;
  background-color: white;
  color: $dark-blue;
  transition: transform $transition;

  @media screen and (max-width: $screen-big-width-max) {
    width: 70%;
  }

  @media screen and (max-width: $screen-smaller-width-max) {
    width: 100%;
  }
}

.sliding-right {
  transform: translateX(100%);
}

.sliding-left {
  transform: translateX(-100%);
}

:global(.page-block.is-visible .text-container.opacity-animation) {
  opacity: 1;
}

:global(.page-block.is-visible .text-container.sliding-animation), :global(.page-block.is-visible .text-container.sliding-animation) {
  transform: translateX(0%);
}
</style>
