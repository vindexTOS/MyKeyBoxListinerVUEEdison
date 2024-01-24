<template>
  <section class="take-your-keys">
    <Rules :back="{name: 'code'}" ref="rules"/>
    <Title/>
    <div class="text font-montserrat">
      PLEASE CLOSE THE DOOR
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
  font-size: 60px;
  text-align: center;
  color: #FE0101;
  margin-top: calc(50% - 160px);
  font-weight: 900;
}
</style>
