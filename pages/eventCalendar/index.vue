<template>
	<div class="container py-6">
		<div v-if="loading" class="flex justify-center lg:justify-start flex-wrap gap-6 mt-12">
			<CardSkeleton v-for="i in 3" :key="i + 'loading'" class="md:w-1/3 w-full" />
		</div>

		<div v-else-if="EventsList.length" class="flex flex-wrap gap-6 mt-12">
			<EventCalendar v-for="n in EventsList" :key="n.id" :event="n" @click="$router.push('/eventCalendar/' + n.id)" />
		</div>

		<div v-else class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 mt-4 font-semibold">
			{{ $t("not_found_data") }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import CardSkeleton from "@/components/shared/skeleton/CardSkeleton.vue";
import EventCalendar from "@/components/calendarofevents/eventCalendar.vue";
import EventCalendarService from "@/services/eventCalendar";
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
const EventsList = ref<any[]>([]);

const getEvents = async () => {
	loading.value = true;
	EventCalendarService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 20,
		populate: "image",
	})
		.then((res) => {
			EventsList.value = res.data.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

await getEvents();
</script>
