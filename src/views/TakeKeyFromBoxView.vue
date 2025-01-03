<template>
  <section class="choose-locker">
    <Back :to="{ name: 'home' }" />
    <Rules :back="{ name: 'code' }" />
    <div>
      <div class="row-wrapper">
        <div class="text-wrapper">
          <div class="text-block color-white">
            <div class="font-montserrat">
              {{ $helper.trans('message_take_key_from_yellow_box_line_1') }}<br />
              <span class="color-main">{{ $helper.trans('message_take_key_from_yellow_box_line_2_yellow') }}</span> {{
                $helper.trans('message_take_key_from_yellow_box_line_2_white') }}<br />
              {{ $helper.trans('message_take_key_from_yellow_box_line_3') }}
            </div>
          </div>
        </div>
        <div class="lockers-wrapper">
          <div class="lockers-grid">
            <div class="item font-montserrat" v-for="(boxData, index) in boxes"
              v-bind:class="{ selected: isCurrentBox(index) }">
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

      box_index: null,
      box_id: null,
      order_id: null,
    }
  },
  mounted() {
    this.loadBoxes()
  },
  computed: {},
  methods: {
    loadBoxes() {
      this.order_id = this.$route.query.order_id


      this.$axios.get('api/GetBoxesByUniqueKey/' + this.$store.state.unique_code).then((response) => {
        console.log(response.data)
        this.boxes = response.data.boxes
        this.box_index = this.getCurrentBoxIndex()
        this.box_id = this.boxes[this.box_index].id
        console.log(this.box_index)
        this.deviceOpenTheDoor(this.box_index).then((response) => {
          if (response.status === 200) {
            this.apiSetOrderStatus(4).then((response) => {
              if (response.status === 200) {
                this.setTimeoutAndInterval()
              } else {
                alert(this.$helper.trans('server_error_cant_set_order_status') + ' (s)')
              }
            }, () => {
              alert(this.$helper.trans('server_error_cant_set_order_status'))
            })
          } else {
            alert(this.$helper.trans('server_error_door_cant_be_opened') + ' (s)')
          }
        }, () => {
          alert(this.$helper.trans('server_error_door_cant_be_opened'))
        })
      }, () => {
        alert(this.$helper.trans('server_error_cant_get_boxes_from_server'))
      })
    },
    isCurrentBox(index) {
      return index === this.box_index
    },
    getCurrentBoxIndex() {
      return this.boxes.findIndex((item) => {
        return item.boxName === this.$route.query.box_id
      })
    },
    showThankYou(timeout = 5000) {
      this.apiSetOrderStatus(5) // Door closed  by dealer, key in box
      this.$router.push({ name: 'thank-you' })
      setTimeout(() => {
        this.$router.push({ name: 'home' })
      }, timeout)
    },
    showCloseDoorAndStartInterval(interval = 1000) {
      let index = this.box_index
      this.$router.push({ name: 'close-the-door' })
      let checkDoorCloseInterval = null;
      checkDoorCloseInterval = setInterval(() => {
        this.$axios.get('/check').then((response) => {
          if (response.status === 200 && response.data && response.data.doors && Array.isArray(response.data.doors) && response.data.doors.length > index) {
            if (response.data.doors[index] === 1) {
              clearInterval(checkDoorCloseInterval)
              this.showThankYou()
            }
          }
        })
      }, interval)
    },
    setTimeoutAndInterval(timeout = 8000) {
      let index = this.box_index
      setTimeout(() => {
        this.$axios.get('/check').then((response) => {
          if (response.status === 200 && response.data && response.data.doors && Array.isArray(response.data.doors) && response.data.doors.length > index) {
            if (response.data.doors[index] !== 1) {
              this.showCloseDoorAndStartInterval()
            } else {
              this.showThankYou()
            }
          }
        }, () => {
          this.showCloseDoorAndStartInterval(index)
        })
      }, timeout)
    },

    apiSetOrderStatus(status_id) {
      return this.$axios.post(`api/SetOrderStatus`, {
        "orderId": this.order_id,
        "boxId": this.box_id,
        "status": status_id
      })
    },
    deviceOpenTheDoor(index) {
      return this.$axios.get('/open/' + index)
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
        font-size: 40px;
        width: 450px;

        .choose-locker-hint {
          font-size: 25px;
        }

        .green {
          color: #52FE01;
        }
      }
    }

    .lockers-wrapper {
      width: 50%;
      height: 750px;
      overflow: hidden;

      .lockers-grid {
        margin-left: 150px;
        display: grid;
        grid-template-columns: 150px 150px;
        gap: 16px;

        .item {
          background-color: #363636;
          color: rgba(256, 256, 256, 0.3);
          width: 90px;
          height: 60px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 35px;

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
