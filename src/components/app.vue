<template>
  <div class="main">
    <presentation
      :scale="currentScale"
      :shouldShowScale="shouldShowScale"
      :shouldShowChords="shouldShowChords"
      :duration="duration"
      :chordsTypes="chordsTypes"
      :chords="chords"
      :alterations="alterations"
    >
    </presentation>
    <div class="app-control">
      <slider :minRange="minRange" :maxRange="maxRange" :duration="duration"></slider>
      <button class="app-control-start-button" @click="start">Give me a key</button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import presentation from './presentation';
  import slider from './slider';

  export default {
    components: {
      presentation,
      slider
    },
    data () {
      return {
        minRange: 1,
        maxRange: 30,
        duration: 5,
        scales: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'B', 'Bb'],
        chordsTypes: ['major', 'minor', 'diminished', 'augmented'],
        chords: {
          'major': ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
          'minor': ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'],
          'diminished': ['I°', 'II°', 'III°', 'IV°', 'V°', 'VI°', 'VII°'],
          'augmented': ['I+', 'II+', 'III+', 'IV+', 'V+', 'VI+', 'VII+']
        },
        alterations: {
          'major': ['straight', '2', 'sus4', '6', '6/9', '7', 'MAJ7', 'MAJ7#11', 'add9', '9', '11', '13', '- (b5)', 'alt (#5#9)'],
          'minor': ['straight', '6', '6/9', '7', 'add9', '9', '11', '13', 'MAJ7', 'ø (7b5)'],
          'diminished': ['straight', '7'],
          'augmented': ['augmented']
        },
        currentScale: '',
        shouldShowScale: false,
        shouldShowChords: false,
        tids: []
      }
    },
    methods: {
      generateRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
      },

      start() {
        this.forceStopShowingChordsIfNeeded().then(_ => {
          // remove all styles applied with FLIP
          this.$el.querySelector('.presentation--scale').removeAttribute('style');
          const scale = this.scales[this.generateRandomNumber(0, this.scales.length - 1)];
          this.currentScale = scale;
          this.shouldShowScale = true;
        });
      },

      forceStopShowingChordsIfNeeded() {
        return new Promise((resolve, reject) => {
          const onChordTransitionEnd = evt => {
            this.shouldShowScale = false;
            // remove all styles applied with FLIP
            this.$el.querySelector('.presentation--scale').removeAttribute('style');
            // clear all the timeouts so no chords are shown
            this.tids.forEach(tid => clearTimeout(tid));
            // reset timeoutsids
            this.tids = [];
            evt.target.removeEventListener('animationend', onChordTransitionEnd);
            resolve();
          }

          if (!this.shouldShowChords) {
            resolve();
            return;
          }

          this.shouldShowChords = false;
          this.$el.querySelector('.presentation--fullchord').addEventListener('animationend', onChordTransitionEnd);
        });
      }
    }
  }
</script>

<style lang="scss">
  .main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .app-control {
    width: 100%;

    &-start-button {
      height: 60px;
      width: 100%;
      background: #92989b;
      border: none;
      border-radius: 3px;
      color: #FFF;
      font-size: 22px;
      outline: none;
    }
  }
</style>

