<template>
	<LocLink
		:to="to"
		class="text-primary text-decoration-none text-center self-center font-normal rounded-lg border border-blue-950 md:text-xl sm:text-base text-sm  md:px-3 md:py-2 px-2 py-1 uppercase"
	>
		{{ title }}
	</LocLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import LocLink from "../LocLink.vue";

defineProps<{ title: string; to: RouteLocationRaw }>();
</script>
