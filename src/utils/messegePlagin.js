export default {
    install(Vue) {
        Vue.prototype.$messege = function(text) {
            this.$bvToast.toast(text, {
                title: "Messege:",
                variant: "success"
            })
        }
        Vue.prototype.$error = function(text) {
            this.$bvToast.toast(text, {
                title: "Error:",
                variant: "danger"
            })
        }
    }
}