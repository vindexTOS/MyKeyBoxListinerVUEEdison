import store from '../store/index'

class Helper {
    constructor(vue) {
        this.vue = vue
    }

    trans(key) {
        let val = store.state.translations?.[store.state.current_locale]?.[key]
        if (val === undefined) {
            val = store.state.translations?.[store.state.fallback_locale]?.[key]
        }
        return val === undefined ? key : val
    }

    refreshLocale(locale, afterStoreCommit = undefined) {
        this.vue.$axios.post(`api/GetLanguage?language=${locale}`).then((response) => {
            this.vue.$set(store.state.translations, locale, response.data)
            if (afterStoreCommit) {
                afterStoreCommit()
            }
        })
    }

    refreshAllLocales() {
        store.state.available_locales.forEach(locale => this.refreshLocale(locale.locale))
    }
}

export default {
    install(Vue) {
        Vue.prototype.$helper = new Helper(Vue.prototype)
    },
}
