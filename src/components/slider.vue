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
      evt.preventDefault();
      this.dragging = true;
    },

    onSwipeMove(evt) {
      if (!this.dragging) {
        return;
      }

      const position = evt.pageX || evt.touches[0].pageX;

      this.currentX =
        position < 0 || position > this.sliderInputBCR.width - 10 ? this.currentX : position;
    },

    onSwipeEnd(evt) {
      this.dragging = false;
    },

    calculateDurationFromPosition() {
      this.$parent.duration = Math.floor(this.currentX / this.partsWidth) + 1;
    },

    update() {
      requestAnimationFrame(this.update);

      if (!this.sliderController) {
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

    this.sliderController.addEventListener('mousedown', this.onSwipeStart);
    this.sliderController.addEventListener('mousemove', this.onSwipeMove);
    this.sliderController.addEventListener('mouseup', this.onSwipeEnd);

    this.sliderController.addEventListener('touchstart', this.onSwipeStart);
    this.sliderController.addEventListener('touchmove', this.onSwipeMove);
    this.sliderController.addEventListener('touchend', this.onSwipeEnd);
    window.addEventListener('resize', this.onResize);

    this.onResize();
    requestAnimationFrame(this.update);
  },
  destroyed() {
    this.sliderController.removeEventListener('mousestart', this.onSwipeStart);
    this.sliderController.removeEventListener('mousemove', this.onSwipeMove);
    this.sliderController.removeEventListener('mouseend', this.onSwipeEnd);

    this.sliderController.removeEventListener('touchstart', this.onSwipeStart);
    this.sliderController.removeEventListener('touchmove', this.onSwipeMove);
    this.sliderController.removeEventListener('touchend', this.onSwipeEnd);
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

