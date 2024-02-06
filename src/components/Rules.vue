<template>
  <div v-if="back">
    <div class="transition popup" v-bind:class="{shown: shown, 'force-zindex': force_zindex}">
      <div>
        <Back :to="{name: 'home'}" :click="closePopup"/>
        <Title/>
        <div class="rules-wrapper color-white">
          <div class="rules-block">
            <h2 class="font-russo-one">Terms And Conditions</h2>
            <div class="font-montserrat-regular" v-html="$store.state.rules"/>
          </div>
        </div>
        <div class="footer-contact font-montserrat color-white">
          <div>Saburtalo, St. Kazbegi 23</div>
          <div>+995 551 545 716</div>
          <div>Mykeybox.com</div>
          <div>help@mykeybox.com</div>
        </div>
      </div>
    </div>
    <a class="rules pointer" @click="openPopup">
      <div class="inside-wrapper">
        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M27 5.24996C14.9878 5.24996 5.25002 14.9878 5.25002 27C5.25002 39.0122 14.9878 48.75 27 48.75C39.0122 48.75 48.75 39.0122 48.75 27C48.75 14.9878 39.0122 5.24996 27 5.24996ZM0.416687 27C0.416687 12.3184 12.3185 0.416626 27 0.416626C41.6816 0.416626 53.5834 12.3184 53.5834 27C53.5834 41.6815 41.6816 53.5833 27 53.5833C12.3185 53.5833 0.416687 41.6815 0.416687 27ZM27.6238 17.3921C26.4988 17.1991 25.3418 17.4105 24.3577 17.9889C23.3737 18.5672 22.626 19.4752 22.2472 20.5519C21.8043 21.811 20.4246 22.4726 19.1656 22.0297C17.9065 21.5868 17.2449 20.2071 17.6878 18.948C18.4454 16.7945 19.9406 14.9786 21.9088 13.8219C23.8769 12.6652 26.1909 12.2424 28.4409 12.6283C30.6909 13.0142 32.7318 14.184 34.2019 15.9305C35.6718 17.6766 36.4764 19.8865 36.4734 22.1688C36.4723 25.8672 33.7303 28.3095 31.7722 29.6149C30.7194 30.3168 29.6839 30.8328 28.921 31.1719C28.5361 31.3429 28.2121 31.4727 27.9785 31.5617C27.8616 31.6062 27.7667 31.6408 27.6977 31.6653L27.6138 31.6947L27.5871 31.7038L27.5776 31.707L27.5739 31.7083C27.5732 31.7085 27.5709 31.7093 26.8067 29.4166L27.5709 31.7093C26.3047 32.1313 24.9361 31.447 24.514 30.1808C24.0921 28.9151 24.7758 27.547 26.0412 27.1244L26.0785 27.1113C26.1157 27.0981 26.1766 27.076 26.2579 27.045C26.4208 26.9829 26.6632 26.8862 26.958 26.7551C27.5545 26.49 28.3314 26.0998 29.0912 25.5933C30.7577 24.4823 31.64 23.3004 31.64 22.1666L31.64 22.163C31.6417 21.0216 31.2394 19.9164 30.5043 19.0432C29.7692 18.1699 28.7488 17.585 27.6238 17.3921ZM24.5834 39.0833C24.5834 37.7486 25.6653 36.6666 27 36.6666H27.0242C28.3589 36.6666 29.4409 37.7486 29.4409 39.0833C29.4409 40.418 28.3589 41.5 27.0242 41.5H27C25.6653 41.5 24.5834 40.418 24.5834 39.0833Z"
                fill="white"/>
        </svg>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.rules {
  background-color: #2B2B2B;
  border: 1px solid #2B2B2B;
  border-radius: 18px;
  color: white;
  padding: 16px 16px;
  position: absolute;
  left: 3px;
  bottom: 3px;
  transform: scale(0.7);

  .inside-wrapper {
    width: 54px;
    height: 54px;
  }
}

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
</style>

<script>
import Title from "@/components/Title.vue";
import Back from "@/components/Back.vue";

export default {
  components: {Back, Title},
  props: {
    back: Object,
  },
  data() {
    return {
      shown: false,
      force_zindex: false,
    }
  },
  methods: {
    closePopup(e) {
      e.stopPropagation()
      e.preventDefault()
      this.shown = false
      this.force_zindex = true
      setTimeout(() => {
        this.force_zindex = false
      }, 500)
    },
    openPopup() {
      this.shown = true
      this.$axios.get('api/GetRules').then((response) => {
        let newRules = response.data && response.data.message ? response.data.message : ''
        if (newRules) {
          this.$store.commit('setRules', newRules)
        }
      })
    },
  },
}
</script>
