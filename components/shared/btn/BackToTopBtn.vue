<template>
	<button
		type="button"
		class="!fixed z-10 bottom-10 end-7 rounded-full bg-primary-700 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-800 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
		id="btn-back-to-top"
		:class="{ hidden: y < 400 }"
		@click="y = 0"
	>
		<span class="[&>svg]:w-4">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
			</svg>
		</span>
	</button>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();
</script>
