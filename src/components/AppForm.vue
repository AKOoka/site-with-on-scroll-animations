<template>
  <form class="form">
    <input
      type="text"
      placeholder="Name"
      class="form-input"
    />
    <input
      type="text"
      placeholder="Email"
      class="form-input"
    />
    <textarea
      placeholder="Message"
      class="form-textarea"
      rows="6"
    />
    <button class="form-btn-submit">
      Send Message
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'AppForm'
})
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";
@import "../styles/_extends.scss";

:global(.page-block.is-visible .form) {
  transform: translateY(0%);
}

.form {
  @extend %border-box;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 4em;
  padding: 2em;
  color: $dark-blue;
  background-color: white;
  transition: transform $transition;
  transform: translateY(100%);

  @media screen and (min-width: $screen-big-width-min) {
    width: 45em;
  }
}

.form-input, .form-textarea {
  @extend %border-box;

  padding: 0.65em 0.75em;
  background: none;
  border: solid 2px $light-blue;
  border-radius: 0.5em;
  color: inherit;
  outline: none;

  &:focus {
    border-color: $light-blue-focus;
  }
}

.form-input {
  font: inherit;
  width: 48%;

  &:nth-child(n+2) {
    @media screen and (max-width: $screen-small-width-max) {
      margin-top: 1.5em;
    }
  }

  @media screen and (max-width: $screen-small-width-max) {
    width: 100%;
  }
}

.form-textarea {
  @extend %text;

  font: {
    family: inherit;
    size: inherit;
    weight: inherit;
  }
  width: 100%;
  margin: 1.5em 0 2em 0;
  resize: none;
}

.form-btn-submit {
  font: inherit;
  height: 3.5em;
  line-height: 3.5em;
  text-align: center;
  padding: 0 2em;
  cursor: pointer;
  color: white;
  border-radius: 3.5em;
  border: none;
  background-color: $green;
  margin: 0 auto;

  &:hover {
    background-color: $green-hover;
  }
  &:active {
    background-color: $green-active;
  }
}

</style>
