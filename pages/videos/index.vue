<template>
	<div class="container py-6">
		<div v-if="loading" class="flex justify-center lg:justify-start flex-wrap gap-6 mt-12">
			<CardSkeleton v-for="i in 3" :key="i + 'loading'" class="md:w-1/3 w-full" />
		</div>

		<div v-else-if="VideosList.length" class="flex flex-wrap gap-6 mt-12">
			<VideoCard v-for="n in VideosList" :key="n.id" :video="n" @click="$router.push('/videos/' + n.id)" />
		</div>

		<div v-else class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 mt-4 font-semibold">
			{{ $t("not_found_data") }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import CardSkeleton from "@/components/shared/skeleton/CardSkeleton.vue";
import VideoCard from "@/components/videos/VideoCard.vue";
import VideosService from "@/services/videos";
import { useMainSettingStore } from "@/store/MainSetting";
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);

Meta.value = {
	title: "all_videos",
	breadcrumbs: [
		{
			to: "/videos",
			label: "all_videos",
		},
	],
};
const loading = ref(false);
const VideosList = ref<any[]>([]);

const getVideos = () => {
	loading.value = true;
	VideosService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 25,
		populate: "*",
	})
		.then((res) => {
			VideosList.value = res.data.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

getVideos();
</script>
