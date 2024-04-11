import store from '../store/index'

class Helper {
    constructor(vue) {
        this.vue = vue
    }

    trans(key) {
        let val = store.state.translations[store.state.current_locale][key]
        if (val === undefined) {
            val = store.state.translations[store.state.fallback_locale][key]
        }
        return val === undefined ? key : val
    }
}

export default {
    install(Vue) {
        Vue.prototype.$helper = new Helper(Vue.prototype)
    },
}
