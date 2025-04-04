<template>
  <div
    v-if="!!activeReklama"
    class="w-full flex justify-center items-center flex-col"
    :class="{ 'container h-[180px] ': layout == 'horizontal' }"
  >
    <div
      class="w-full h-full overflow-hidden max-w-[970px] bg-indigo-100 flex rounded-lg justify-center items-center"
    >
      <div v-if="loading" class="flex justify-center items-center min-h-32">
        <Spinner class="w-16 h-16" />
      </div>
      <!-- gallery -->
      <swiper
        v-else-if="activeReklama"
        :centeredSlides="true"
        :spaceBetween="30"
        :loop="true"
        :autoplay="true"
        :pagination="{
          clickable: true,
          type: 'fraction',
        }"
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          '--swiper-navigation-size': '2rem',
        }"
        :direction="'horizontal'"
        :modules="modules"
        :navigation="true"
        :slidesPerView="1"
        :class="{ 'h-[330px]': layout == 'vertical' }"
      >
        <swiper-slide
          v-for="(p, i) in layout == 'vertical'
            ? activeReklama.verticalImage
            : activeReklama.horizontalImage"
          :key="p.id"
          class="bg-stone-100 rounded-lg overflow-hidden h-full"
        >
          <img
            :initIndex="i"
            :alt="p.label"
            :src="API_URL + p.url"
            class="mx-auto w-full h-full object-cover cursor-pointer duration-200 hover:scale-105"
          />
        </swiper-slide>
      </swiper>

      <div v-else class="h-[330px]">Реклама</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReklamaService from "@/services/reklama";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import Spinner from "@/components/shared/skeleton/Spinner.vue";
import { API_URL } from "@/services/base";

const modules = [Autoplay, FreeMode, Navigation];

type IProps = {
  layout: "vertical" | "horizontal";
  priority: number;
};

const props = withDefaults(defineProps<IProps>(), {
  layout: "horizontal",
  priority: 1,
});

const loading = ref(false);
const list = ref<any[]>([]);
const activeReklama = ref();

const getReklama = () => {
  loading.value = true;
  ReklamaService.GetList({
    populate: "*",
    "filters[priority][$eq]": props.priority,
  })
    .then((res) => {
      list.value = res.data.data;
      activeReklama.value = list.value[0];
    })
    .finally(() => {
      loading.value = false;
    });
};

getReklama();
</script>
