<template>
  <div class="presentation">
    <transition name="bounce">
      <div class="presentation--scale" v-show="shouldShowScale" @click="onScaleClick">{{scale}}</div>
    </transition>
    <transition name="bounce">
      <div class="presentation--fullchord" v-show="shouldShowChords">
        <span class="presentation--chord">{{chord}}</span>
        <span class="presentation--alteration">{{alteration}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import noSleep from 'nosleep.js';

export default {
  props: {
    duration: Number,
    shouldShowScale: Boolean,
    shouldShowChords: Boolean,
    scale: String,
    chordsTypes: Array,
    chords: Object,
    alterations: Object
  },
  data () {
    return {
      chord: '',
      alteration: '',
      numberOfChordsToShow: 20
    }
  },
  methods: {
    generateRandomNumber(min, max) {
      return Math.floor(Math.random() * max) + min;
    },

    onScaleClick(evt) {
      if (this.shouldShowChords) {
        return;
      }

      // prevent mobile screen to sleep
      // during the game
      noSleep.enable();

      const el = evt.target;

      // First
      const first = el.getBoundingClientRect();

      // Last
      el.classList.remove('presentation--scale__animatable');
      el.style.position = 'fixed';
      el.style.top = '5px';
      el.style.left = '5px';
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.style.transform = 'scale(0.4)';
      const last = el.getBoundingClientRect();

      // Invert
      const deltaX = first.right - last.right;
      const deltaY = first.top - last.top;
      const deltaScale = first.width / last.width;

      // Play
      el.style.transform = `scale(${deltaScale}) scale(0.4) translate(${deltaX}px, ${deltaY}px)`;

      // double rAF
      requestAnimationFrame(_ => {
        requestAnimationFrame(_ => {
          el.classList.add('presentation--scale__animatable');
          requestAnimationFrame(_ => {
            el.style.transform = 'scale(0.4)';
            el.style.opacity = 0.5;
            el.addEventListener('transitionend', this.onTransitionEnd);
          });
        });
      });
    },

    onTransitionEnd(evt) {
      evt.target.removeEventListener('transitionend', this.onTransitionEnd);
      evt.target.classList.remove('presentation--scale__animatable');
      this.showChords(this.numberOfChordsToShow);
    },

    showChords(numberOfChords) {
      this.$parent.shouldShowChords = true;
      for (let i = 0; i < numberOfChords; i++) {
        const tid = setTimeout(_ => {
          const randomChordType = this.chordsTypes[this.generateRandomNumber(0, this.chordsTypes.length - 1)];
          const randomChord = this.chords[randomChordType][this.generateRandomNumber(0, this.chords[randomChordType].length - 1)];
          const randomAlterationForTheChord = this.alterations[randomChordType][this.generateRandomNumber(0, this.alterations[randomChordType].length - 1)];

          this.chord = randomChord;
          this.alteration = (randomAlterationForTheChord === 'straight') ? '' : randomAlterationForTheChord;

          if (i === numberOfChords - 1) {
            setTimeout(_ => {
              this.$parent.shouldShowChords = false;
              this.$parent.shouldShowScale = false;
              noSleep.disable();
            }, this.duration * 1000);
          }
        }, (this.duration * 1000) * (i));
        this.$parent.tids.push(tid);
      }
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

    &--scale {
      color: #FFF;
      opacity: 1;
      font-size: 8em;
      /* avoid problem with scale when flip */
      transform-origin: 0% 0%;
      will-change: transform, opacity;
    }

    &--scale__animatable {
      transition:
        opacity 0.5s cubic-bezier(0, 0, 0.3, 1),
        transform 0.5s cubic-bezier(0, 0, 0.3, 1);
    }

    &--fullchord {
      color: #FFF;
      display: flex;
      align-items: end;
    }

    &--chord {
      font-size: 8em;
    }

    &--alteration {
      font-size: 3em;
      font-style: italic
    }
  }

  .bounce-enter-active {
    animation-name: bouceIn;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0, 0, 0.3, 1);
  }

  .bounce-leave-active {
    animation-name: bouceIn;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0, 0, 0.3, 1);
    animation-direction: reverse;
  }

  @keyframes bouceIn {
    0% {
      opacity: 0;
      transform: scale(0.2);
    }
    75% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
