<template>
  <div class="md:py-8 py-6" v-if="EventCalendarList.length != 0">
    <div class="container">
      <div class="flex justify-between">
        <div class="text-title text-slate-900">
          {{ $t("calendar_of_events") }}
        </div>

        <AllViewBtn
          :title="$t('all_calendar_of_events')"
          :to="{
            name: 'EventCalendar',
          }"
          class="hover:bg-primary-900 hover:text-white transition duration-150"
        />
      </div>
      <div
        v-if="loading"
        class="flex justify-center lg:justify-start flex-wrap gap-6 mt-12"
      >
        <CardSkeleton
          v-for="i in 3"
          :key="i + 'loading'"
          class="md:w-1/3 w-full"
        />
      </div>

      <div
        v-else-if="EventCalendarList.length"
        class="flex flex-wrap gap-6 mt-12"
      >
        <EventCalendar
          v-for="n in EventCalendarList"
          :key="n.id"
          v-motion-slide-visible-once-bottom
          :event="n"
          @click="
            $router.push({ name: 'EventCalendarView', params: { id: n.id } })
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import EventCalendarService from "@/services/eventCalendar";

import AllViewBtn from "@/components/shared/btn/AllViewBtn.vue";
import CardSkeleton from "@/components/shared/skeleton/CardSkeleton.vue";
import EventCalendar from "@/components/calendarofevents/eventCalendar.vue";

const loading = ref(false);
const EventCalendarList = ref<any[]>([]);

const getNews = () => {
  loading.value = true;
  EventCalendarService.GetList({
    "pagination[page]": 1,
    "pagination[pageSize]": 3,
    populate: "*",
  })
    .then((res) => {
      EventCalendarList.value = res.data.data;
    })
    .finally(() => {
      loading.value = false;
    });
};

getNews();
</script>
