<template>
  <section class="take-your-keys">
    <Back :to="{name: 'code'}"/>
    <Rules :back="{name: 'code'}" ref="rules"/>
    <Title/>

    <div class="box-wrapper color-white">
      <div class="block">
        <h3 class="font-russo-one">{{ $helper.trans('confirm_car_details_color') }}</h3>
        <div class="font-montserrat-regular">{{ $route.query.color ? $route.query.color : '-' }}</div>
        <h3 class="font-russo-one mt-2">{{ $helper.trans('confirm_car_details_vin_code') }}</h3>
        <div class="font-montserrat-regular">{{ $route.query.vin ? $route.query.vin : '-' }}</div>
        <h3 class="font-russo-one mt-2">{{ $helper.trans('confirm_car_details_type') }}</h3>
        <div class="font-montserrat-regular">{{ $route.query.vehicle ? $route.query.vehicle : '-' }}</div>
      </div>
    </div>
    <div class="buttons">
      <button class="reject font-montserrat pointer" @click="back">{{ $helper.trans('confirm_car_details_reject') }}</button>
      <button class="confirm font-montserrat pointer" @click="confirm">{{ $helper.trans('confirm_car_details_confirm') }}</button>
    </div>
  </section>
</template>

<script setup>
import Title from "@/components/Title.vue"
import Rules from "@/components/Rules.vue";
import Back from "@/components/Back.vue";
import router from "../router";
</script>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    back() {
      this.$router.push({name: 'code'})
    },
    confirm() {
      if (this.$route.query.type === 'c') {
        this.$router.push({
          name: 'take-key-from-box',
          query: {
            order_id: this.$route.query.order_id,
            box_id: this.$route.query.box_id,
          }
        })
      } else {
        this.$router.push({
          name: 'choose-locker',
          query: {
            order_id: this.$route.query.order_id,
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

.box-wrapper {
  background-color: #363636;
  margin: 30px auto;
  width: 500px;
  height: 470px;
  padding: 30px;
  border-radius: 20px;

  .mt-2 {
    margin-top: 15px;
  }

  .block {
    overflow-y: auto;
    height: 100%;
    padding-right: 5px;

    h3 {
      font-size: 30px;
    }

    div {
      font-size: 25px;
    }

  }
}

.buttons {
  margin-top: -10px;
  display: flex;
  justify-content: space-between;

  button {
    width: calc(50% - 10px);
    border-radius: 20px;
    height: 70px;
    font-size: 25px;
    color: var(--color-dark);

    &.reject {
      background-color: #A9A9A9;
    }

    &.confirm {
      background-color: var(--color-main);
    }
  }
}
</style>
