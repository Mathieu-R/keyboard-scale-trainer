<template>
  <div class="presentation">
    <transition name="fade">
      <span class="presentation-value">{{value}}</span>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  }
}
</script>

<style lang="scss">
  .presentation {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &-value {
      font-size: 8em;
      color: #FFF;
    }
  }

  .fade-enter {
    opacity: 0;
    transform: scale(0.2, 0.2);
  }

  .fade-enter-active {
    transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1) transform 0.5s cubic-bezier(0, 0, 0.3, 1);
  }

  .fade-enter-to {
    opacity: 1;
    transform: scale(1, 1);
  }

  .fade-leave {
    opacity: 1;
    transform: scale(1, 1);
  }

  .fade-leave-active {
    transition: opacity 0.2s cubic-bezier(0, 0, 0.3, 1) transform 0.3s cubic-bezier(0, 0, 0.3, 1);
  }

  .fade-leave-to {
    opacity: 0;
    transform: scale(0, 0);
  }
</style>
