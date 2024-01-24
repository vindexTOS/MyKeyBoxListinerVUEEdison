<template>
  <section class="choose-locker">
    <Back :to="{name: 'code'}"/>
    <Rules :back="{name: 'code'}"/>
    <div>
      <div class="row-wrapper">
        <div class="text-wrapper">
          <div class="text-block color-white">
            <div class="choose-locker-text font-montserrat">
              Choose locker to save the key
            </div>
            <div class="choose-locker-hint font-montserrat-regular">
              Only <span class="green">Green</span> lockers are empty
            </div>
          </div>
        </div>
        <div class="lockers-wrapper">
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
      this.$axios.get('api/GetBoxes').then((response) => {
        this.boxes = response.data
      })
    },
    boxIsAvailable(index) {
      return this.boxes[index].boxStatus === 'Free'
    },
    selectBox(index) {
      if (this.boxIsAvailable(index)) {
        this.$axios.get('open/' + index).then((response) => {
          if (response.status === 200) {
            let order_id = this.$route.query.order_id
            let box_id = this.boxes[index].boxId
            this.setBoxForOrder(box_id, order_id).then((response) => {
              if (response.status === 200) { // Box assigned to order
                this.setOrderStatus(box_id, 2).then((response) => { // Open but not closed by dealer
                  if (response.status === 200) { // Box assigned to order
                    this.showToPutTheKeyAndDoTheLogic(index, box_id)
                  }
                })
              }
            })
          }
        })
      }
    },
    showThankYou(box_id, timeout = 5000) {
      this.setOrderStatus(box_id, 3) // Door closed  by dealer, key in box
      this.$router.push({name: 'thank-you'})
      setTimeout(() => {
        this.$router.push({name: 'home'})
      }, timeout)
    },
    showCloseDoorAndStartInterval(index, box_id, interval = 1000) {
      this.$router.push({name: 'close-the-door'})
      let checkDoorCloseInterval = null;
      checkDoorCloseInterval = setInterval(() => {
        this.$axios.get('/check').then((response) => {
          if (response.status === 200 && response.data && response.data.doors && Array.isArray(response.data.doors) && response.data.doors.length > index) {
            if (response.data.doors[index] === 1) {
              clearInterval(checkDoorCloseInterval)
              this.showThankYou(box_id)
            }
          }
        })
      }, interval)
    },
    showToPutTheKeyAndDoTheLogic(index, box_id, timeout = 8000) {
      this.$router.push({name: 'key-with-text', query: {text: 'Please put the key and<br>close the door'}})
      setTimeout(() => {
        this.$axios.get('/check').then((response) => {
          if (response.status === 200 && response.data && response.data.doors && Array.isArray(response.data.doors) && response.data.doors.length > index) {
            if (response.data.doors[index] !== 1) {
              this.showCloseDoorAndStartInterval(index, box_id)
            } else {
              this.showThankYou(box_id)
            }
          }
        }, () => {
          this.showCloseDoorAndStartInterval(index)
        })
      }, timeout)
    },
    setOrderStatus(box_id, status_id) {
      return this.$axios.post(`api/SetOrderStatus?boxId=${box_id}&statusId=${status_id}`)
    },
    setBoxForOrder(box_id, order_id) {
      return this.$axios.post(`api/SetOrderBoxId/?orderId=${order_id}&boxId=${box_id}`)
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
