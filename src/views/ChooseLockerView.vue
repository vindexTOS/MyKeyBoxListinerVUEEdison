<template>
  <section class="choose-locker">
    <Back :to="{name: 'code'}"/>
    <Rules :back="{name: 'code'}"/>
    <div>
      <div class="row-wrapper">
        <div class="text-wrapper">
          <div class="text-block color-white">
            <div class="choose-locker-text font-montserrat">
              {{ $helper.trans('choose_locker_title') }}
            </div>
            <div class="choose-locker-hint font-montserrat-regular">
              {{ $helper.trans('choose_locker_secondary_title_white_start') }} <span class="green">{{ $helper.trans('choose_locker_secondary_title_green') }}</span> {{ $helper.trans('choose_locker_secondary_title_white_end') }}
            </div>
          </div>
        </div>
        <div class="lockers-wrapper" ref="lockersWrapper">
          <div class="lockers-grid">
            <div
                class="item font-montserrat"
                v-for="(boxData, index) in boxes"
                v-bind:class="{available: boxIsAvailable(index), pointer: boxIsAvailable(index), unavailable: !boxIsAvailable(index)}"
                @click="selectBox(index)"
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
import Rules from "@/components/Rules.vue";
</script>

<script>
export default {
  data() {
    return {
      boxes: [],

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
      this.$axios.get('api/GetBoxes').then((response) => {
        this.boxes = response.data
      })
    },
    dimBoxSelector() {
      this.$refs.lockersWrapper.classList.add('dimmed')
    },
    undoDimBoxSelector() {
      this.$refs.lockersWrapper.classList.remove('dimmed')
    },
    boxIsAvailable(index) {
      return this.boxes[index] && this.boxes[index].boxStatus === 'Free'
    },
    selectBox(index) {
      if (this.boxIsAvailable(index)) {
        this.order_id = this.$route.query.order_id
        this.box_id = this.boxes[index].boxId

        this.dimBoxSelector()
        let alertAndUndoDim = (message) => {
          alert(message)
          this.undoDimBoxSelector()
        }

        this.$axios.get('open/' + index).then((response) => {
          if (response.status === 200) {
            this.setBoxForOrder().then((response) => {
              if (response.status === 200) { // Box assigned to order
                this.setOrderStatus(2).then((response) => { // Open but not closed by dealer
                  if (response.status === 200) { // Box assigned to order
                    this.showToPutTheKeyAndDoTheLogic(index)
                  } else {
                    alertAndUndoDim(this.$helper.trans('server_error_cant_set_order_status') + ' (s)')
                  }
                }, () => {
                  alertAndUndoDim(this.$helper.trans('server_error_cant_set_order_status'))
                })
              } else {
                alertAndUndoDim(this.$helper.trans('server_error_box_cant_be_assigned_to_order') + ' (s)')
              }
            }, () => {
              alertAndUndoDim(this.$helper.trans('server_error_box_cant_be_assigned_to_order'))
            })
          } else {
            alertAndUndoDim(this.$helper.trans('server_error_door_cant_be_opened') + ' (s)')
          }
        }, () => {
          alertAndUndoDim(this.$helper.trans('server_error_door_cant_be_opened'))
        })
      }
    },
    showThankYou(timeout = 5000) {
      this.setOrderStatus(3) // Door closed  by dealer, key in box
      this.$router.push({name: 'thank-you'})
      setTimeout(() => {
        this.$router.push({name: 'home'})
      }, timeout)
    },
    showCloseDoorAndStartInterval(index, interval = 1000) {
      this.$router.push({name: 'close-the-door'})
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
    showToPutTheKeyAndDoTheLogic(index, timeout = 8000) {
      this.$router.push({name: 'key-with-text', query: {text: `${this.$helper.trans('message_put_the_key_line_1')}<br>${this.$helper.trans('message_put_the_key_line_2')}`}})
      setTimeout(() => {
        this.$axios.get('/check').then((response) => {
          if (response.status === 200 && response.data && response.data.doors && Array.isArray(response.data.doors) && response.data.doors.length > index) {
            if (response.data.doors[index] !== 1) {
              this.showCloseDoorAndStartInterval(index)
            } else {
              this.showThankYou()
            }
          }
        }, () => {
          this.showCloseDoorAndStartInterval(index)
        })
      }, timeout)
    },
    setOrderStatus(status_id) {
      return this.$axios.post(`api/SetOrderStatus?orderId=${this.order_id}&boxId=${this.box_id}&statusId=${status_id}`)
    },
    setBoxForOrder() {
      return this.$axios.post(`api/SetOrderBoxId/?orderId=${this.order_id}&boxId=${this.box_id}`)
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
      &.dimmed {
        opacity: 0.1;
      }

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

          border: 2px solid rgba(0, 0, 0, 0);

          &.available {
            border: 2px solid #52FE01 !important;
            color: #52FE01 !important;
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
