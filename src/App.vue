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
  width: 854px;
  height: 532px;
  //border: 1px solid red; // Only for testing
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
}

:global(body) {
  overflow: hidden;
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
      initial_countdown: 10,
      countdown: 10,
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
            window.location.reload()
        }
    }, 1000)
  },
}
</script>