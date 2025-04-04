<template>
	<div class="container md:py-10 py-6">
		<div class="mt-3">
			<div class="flex flex-wrap max-sm:gap-6">
				<div class="md:w-9/12 w-full rounded-xl flex justify-center items-center h-[650px] sm:h-[650px] md:h-[800px] lg:h-[650px] xl:h-[700px]">
					<SharedSkeletonSpinner v-if="loading" class="w-20 h-20" />

					<ClientOnly v-else>
						<iframe v-if="largerThanSm" :src="pdfUrl" frameborder="0" class="w-full h-full"></iframe>
						<div v-else class="w-full overflow-auto h-full">
							<LazySharedPdfViewer :pdfSrc="pdfUrl" />
						</div>
					</ClientOnly>
				</div>
				<div class="md:w-3/12 w-full md:px-6">
					<ul>
						<li
							v-for="item in list"
							class="bg-gray-100 rounded flex px-4 py-2 h-full hover:bg-gray-200 cursor-pointer font-normal mb-1"
							:class="{ 'border-l-4 border-l-primary': item.id == ExportPrice.id }"
							@click="selectItem(item.id)"
						>
							{{ formatDate(item.date) }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isValid, format } from "date-fns";
import { API_URL } from "@/services/base";

import ExportPriceService from "@/services/exportPrice";
import { useRoute } from "vue-router";
import { useMainSettingStore } from "~/store/MainSetting";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const largerThanSm = breakpoints.greater("sm");

const route = useRoute();
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { t, locale } = useI18n();
const localePath = useLocalePath();
const loading = ref(false);

const pagination = useState<{
	page: number;
	pageCount: number;
	pageSize: number;
	total: number;
}>("exportPrice_pagination", () => ({
	page: 1,
	pageCount: 0,
	pageSize: 10,
	total: 0,
}));
const list = ref<any[]>([]);

const { data: ExportPrice } = await useAsyncData(
	"export-price" + route.params.type,
	async () => {
		const { data } = await ExportPriceService.FindOneByType(route.params.type as string, {
			params: {
				populate: "*",
			},
		});

		if (data?.locale == locale.value) {
			return data;
		} else if (Array.isArray(data?.localizations)) {
			const localizationItem = data?.localizations.find((e: any) => e.locale == locale.value);
			if (localizationItem) {
				await navigateTo(localePath("/export-price/" + localizationItem.id));
			} else {
				await navigateTo(localePath("/export-price/"));
			}
			return {};
		}

		return {};
	},
	{
		watch: [route.params],
	},
);

const getList = async () => {
	const { data } = await ExportPriceService.GetList({
		"pagination[page]": pagination.value.page,
		"pagination[pageSize]": pagination.value.pageSize,
		populate: "*",
		"filters[type][key][$eq]": route.params.type,
	});

	pagination.value = data.meta?.pagination || {};
	list.value = data.data || [];
};

const selectItem = async (id: any) => {
	loading.value = true;
	ExportPriceService.Get(id, {
		params: {
			populate: "*",
		},
	})
		.then(({ data }) => {
			ExportPrice.value = data?.data || {};
			setSeo();
		})
		.finally(() => {
			loading.value = false;
		});
};

getList();

const pdfUrl = computed(() => API_URL + ExportPrice.value?.file?.url);

const setSeo = () => {
	useServerHead({
		title: t("ExportPrice." + ExportPrice.value?.type?.key),
		meta: [
			{
				name: "description",
				content: ExportPrice.value?.type?.key,
			},
		],
	});

	Meta.value = {
		title: "ExportPrice." + ExportPrice.value?.type?.key,
		breadcrumbs: [
			{
				to: "/export-price/" + ExportPrice.value?.type?.key,
				label: "ExportPrice." + ExportPrice.value?.type?.key,
			},
		],
	};
};

setSeo();

const formatDate = computed(() => {
	return (date: string, f = "dd.MM.yyyy") => (isValid(new Date(date)) ? format(new Date(date), f) : "");
});
</script>
