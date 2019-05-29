<template>
    <div>
        <worker-table></worker-table>
        <worker-dialog></worker-dialog>
    </div>
</template>

<script>

    import WorkerTable from "@/components/worker/WorkerTable";
    import WorkerDialog from "@/components/worker/WorkerDialog";

    export default {
        name: "WorkersList",
        components: {WorkerDialog, WorkerTable},
    }
</script>
