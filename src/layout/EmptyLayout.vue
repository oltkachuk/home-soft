<template>
    <div class="empty-layout">
        <router-view />
    </div>
</template>

<script>
import messeges from '../utils/messeges'
export default {
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            console.log(fbError)
            this.$error(messeges[fbError.code] || 'Щось пішло не так')
        }
    }
}
</script>
