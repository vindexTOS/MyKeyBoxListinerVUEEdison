<template>
  <section class="choose-locker">
    <div>
      <div class="row-wrapper">
        <div class="text-wrapper">
          <div class="text-block color-white">
            <div class="font-montserrat">
              Tap and open any box
              for <span class="color-main">testing</span> only
            </div>
          </div>
        </div>
        <div class="lockers-wrapper">
          <div class="lockers-grid">
            <div
                class="item font-montserrat selected pointer"
                v-for="(boxData, index) in boxes"
                @click="deviceOpenTheDoor(index)"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Back from "@/components/Back.vue"
import Title from "@/components/Title.vue"
import Rules from "@/components/Rules.vue";
</script>

<script>
export default {
  data() {
    return {
      boxes: [],
    }
  },
  mounted() {
    this.loadBoxes()
  },
  computed: {},
  methods: {
    loadBoxes() {
      this.$axios.get('api/status').then((response) => {
        this.boxes = response.data.doors
      })
    },
    deviceOpenTheDoor(index) {
      return this.$axios.get('api/open/' + index)
    },
  },
}
</script>

<style lang="scss" scoped>
.choose-locker {
  width: 100%;

  .row-wrapper {
    display: flex;
    width: 100%;
    margin-top: 20px;

    .text-wrapper {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 150px;

      .text-block {
        font-size: 26px;
        width: 270px;

        .choose-locker-hint {
          font-size: 18px;
        }

        .green {
          color: #52FE01;
        }
      }
    }

    .lockers-wrapper {
      width: 50%;
      height: 490px;
      overflow: hidden;

      .lockers-grid {
        margin-left: 65px;
        display: grid;
        grid-template-columns: 90px 90px;
        gap: 10px;

        .item {
          background-color: #363636;
          color: rgba(256, 256, 256, 0.3);
          width: 90px;
          height: 40px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;

          border: 2px solid #363636;

          &.selected {
            border: 2px solid var(--color-main) !important;
            background-color: var(--color-main);
            color: var(--color-dark)
          }

          &.unavailable {
            border: 2px solid #FE0101 !important;
          }
        }
      }
    }
  }
}
</style>