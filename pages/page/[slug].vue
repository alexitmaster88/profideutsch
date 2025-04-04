<template>
	<div class="container md:py-8 py-6 max-w-[62rem]" :class="{ 'max-w-[90rem]': isMaxWidth }">
		<MarkdownCustom v-if="Item?.slug" :source="Item?.content" html linkify />
		<div v-else class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 mt-4 font-semibold">
			{{ $t("not_found_data") }}
		</div>
	</div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import PageService from "@/services/page";
import { useRoute } from "vue-router";
import MarkdownCustom from "@/components/shared/MarkdownCustom.vue";
import { useMainSettingStore } from "@/store/MainSetting";
import { storeToRefs } from "pinia";

type PageDto = {
	content: string;
	title: string;
	slug: string;
	description: string;
	locale: string;
};
const route = useRoute();
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { t } = useI18n();

const idOrSlug = computed(() => route.params.slug);
const isMaxWidth = computed(() => ["orgStruct", "jamoatchilik-kengashi"].includes(Item.value?.slug!));

const { data: Item } = await useAsyncData<PageDto>(
	"page" + idOrSlug.value,
	async () => {
		const { data } = await PageService.Get(idOrSlug.value as string);

		const { data: data1 } = data;

		Meta.value = {
			title: data1?.title,
			breadcrumbs: [
				{
					to: "/page/" + data1?.slug,
					label: data1?.title ?? "",
				},
			],
		};

		return data1;
	},
	{
		watch: [idOrSlug],
	},
);

useServerHead({
	title: Item.value?.title,
	meta: [
		{
			name: "description",
			content: Item.value?.description,
		},
	],
});

useSeoMeta({
	title: Item.value?.title,
});

useServerSeoMeta({
	ogTitle: Item.value?.title,
	ogDescription: Item.value?.description,
	twitterTitle: Item.value?.title,
	twitterDescription: Item.value?.description,
});
</script>
