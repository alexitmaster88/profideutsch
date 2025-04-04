<template>
	<VuePdf v-for="page in numOfPages" :key="page" :src="pdfSrc" :page="page" class="md:mb-8 bg-white" enable-annotations enable-text-selection />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { VuePdf, createLoadingTask } from "vue3-pdfjs";
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

// Define the props
const props = defineProps<{
	pdfSrc: string;
}>();

// Reactive references
const numOfPages = ref(0);

onMounted(() => {
	const loadingTask = createLoadingTask(props.pdfSrc);
	loadingTask.promise.then((pdf: PDFDocumentProxy) => {
		numOfPages.value = pdf.numPages;
	});
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
