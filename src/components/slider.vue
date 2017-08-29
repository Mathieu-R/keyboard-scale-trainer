<template>
  <div class="slider">
    <div class="slider-input">
      <div class="slider-controller"></div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    duration: Number
  },
  data() {
    return {
      sliderController: null,
      dragging: false,
      startX: null,
      currentX: null,
      sliderInputBCR: null
    }
  },
  methods: {
    onResize() {
      this.sliderInputBCR = this.$el.querySelector('.slider-input').getBoundingClientRect();
    },

    onSwipeStart(evt) {
      evt.preventDefault();
      this.dragging = true;
    },

    onSwipeMove(evt) {
      if (!this.dragging) {
        return;
      }

      this.currentX = evt.pageX || evt.touches[0].pageX;
    },

    onSwipeEnd(evt) {
      this.dragging = false;
    },

    update() {
      requestAnimationFrame(this.update);

      if (!this.sliderController) {
        return;
      }

      if (this.currentX < 0 || this.currentX > this.sliderInputBCR.width - 10) {
        return;
      }

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
    justify-content: center;
    margin-bottom: 10px;

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

