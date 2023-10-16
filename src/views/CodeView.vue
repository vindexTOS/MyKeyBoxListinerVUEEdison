<template>
  <section class="code">
    <Back :to="{name: 'home'}"/>
    <Rules :back="{name: 'code'}" ref="rules"/>
    <Title/>
    <div class="enter-code-text-wrapper text-center font-montserrat">
      <span class="color-white">Please Enter Your </span>
      <span class="color-main">6 Digit Code</span>
    </div>

    <div class="code-container">
      <div class="code-wrapper">
        <input
            class="font-prompt text-center transition"
            v-bind:class="{filled: type, invalid: invalid, valid: valid}"
            :value="type"
            readonly disabled
        />

        <span class="font-prompt">-</span>
        <input
            class="font-prompt text-center transition"
            v-bind:class="{filled: code.length > 0, invalid: invalid, valid: valid}"
            :value="getCodeCharAt(0)"
            readonly disabled
        />
        <input
            class="font-prompt text-center transition"
            v-bind:class="{filled: code.length > 1, invalid: invalid, valid: valid}"
            :value="getCodeCharAt(1)"
            readonly disabled
        />
        <input
            class="font-prompt text-center transition"
            v-bind:class="{filled: code.length > 2, invalid: invalid, valid: valid}"
            :value="getCodeCharAt(2)"
            readonly disabled
        />
        <input
            class="font-prompt text-center transition"
            v-bind:class="{filled: code.length > 3, invalid: invalid, valid: valid}"
            :value="getCodeCharAt(3)"
            readonly disabled
        />
        <input
            class="font-prompt text-center transition"
            v-bind:class="{filled: code.length > 4, invalid: invalid, valid: valid}"
            :value="getCodeCharAt(4)"
            readonly disabled
        />
        <input
            class="font-prompt text-center transition"
            v-bind:class="{filled: code.length > 5, invalid: invalid, valid: valid}"
            :value="getCodeCharAt(5)"
            readonly disabled
        />
      </div>

      <!--            <input-->
      <!--                    class="font-prompt text-center transition type"-->
      <!--                    v-bind:class="{filled: type, invalid: invalid, valid: valid}"-->
      <!--                    :value="type"-->
      <!--                    readonly disabled-->
      <!--            />-->
    </div>

    <div class="message text-center font-montserrat">
      <div class="invalid" v-if="invalid">
        Pin code is incorrect. Try again
      </div>
      <div class="valid" v-if="valid">
        Your pin code is correct!
      </div>
    </div>

    <template v-if="invalid">
      <div class="flex-center-container">
        <a class="try-again font-montserrat pointer" @click="tryAgain">Try again</a>
      </div>
    </template>

    <template v-if="!invalid">
      <div class="keyboard" v-bind:class="{'disable-pointer-events': invalid || valid || checking}">
        <div class="font-montserrat color-white transition" @click="setType('C')"
             v-bind:class="{disabled: type === 'C' || checking}">
          C
        </div>
        <div class="font-montserrat color-white transition disabled"></div>
        <div class="font-montserrat color-white transition" @click="setType('D')"
             v-bind:class="{disabled: type === 'D'} || checking">
          D
        </div>

        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(1)">1
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(2)">2
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(3)">3
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(4)">4
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(5)">5
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(6)">6
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(7)">7
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(8)">8
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(9)">9
        </div>

        <div class="font-montserrat color-white transition delete"
             v-bind:class="{disabled: code.length === 0 || checking}"
             @click="removeCharacter">
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_120_470)">
              <path
                  d="M26.6669 13.3333C26.3544 13.0209 25.9305 12.8453 25.4886 12.8453C25.0466 12.8453 24.6228 13.0209 24.3102 13.3333L20.0002 17.6433L15.6902 13.3333C15.3759 13.0297 14.9549 12.8617 14.5179 12.8655C14.0809 12.8693 13.6629 13.0446 13.3539 13.3536C13.0449 13.6626 12.8696 14.0807 12.8658 14.5176C12.862 14.9546 13.03 15.3756 13.3336 15.69L17.6436 20L13.3336 24.31C13.03 24.6243 12.862 25.0453 12.8658 25.4823C12.8696 25.9193 13.0449 26.3374 13.3539 26.6464C13.6629 26.9554 14.0809 27.1307 14.5179 27.1345C14.9549 27.1383 15.3759 26.9703 15.6902 26.6667L20.0002 22.3567L24.3102 26.6667C24.6246 26.9703 25.0456 27.1383 25.4826 27.1345C25.9196 27.1307 26.3376 26.9554 26.6466 26.6464C26.9556 26.3374 27.1309 25.9193 27.1347 25.4823C27.1385 25.0453 26.9705 24.6243 26.6669 24.31L22.3569 20L26.6669 15.69C26.9794 15.3774 27.1549 14.9536 27.1549 14.5117C27.1549 14.0697 26.9794 13.6459 26.6669 13.3333Z"
                  fill="#0D0D0D"/>
              <path
                  d="M20 0C16.0444 0 12.1776 1.17298 8.8886 3.37061C5.59962 5.56823 3.03617 8.69181 1.52242 12.3463C0.00866572 16.0008 -0.387401 20.0222 0.384303 23.9018C1.15601 27.7814 3.06082 31.3451 5.85787 34.1421C8.65492 36.9392 12.2186 38.844 16.0982 39.6157C19.9778 40.3874 23.9992 39.9913 27.6537 38.4776C31.3082 36.9638 34.4318 34.4004 36.6294 31.1114C38.827 27.8224 40 23.9556 40 20C39.9943 14.6974 37.8853 9.61368 34.1358 5.8642C30.3863 2.11471 25.3026 0.00573513 20 0V0ZM20 36.6667C16.7037 36.6667 13.4813 35.6892 10.7405 33.8578C7.99969 32.0265 5.86348 29.4235 4.60202 26.378C3.34056 23.3326 3.0105 19.9815 3.65359 16.7485C4.29668 13.5155 5.88402 10.5458 8.2149 8.21488C10.5458 5.88401 13.5155 4.29666 16.7485 3.65358C19.9815 3.01049 23.3326 3.34055 26.3781 4.60201C29.4235 5.86347 32.0265 7.99967 33.8578 10.7405C35.6892 13.4813 36.6667 16.7036 36.6667 20C36.6618 24.4188 34.9043 28.6552 31.7798 31.7797C28.6552 34.9043 24.4188 36.6618 20 36.6667Z"
                  fill="#0D0D0D"/>
            </g>
            <defs>
              <clipPath id="clip0_120_470">
                <rect width="40" height="40" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="font-montserrat color-white transition" v-bind:class="{disabled: code.length === max_length}"
             @click="addCharacter(0)">0
        </div>
        <div class="font-montserrat color-white transition enter"
             v-bind:class="{disabled: checkCodeDisabled || checking}"
             @click="checkCode"
        >
          <svg width="30" height="30" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M40 16.9861C39.9861 15.4944 39.3804 14.0683 38.3143 13.0166L26.0571 0.824507C25.5218 0.296416 24.7977 0 24.0429 0C23.288 0 22.5639 0.296416 22.0286 0.824507C21.7608 1.08809 21.5482 1.40169 21.4032 1.7472C21.2581 2.09272 21.1834 2.46332 21.1834 2.83762C21.1834 3.21193 21.2581 3.58253 21.4032 3.92804C21.5482 4.27356 21.7608 4.58715 22.0286 4.85074L31.4286 14.1508H2.85714C2.09938 14.1508 1.37266 14.4495 0.836838 14.9812C0.30102 15.513 0 16.2342 0 16.9861C0 17.7381 0.30102 18.4593 0.836838 18.9911C1.37266 19.5228 2.09938 19.8215 2.85714 19.8215H31.4286L22.0286 29.1499C21.4906 29.6801 21.1868 30.4006 21.1841 31.153C21.1814 31.9054 21.4801 32.6281 22.0143 33.162C22.5485 33.6959 23.2746 33.9973 24.0328 34C24.7909 34.0026 25.5191 33.7063 26.0571 33.1761L38.3143 20.984C39.3874 19.9254 39.9936 18.4877 40 16.9861Z"
                fill="#0D0D0D"/>
          </svg>
        </div>
      </div>

      <div class="terms text-center font-montserrat transition"
           v-bind:class="{'disable-pointer-events': invalid || valid || checking}">
        <label class="checkbox-wrapper transition">
                <span class="regular">
                    I agree with MyKeyBox's
                </span>
          <span class="link color-main" @click="openRules">
                    Terms & Rules
                </span>
          <input type="checkbox" v-model="checked">
          <span class="checkmark transition"></span>
        </label>
      </div>
    </template>
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
      code: '123456',
      type: 'D',
      checked: false,
      invalid: false,
      checking: false,
      valid: false,

      max_length: 6,
    }
  },
  computed: {
    checkCodeDisabled() {
      return this.code.length !== this.max_length || !this.type || !this.checked
    },
  },
  methods: {
    getCodeCharAt(index) {
      return this.code.length > index ? this.code[index] : ''
    },
    addCharacter(char) {
      if (this.code.length < this.max_length) {
        this.code = `${this.code}${char}`
      }
    },
    setType(char) {
      this.type = char
    },
    removeCharacter() {
      if (this.code.length > 0) {
        this.code = this.code.substring(0, this.code.length - 1);
      }
    },
    openRules(e) {
      e.stopPropagation()
      e.preventDefault()
      this.$refs.rules.openPopup()
    },
    checkCode() {
      if (!this.checkCodeDisabled) {
        this.checking = true;
        this.$axios.get(`api/proxy/GetOrderByCode?Code=${this.type}:${this.code}`).then((response) => {
          if (
              response.data &&
              response.data.orderStatus &&
              response.data.id && (
                  (this.type.toLowerCase() === 'c' && [3].includes(response.data.orderStatus)) || // Door closed  by dealer, key in box
                  (this.type.toLowerCase() === 'd' && [1].includes(response.data.orderStatus)) // Key is not in box
              )
          ) {
            this.valid = true;
            setTimeout(() => {
              this.$router.push({
                name: 'confirm-car-details',
                query: {
                  order_id: response.data.id,
                  box_id: response.data.boxName,
                  type: this.type.toLowerCase(),
                  vin: response.data.vin,
                  color: response.data.color,
                  vehicle: response.data.vechile,
                }
              })
            }, 1000)
          } else {
            this.invalid = true;
            this.checking = false;
          }
        }, () => {
          this.invalid = true;
          this.checking = false;
        })
      }
    },
    tryAgain() {
      this.invalid = false
      this.valid = false
      this.code = ''
      // this.type = ''
      // this.checked = false
    },
  },
}
</script>

<style lang="scss" scoped>
.enter-code-text-wrapper {
  margin-top: 10px;

  .color-white, .color-main {
    font-size: 20px;
  }
}

.code-wrapper {
  display: flex;
  justify-content: center;

  span {
    font-size: 35px;
    color: white;
    margin: 0 10px;
  }
}

.code-container {
  position: relative;
  margin-top: 10px;

  .code-wrapper input, input.type {
    pointer-events: none;
    width: 45px;
    height: 45px;
    background-color: #363636;
    border-radius: 12px;
    color: white;
    border: 3px solid rgba(0, 0, 0, 0);
    font-size: 26px;
    margin: 4px;

    &.invalid {
      border-color: #FE0101 !important;
    }

    &.filled {
      border-color: var(--color-main);
    }

    &.valid {
      border-color: #52FE01 !important;
    }

    & .type {
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  input.type {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.message {
  height: 30px;
}

.keyboard {
  display: flex;
  flex-wrap: wrap;
  width: 320px;
  margin: auto;
  justify-content: center;

  div {
    cursor: pointer;
    flex: calc(31% - 5px);
    margin: 5px;
    border-radius: 13px;
    font-size: 30px;
    text-align: center;
    height: 45px;
    background-color: #363636;
    padding: 8px 8px;
    line-height: 30px;
    min-width: 80px;
    max-width: 80px;

    &.enter {
      background-color: var(--color-main);
      line-height: 1;
    }

    &.delete {
      line-height: 1;
      background-color: #A9A9A9;
    }

    &.disabled {
      opacity: 0.2;
      -webkit-tap-highlight-color: transparent;
    }
  }
}

.message {
  .invalid {
    color: #FE0101 !important;
  }

  .valid {
    color: #52FE01 !important;
  }
}

.terms {
  .regular {
    color: rgba(256, 256, 256, 0.65);
  }

  .link {
    text-decoration: underline;
  }
}

.try-again {
  color: var(--color-dark);
  background-color: var(--color-main);
  border-radius: 24px;
  font-size: 28px;
  padding: 18px 48px;
  margin-top: 30px;
}


// checkbox
.checkbox-wrapper {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* When the checkbox is checked, add a blue background */
.checkbox-wrapper input:checked ~ .checkmark {
  background-color: var(--color-main);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-wrapper input:checked ~ .checkmark:after {
  display: block;
  border-color: var(--color-dark);
  border-width: 0 2px 2px 0;
  transform: scale(1.8) rotate(45deg);
  width: 6px;
}

/* Style the checkmark/indicator */
.checkbox-wrapper .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
