<template>
  <section class="take-your-keys">
    <Rules :back="{name: 'code'}" ref="rules"/>
    <Title/>
    <div class="text font-montserrat color-white">
      {{ $helper.trans('message_thank_you') }}
    </div>
  </section>
</template>

<script setup>
import Title from "@/components/Title.vue"
import Rules from "@/components/Rules.vue";
</script>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 100px;
  text-align: center;
  margin-top: 170px;
  font-weight: 900;
}
</style>
