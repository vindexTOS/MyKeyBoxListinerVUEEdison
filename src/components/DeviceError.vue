<template>
  <div class="transition popup" v-bind:class="{shown: shown, 'force-zindex': force_zindex, 'd-none': !shown}">
    <DeviceCode/>
    <div>
      <Title/>
      <div class="rules-wrapper color-white">
        <div class="rules-block">
          <h1 class="font-russo-one text-center">{{ $helper.trans('device_error_something_went_wrong') }}</h1>
          <h2 class="font-montserrat-regular">{{ $helper.trans('device_error_please_contact_support') }}</h2>
        </div>
      </div>
      <div class="footer-contact font-montserrat color-white">
        <div>{{ $helper.trans('contact_address') }}</div>
        <div>{{ $helper.trans('contact_phone') }}</div>
        <div>{{ $helper.trans('contact_domain') }}</div>
        <div>{{ $helper.trans('contact_email') }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  background: url('/src/assets/image/bg.svg') center fixed;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  &.shown {
    opacity: 1;
    z-index: 1;
  }

  &.force-zindex {
    z-index: 1 !important;
  }
}

.rules-wrapper {
  background-color: #363636;
  margin: 30px auto;
  width: 500px;
  height: 580px;
  padding: 15px;
  border-radius: 20px;

  .rules-block {
    overflow-y: auto;
    height: 100%;
    padding-right: 5px;

    h2 {
      font-size: 30px;
    }

    div {
      font-size: 20px;
    }

    &::-webkit-scrollbar {
      width: 5px;
      transition: all 0.5s;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #D9D9D9;
      border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}

.footer-contact {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
  font-size: 20px;
}

.d-none {
  display: none;
}
</style>

<script>
import Title from "@/components/Title.vue";
import Back from "@/components/Back.vue";
import DeviceCode from "@/components/DeviceCode.vue";

export default {
  components: {DeviceCode, Back, Title},
  data() {
    return {
      shown: false,
      force_zindex: false,
    }
  },
  mounted() {
    setInterval(() => {
      this.checkServer()
    }, 1000)
    this.checkServer()
  },
  methods: {
    closePopup() {
      this.shown = false
      this.force_zindex = true
      setTimeout(() => {
        this.force_zindex = false
      }, 500)
    },
    openPopup() {
      this.shown = true
      this.$router.push({name: 'home'})
    },
    checkServer() {
      this.$axios.get('/check').then((response) => {
        if (response.status === 200 && Array.isArray(response.data.doors)) {
          if (this.shown) {
            this.closePopup()
          }
        } else {
          this.openPopup()
        }
      }, () => {
        this.openPopup()
      })
    },
  },
}
</script>
