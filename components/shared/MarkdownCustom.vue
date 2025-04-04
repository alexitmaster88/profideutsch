<template>
	<div
		className="prose
		max-w-none
            marker:prose-ol:text-primary
            prose-bullets:bg-primary
            marker:prose-ul:text-primary
			prose-a:font-semibold
			prose-a:text-primary
            prose-img:rounded-lg prose-img:shadow-lg
			 prose-pre:bg-blue-900 
			 prose-pre:text-pink-200 
			 hover:prose-pre:font-bold 
			 prose-headings:text-gray-900 
			 sm:prose-base md:prose-base lg:prose-slate
			 "
	>
		<component :is="markdownComponent" v-bind="$attrs" class="overflow-auto" />
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from "vue";

defineOptions({
	inheritAttrs: false,
});
// @ts-ignore

// Lazily load the Markdown component
const markdownComponent = ref(null);

onMounted(() => {
	// @ts-ignore
	markdownComponent.value = defineAsyncComponent(() => import("vue3-markdown-it"));
});
</script>
