<template>
  <div class="presentation">
      <p class="presentation-value">
        <transition
          @enter="onScaleEnter"
          @leave="onScaleLeave"
        >
          <div class="presentation-value--scale" v-show="showScale">{{scale}}</div>
        </transition>
        <transition name="fade">
          <div class="presentation-value--fullchord" v-show="showChords">
            <span class="presentation-value--chord">{{chord}}</span>
            <span class="presentation-value--alteration">{{alteration}}</span>
          </div>
        </transition>
      </p>
  </div>
</template>

<script>
export default {
  props: {
    showScale: Boolean,
    showChords: Boolean,
    scale: String,
    chord: String,
    alteration: String
  },
  methods: {
    onScaleEnter(el, done) {
      const elBCR = el.getBoundingClientRect();
      const {top, left} = elBCR;
      el.style.transform = `scale(0.5, 0.5) translate(${-left + 5}px, ${-top + 5}px)`;
      el.style.opacity = 0.5;
      done();
    },

    onScaleLeave(el, done) {
      el.style.opacity = 0;
      done();
    }
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
      color: #FFF;

      &--scale {
        opacity: 1;
        font-size: 8em;
        transition:
          opacity 0.3s cubic-bezier(0, 0, 0.3, 1),
          transform 1s cubic-bezier(0, 0, 0.3, 1);
      }

      &--fullchord {
        display: flex;
        align-items: end;
        animation-name: bouceIn;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0, 0, 0.3, 1);
      }

      &--chord {
        font-size: 8em;
      }

      &--alteration {
        font-size: 3em;
        font-style: italic
      }
    }
  }

  .fade-leave {
    opacity: 1;
    transform: scale(1, 1);
  }

  .fade-leave-active {
    transition: opacity 0.2s cubic-bezier(0, 0, 0.3, 1), transform 0.3s cubic-bezier(0, 0, 0.3, 1);
  }

  .fade-leave-to {
    opacity: 0;
    transform: scale(0, 0);
  }

  @keyframes bouceIn {
    0% {
      opacity: 0;
      transform: scale(0.2, 0.2);
    }
    75% {
      opacity: 1;
      transform: scale(1.1, 1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
</style>
