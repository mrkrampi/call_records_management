<template>
    <div>
        <call-table :current-only="currentOnly"></call-table>
    </div>
</template>

<script>
    import CallTable from "@/components/call/CallTable";

    export default {
        name: "CallsList",
        components: {CallTable},
        props: {
            currentOnly: Boolean,
        }
    }
</script>
