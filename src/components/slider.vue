<template>
  <div class="slider">
    <div class="slider-time-between">
      <span>Time between : <span class="slider-time-between__value">{{duration}}s</span></span>
    </div>
    <div class="slider-input">
      <div class="slider-controller"></div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    duration: Number,
    minRange: Number,
    maxRange: Number
  },
  data() {
    return {
      target: null,
      sliderController: null,
      dragging: false,
      currentX: null,
      sliderInputBCR: null,
      partsWidth: 0
    }
  },
  computed: {

  },
  methods: {
    onResize() {
      this.sliderInputBCR = this.$el.querySelector('.slider-input').getBoundingClientRect();
      this.partsWidth = this.sliderInputBCR.width / (this.maxRange - this.minRange);
      const position = (this.duration - 1) * this.partsWidth;

      // base position according to duration
      this.sliderController.style.transform = `translate(${position}px, -50%)`;
    },

    onSwipeStart(evt) {
      if (this.target) {
        return;
      }

      if (!evt.target.classList.contains('slider-controller')) {
        return;
      }

      this.target = evt.target;
      this.dragging = true;

      evt.preventDefault();
    },

    onSwipeMove(evt) {
      if (!this.target) {
        return;
      }

      const position = evt.pageX || evt.touches[0].pageX;

      this.currentX =
        position < 0 || position > this.sliderInputBCR.width - 10 ? this.currentX : position;
    },

    onSwipeEnd(evt) {
      if (!this.target) {
        return;
      }

      this.target = null;
      this.dragging = false;
    },

    calculateDurationFromPosition() {
      this.$parent.duration = Math.floor(this.currentX / this.partsWidth) + 1;
    },

    update() {
      requestAnimationFrame(this.update);

      if (!this.target) {
        return;
      }

      if (!this.dragging) {
        return;
      }

      this.calculateDurationFromPosition();

      this.sliderController.style.transform = `translate(${this.currentX}px, -50%)`;
    }
  },
  mounted() {
    this.sliderController = this.$el.querySelector('.slider-controller');

    document.addEventListener('mousedown', this.onSwipeStart);
    document.addEventListener('mousemove', this.onSwipeMove);
    document.addEventListener('mouseup', this.onSwipeEnd);

    document.addEventListener('touchstart', this.onSwipeStart);
    document.addEventListener('touchmove', this.onSwipeMove);
    document.addEventListener('touchend', this.onSwipeEnd);
    window.addEventListener('resize', this.onResize);

    this.onResize();
    requestAnimationFrame(this.update);
  },
  destroyed() {
    document.removeEventListener('mousestart', this.onSwipeStart);
    document.removeEventListener('mousemove', this.onSwipeMove);
    document.removeEventListener('mouseup', this.onSwipeEnd);

    document.removeEventListener('touchstart', this.onSwipeStart);
    document.removeEventListener('touchmove', this.onSwipeMove);
    document.removeEventListener('touchend', this.onSwipeEnd);
    window.removeEventListener('resize', this.onResize);
    this.sliderController = null;
  }
}
</script>

<style lang="scss">
  .slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    &-time-between {
      font-size: 22px;
      margin: 5px 0;
      text-align: center;
      opacity: 0.5;

      &__value {
        font-weight: bold;
      }
    }

    &-controller {
      position: absolute;
      top: 50%;
      left: 0;
      border-radius: 50%;
      background: #FFF;
      height: 20px;
      width: 20px;
      transform: translate(-50%, -50%);
      will-change: transform;
    }

    &-input {
      position: relative;
      width: 95%;
      height: 15px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }
  }

</style>

