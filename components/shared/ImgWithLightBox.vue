<template>
	<nuxt-img
		v-bind="$attrs"
		provider="strapi"
		loading="lazy"
		:src="Array.isArray(imgs) ? imgs[0] : imgs"
		@click="show"
		class="cursor-pointer duration-200 hover:scale-105"
	/>

	<vue-easy-lightbox teleport="body" :visible="visibleRef" :imgs="Array.isArray(props.imgs) ? props.imgs.map((e) => API_URL + e) : API_URL + props.imgs" :index="indexRef" @hide="onHide"></vue-easy-lightbox>
</template>

<script setup lang="ts">
import VueEasyLightbox, { useEasyLightbox } from "vue-easy-lightbox";
import "vue-easy-lightbox/external-css/vue-easy-lightbox.css";
import { API_URL } from "@/services/base";

const props = withDefaults(
	defineProps<{
		imgs: string | string[];
		initIndex?: number;
	}>(),
	{
		initIndex: 0,
	},
);
const {
	// methods
	show,
	onHide,
	visibleRef,
	indexRef,
} = useEasyLightbox({
	// src / src[]
	imgs: props.imgs,
	// initial index
	initIndex: props.initIndex,
});
</script>

<style lang="sass" scoped></style>
