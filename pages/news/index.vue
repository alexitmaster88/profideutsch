<template>
	<div class="container py-6">
		<!-- tabs -->
		<div class="text-sm font-medium text-center text-gray-500 border-gray-200">
			<ul class="flex flex-wrap -mb-px">
				<li class="me-2">
					<LocLink
						class="inline-block text-lg p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-600 hover:border-primary-600 duration-200 font-semibold"
						:class="{ '!text-primary-600 !border-primary-600': !tag }"
						:to="'/news'"
						@click="tag = null"
					>
						{{ $t("all") }}
					</LocLink>
				</li>
				<li class="me-2" v-for="t in NewsTagList">
					<LocLink
						class="inline-block text-lg p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-600 hover:border-primary-600 duration-200 font-semibold"
						:class="{ '!text-primary-600 !border-primary-600': tag == t.name }"
						:to="{
							path: '/news',
							query: {
								tag: t.name,
							},
						}"
						@click="
							() => {
								tag = t.name;
								pagination.page = 1;
							}
						"
					>
						{{ t.title }}
					</LocLink>
				</li>
			</ul>
		</div>

		<div v-if="NewsList.length" class="flex flex-wrap gap-6 mt-12">
			<NewsCard v-for="n in NewsList" :key="n.id" :news="n" :to="'/news/' + n.id" />
		</div>

		<div v-else class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 mt-4 font-semibold">
			{{ $t("not_found_data") }}
		</div>

		<WPagination
			class="mt-12"
			:total="pagination.total"
			:totalPages="pagination.pageCount"
			:perPage="pagination.pageSize"
			:currentPage="pagination.page"
			@pagechanged="onPageChange"
		/>
	</div>
</template>

<script lang="ts" setup>
import NewsService from "@/services/news";
import NewsTagService from "@/services/newsTag";
import { useMainSettingStore } from "@/store/MainSetting";

import NewsCard from "@/components/news/NewsCard.vue";
import LocLink from "~/components/shared/LocLink.vue";
import WPagination from "/components/shared/w-ui/WPagination/index.vue";

const { t } = useI18n();
const route = useRoute();
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);

Meta.value = {
	title: "news",
	breadcrumbs: [
		{
			to: "/news",
			label: "news",
		},
	],
};
useServerHead({
	title: t("news"),
	meta: [
		{
			name: "description",
			content: t("news"),
		},
	],
});

useHead({
	title: t("news"),
});

useServerSeoMeta({
	ogTitle: t("news"),
	ogDescription: t("news"),
	twitterTitle: t("news"),
	twitterDescription: t("news"),
});

type ITags = "cci_news" | "announcements";
const tag = useState<ITags | null>("news_tag", () => route.query.tag as ITags);
const pagination = useState<{
	page: number;
	pageCount: number;
	pageSize: number;
	total: number;
}>("news_pagination", () => ({
	page: 1,
	pageCount: 0,
	pageSize: 9,
	total: 0,
}));

const { data: NewsTagList = [] } = await useAsyncData("newsTag", async () => {
	const { data } = await NewsTagService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 10,
		populate: "*",
	});

	return data.data;
});

const { data: NewsList = [] } = await useAsyncData(
	"news",
	async () => {
		const { data } = await NewsService.GetList({
			"pagination[page]": pagination.value.page,
			"pagination[pageSize]": pagination.value.pageSize,
			populate: "image,news_tag",
			"filters[news_tag][name][$eq]": tag.value,
		});

		pagination.value = data.meta?.pagination || {};

		return data.data;
	},
	{
		watch: [tag],
	},
);

const onPageChange = (page: number) => {
	pagination.value.page = page;
	if (typeof window != "undefined") {
		window.scrollTo(0, 0);
	}
	refreshNuxtData("news");
};

watch(
	() => route.query.tag,
	(newV) => {
		tag.value = newV as ITags;
	},
);
</script>
