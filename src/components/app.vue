<template>
  <div class="main">
    <presentation :value="currentValue"></presentation>
    <div class="app-control">
      <slider :minRange="minRange" :maxRange="maxRange" :duration="duration"></slider>
      <button class="app-control-start-button" @click="start">START</button>
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
        chords: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'],
        alterations: ['2', 'sus4', '6', '7', 'MAJ7', '6/9', 'add9', '9', '11', '13', 'alt (#5#9)', 'dim', 'aug'],
        currentValue: ''
      }
    },
    methods: {
      generateRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
      },
      start() {
        this.currentValue = this.scales[this.generateRandomNumber(0, this.scales.length - 1)];
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

