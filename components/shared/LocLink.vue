<script setup lang="ts">
const props = defineProps(["to"]);

const localePath = useLocalePath();
const isExternal = typeof props.to == "string" ? props.to?.includes("http") : false;
</script>

<template>
	<NuxtLink :to="localePath(to)" v-bind="$attrs" :target="isExternal ? '_blank' : null"><slot /></NuxtLink>
</template>
