<template>
    <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
    >
        {{ text }}
        <v-btn
                color="pink"
                flat
                @click="snackbar = false"
        >
            Закрити
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar",
        data () {
            return {
                snackbar: false,
                y: 'bottom',
                x: 'left',
                mode: '',
                timeout: 6000,
                text: 'test'
            }
        },
        mounted() {
            this.$root.$on("call-snackbar", msg => {
                this.text = msg;
                this.snackbar = true;
            })
        }
    }
</script>
