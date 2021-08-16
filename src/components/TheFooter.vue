<template>
  <footer class="l-footer">
    <div class="list-media-link">
      <a
        class="media-link twitter-icon"
        href="https://twitter.com/"
      />
      <a
        class="media-link facebook-icon"
        href="https://www.facebook.com/"
      />
      <a
        class="media-link instagram-icon"
        href="https://www.instagram.com/"
      />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheFooter'
})
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss";
@import "../styles/_mixins.scss";

.l-footer {
  padding: 1.5em;
  background-color: $dark-blue;
  display: flex;

  @media screen and (max-width: $screen-smaller-width-max) {
    justify-content: center;
  }
}

.list-media-link {
  display: flex;
}

.media-link {
  display: block;
  width: 2em;
  height: 2em;
  line-height: 2em;
  text-align: center;
  color: $light-blue-opaque;
  text-decoration: none;

  &:hover {
    color: $grey;
  }
}

.twitter-icon::after {
  @include icon("\f099", 1em, 900)
}

.facebook-icon::after {
  @include icon("\f39e", 1em, 900)
}

.instagram-icon::after {
  @include icon("\f16d", 1em, 900)
}

</style>
