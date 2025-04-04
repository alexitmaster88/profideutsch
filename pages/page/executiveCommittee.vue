<script setup lang="ts">
import { useMainSettingStore } from "@/store/MainSetting";
import { storeToRefs } from "pinia";
import ExecutiveCommitteeService from "@/services/page/executiveCommittee";
import WPagination from "@/components/shared/w-ui/WPagination/index.vue";
import { useI18n } from "vue-i18n";

const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { t } = useI18n();

const pagination = useState<{
	page: number;
	pageCount: number;
	pageSize: number;
	total: number;
}>("executiveCommittee_pagination", () => ({
	page: 1,
	pageCount: 0,
	pageSize: 10,
	total: 0,
}));

const { data: List = [] } = await useAsyncData("executiveCommittee", async () => {
	const { data } = await ExecutiveCommitteeService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 10,
		sort: "orderCode:ASC",
		populate: "photo",
	});

	pagination.value = data.meta?.pagination || {};

	return data.data;
});

const onPageChange = (page: number) => {
	pagination.value.page = page;
	if (typeof window != "undefined") {
		window.scrollTo(0, 0);
	}
	refreshNuxtData("executiveCommittee");
};

Meta.value = {
	title: "executiveCommittee",
	breadcrumbs: [
		{
			to: "/page/executiveCommittee",
			label: "executiveCommittee",
		},
	],
};

useSeoMeta({
	title: t("executiveCommittee"),
});
</script>

<template>
	<div class="container md:py-8 py-6">
		<div v-if="List" class="gap-6 mt-12">
			<div v-for="item in List" :key="item.id">
				<executiveCommitteeCard :item="item" />
			</div>
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
