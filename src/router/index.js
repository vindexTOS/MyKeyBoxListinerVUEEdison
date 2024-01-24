import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CodeView from "@/views/CodeView.vue";
import ChooseLockerView from "@/views/ChooseLockerView.vue";
import CloseTheDoor from "@/views/CloseTheDoor.vue";
import ThankYou from "@/views/ThankYou.vue";
import ConfirmCarDetailsView from "@/views/ConfirmCarDetailsView.vue";
import TakeKeyFromBoxView from "@/views/TakeKeyFromBoxView.vue";
import KeyWithText from "@/views/KeyWithText.vue";
import TestOpenAllBoxes from "@/views/TestOpenAllBoxes.vue";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    // {
    //   path: '/lockers-tester',
    //   name: 'lockers-tester',
    //   component: TestOpenAllBoxes,
    // },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/enter-code',
      name: 'code',
      component: CodeView,
    },
    {
      path: '/choose-locker',
      name: 'choose-locker',
      component: ChooseLockerView,
    },
    {
      path: '/take-key-from-box',
      name: 'take-key-from-box',
      component: TakeKeyFromBoxView,
    },
    {
      path: '/close-the-door',
      name: 'close-the-door',
      component: CloseTheDoor,
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: ThankYou,
    },
    {
      path: '/key-with-text',
      name: 'key-with-text',
      component: KeyWithText,
    },
    {
      path: '/confirm-car-details',
      name: 'confirm-car-details',
      component: ConfirmCarDetailsView,
    },
  ],
})

export default router
