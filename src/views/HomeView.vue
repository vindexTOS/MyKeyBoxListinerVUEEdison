<template>
    <section class="homepage">
        <DeviceCode/>
        <div class="welcome text-center color-white font-montserrat">{{ $helper.trans('home_screen_welcome_to') }}</div>
        <div class="mykeybox text-center color-main font-russo-one">{{ $helper.trans('home_screen_mykeybox') }}</div>
        <div class="flex-center-container">
            <router-link :to="{name: 'code'}" class="press-to-start font-montserrat">{{ $helper.trans('home_screen_press_to_start') }}</router-link>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.homepage {
  height: 100vh;

  .welcome {
    margin-top: 70px;
    font-size: 70px;
  }

  .mykeybox {
    font-size: 170px;
  }

  .press-to-start {
    color: var(--color-dark);
    background-color: var(--color-main);
    border-radius: 34px;
    font-size: 50px;
    padding: 28px 48px;
    margin-top: 70px;
  }
}
</style>
<script setup>
import DeviceCode from "@/components/DeviceCode.vue";
</script>
<script>
export default {
  data() {
    return {
      locales_interval: undefined,
      showing_locale: 0,
    }
  },
  mounted() {
    this.locales_interval = setInterval(() => {
      // this.$store.commit('setCurrentLocale', this.$store.state.available_locales[this.showing_locale].locale)
      // this.showing_locale = (this.showing_locale + 1) % this.$store.state.available_locales.length
    }, 2000)
  },
  beforeDestroy() {
    if (this.locales_interval) {
      clearInterval(this.locales_interval)
    }
  },
}
</script>
