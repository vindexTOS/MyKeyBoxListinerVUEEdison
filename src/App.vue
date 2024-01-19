<template>
  <div class="cube">
    <div class="flex-center-container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <DeviceError/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cube {
  width: 1277px;
  height: 797px;
  //border: 1px solid red; // Only for testing
  position: absolute;
  left: -1px;
  top: 3px;
  right: 0;
  margin: auto;
}

:global(body) {
  overflow: hidden;
  user-select: none;
}

/* Add styles for the tap effect */
:global(.ripple) {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: rippleAnimation 0.2s linear;
  background-color: var(--color-main);
  pointer-events: none;
  opacity: 0.2;
  width: 10px;
  height: 10px;
  z-index: 100000;
}
</style>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import DeviceError from "@/components/DeviceError.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      initial_countdown: 60,
      countdown: 60,
    }
  },
  mounted() {
    this.$el.addEventListener('click', () => this.countdown = this.initial_countdown)
    this.$el.addEventListener('mousemove', () => this.countdown = this.initial_countdown)
    this.$el.addEventListener('keypress', () => this.countdown = this.initial_countdown)
    this.$el.addEventListener('keyup', () => this.countdown = this.initial_countdown)
    this.$el.addEventListener('touchstart', () => this.countdown = this.initial_countdown)
    this.$el.addEventListener('touchmove', () => this.countdown = this.initial_countdown)

    setInterval(() => {
        this.countdown = this.countdown - 1
        if (this.countdown <= 0) {
          if (this.$route.name === 'home') {
            window.location.href = '/'
          } else {
            this.countdown = this.initial_countdown
          }
        }
    }, 1000)

    // Hide the cursor on page load
    document.body.style.cursor = 'none';

    // Add tap effect to the body or specific clickable elements
    document.body.addEventListener('click', this.handleTapEffect);
  },
  methods: {
    handleTapEffect(event) {
      // Implement your tap effect logic here
      // For example, you can add a ripple effect to the clicked element
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);

      // Remove the ripple element after a short delay
      setTimeout(() => {
        ripple.remove();
      }, 200);
    },
  },
}
</script>

<style>
@keyframes rippleAnimation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
