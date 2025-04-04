<template>
	<vue-awesome-paginate
		:total-items="total"
		:items-per-page="perPage"
		:max-pages-shown="maxVisibleButtons"
		:modelValue="currentPage"
		@update:modelValue="onClickPage"
		paginate-buttons-class=" h-12 w-12 text-base border rounded-lg px-2 mx-1"
		active-page-class="bg-primary text-white"
		back-button-class="back-btn"
		next-button-class="next-btn"
	></vue-awesome-paginate>
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		totalPages: number;
		total: number;
		perPage: number;
		currentPage: number;
		maxVisibleButtons?: number;
	}>(),
	{
		totalPages: 0,
		maxVisibleButtons: 5,
	},
);

const emit = defineEmits(["pagechanged"]);

const onClickPage = (page: number) => {
	emit("pagechanged", page);
};
</script>
