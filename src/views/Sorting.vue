<template>
<Sorting />
</template>

<script>
export default {
    name: "SortingName",

    components: {
        Sorting: () => import("@/components/Sorting"),
    },
};
</script>
