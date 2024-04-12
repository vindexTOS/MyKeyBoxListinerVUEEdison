<template>
    <section class="homepage">
        <DeviceCode/>
        <div class="welcome text-center color-white font-montserrat">{{ $helper.trans('home_screen_welcome_to') }}</div>
        <div class="mykeybox text-center color-main font-russo-one">{{ $helper.trans('home_screen_mykeybox') }}</div>
        <div class="flex-center-container">
            <router-link :to="{name: 'code'}" class="press-to-start font-montserrat">{{ $helper.trans('home_screen_press_to_start') }}</router-link>
        </div>
        <div class="flags">
            <div v-for="locale in $store.state.available_locales">
              <img :src="`/flags/${locale.locale}.jpg`" @click="setLocale(locale.locale)"/>
            </div>
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

  .flags {
    display: flex;
    justify-content: space-between;
    width: 700px;
    margin: auto;
    margin-top: 30px;

    img {
      width: 130px;
      height: 80px;
    }
  }
}
</style>
<script setup>
import DeviceCode from "@/components/DeviceCode.vue";
</script>
<script>
export default {
  mounted() {
    this.setLocale(this.$store.state.default_locale)
  },
  methods: {
    setLocale(locale) {
      this.$store.commit('setCurrentLocale', locale)
    },
  },
}
</script>
