export default {
    setCode(state, unique_code) {
        state.unique_code = unique_code
    },
    setCurrentLocale(state, locale) {
        state.current_locale = locale
    },
    setOrderId(state, order_id) {
        state.order_id = order_id;  
        console.log(order_id )
        console.log( state.order_id)

    },
}
