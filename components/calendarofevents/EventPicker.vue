<template>
  <div class="w-full" v-if="!!EventsList.length">
    <Calendar
      class="!border-none !shadow-sm"
      title-position="left"
      :attributes="attributes"
      expanded
      locale="ru"
      :masks="{ weekdays: 'WW' }"
      @dayclick="
				(e:any) =>
					$router.push({
						name: 'EventCalendar',
						query: {
							date:e.id,
						},
					})
			"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EventCalendarService from "@/services/eventCalendar";

//@ts-ignore
import { Calendar } from "v-calendar";
import "v-calendar/style.css";

const loading = ref(false);
const EventsList = ref<any[]>([]);

const attributes = ref();

const getEvents = async () => {
  loading.value = true;
  EventCalendarService.GetList({
    "pagination[page]": 1,
    "pagination[pageSize]": 100,
    populate: "image",
    "filters[startDate][$gte]": null,
  })
    .then((res) => {
      EventsList.value = res.data.data;

      attributes.value = EventsList.value.map((e: any) => {
        const startDate = new Date(e.startDate);
        const endDate = new Date(e.endDate || e.startDate);
        const currentDate = new Date();
        const isComplated = startDate < currentDate;

        return {
          id: e.id,
          highlight: {
            style: {
              backgroundColor: isComplated ? "red" : "primary",
            },
          },
          dates: {
            start: startDate,
            end: endDate,
          },
          popover: {
            label: e.title,
          },
        };
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

getEvents();
</script>

<style scoped></style>
