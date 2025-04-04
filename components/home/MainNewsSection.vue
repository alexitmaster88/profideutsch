<template>
	<div class="md:py-8 py-6" v-if="NewsList.length">
		<div class="container">
			<div class="flex justify-between">
				<div class="text-title text-slate-900">{{ $t(tag) }}</div>

				<AllViewBtn
					:title="$t(allLabel)"
					:to="{
						path: '/news',
						query: {
							tag,
						},
					}"
					class="hover:bg-primary-900 hover:text-white transition duration-150"
				/>
			</div>
			<div v-if="loading" class="flex justify-center lg:justify-start flex-wrap gap-6 mt-12">
				<CardSkeleton v-for="i in 3" :key="i + 'loading'" class="md:w-1/3 w-full" />
			</div>

			<div v-else-if="NewsList.length" class="flex flex-wrap gap-6 mt-12">
				<NewsCard v-for="n in NewsList" :key="n.id" v-motion-slide-visible-once-bottom :news="n" :to="'/news/' + n.id" class="w-full" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NewsService from "@/services/news";

import AllViewBtn from "@/components/shared/btn/AllViewBtn.vue";
import CardSkeleton from "@/components/shared/skeleton/CardSkeleton.vue";
import NewsCard from "@/components/news/NewsCard.vue";

const props = defineProps<{
	tag: "cci_news" | "announcements" | "calendar_of_events";
	allLabel: string;
}>();

const loading = ref(false);
const NewsList = ref<any[]>([]);

const getNews = () => {
	loading.value = true;
	NewsService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 3,
		populate: "*",
		"filters[news_tag][name][$eq]": props.tag,
	})
		.then((res) => {
			NewsList.value = res.data.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

getNews();
</script>
