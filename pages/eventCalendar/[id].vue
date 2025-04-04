<template>
	<div class="container md:py-8 py-6 max-w-[62rem]">
		<div v-if="loading" class="flex justify-center items-center min-h-32">
			<Spinner class="w-16 h-16" />
		</div>
		<template v-else-if="Item?.id">
			<div class="w-full rounded-3xl overflow-hidden">
				<img :src="API_URL + Item.image?.url" alt="" class="max-h-96 w-full object-cover" />
			</div>

			<div class="text-title mt-3">
				{{ Item.title }}
			</div>
			<ClientOnly>
				<MarkdownCustom :source="Item?.beforeEventDescription" html linkify />
			</ClientOnly>
		</template>
		<div v-else class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 mt-4 font-semibold">
			{{ $t("not_found_data") }}
		</div>
	</div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useHead } from "@unhead/vue";
import EventCalendarService from "@/services/eventCalendar";
import { useRoute } from "vue-router";
import MarkdownCustom from "@/components/shared/MarkdownCustom.vue";
import Spinner from "@/components/shared/skeleton/Spinner.vue";
import { type EventCalendarDto } from "@/services/eventCalendar/models";
import { API_URL } from "@/services/base";
import { useMainSettingStore } from "@/store/MainSetting";
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);

Meta.value = {
	title: "calendar_of_events",
	breadcrumbs: [
		{
			to: "/eventCalendar",
			label: "calendar_of_events",
		},
	],
};

const loading = ref(false);
const Item = ref<EventCalendarDto>();

const route = useRoute();

const getEvents = async () => {
	loading.value = true;
	await EventCalendarService.Get(+route.params.id, {
		params: {
			populate: "*",
		},
	})
		.then((res) => {
			Item.value = res.data.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

watch(
	() => route.query,
	async () => {
		await getEvents();
	},
	{
		immediate: true,
	},
);

useHead({
	title: Item.value?.title,
	meta: [
		{
			name: "description",
			content: Item.value?.beforeEventDescription,
		},
	],
});
</script>
