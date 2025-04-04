<template>
	<div class="container md:py-8 py-6 max-w-[62rem]">
		<div class="w-full rounded-3xl overflow-hidden">
			<iframe :src="Videos.link" alt="" class="h-96 w-full"></iframe>
		</div>

		<div class="text-title mt-3 leading-tight">
			{{ Videos.title }}
		</div>

		<MarkdownCustom :source="Videos.description" html linkify />
	</div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ref } from "vue";

import VideosService from "@/services/videos";
import { useRoute } from "vue-router";
import MarkdownCustom from "@/components/shared/MarkdownCustom.vue";
import { useMainSettingStore } from "@/store/MainSetting";
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);

Meta.value = {
	title: "Videos",
	breadcrumbs: [
		{
			to: "/videos",
			label: "Videos",
		},
	],
};
const loading = ref(false);
const Videos = ref<any>({});

const route = useRoute();

const getVideos = () => {
	loading.value = true;
	VideosService.Get(+route.params.id)
		.then((res) => {
			Videos.value = res.data.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

getVideos();
</script>
