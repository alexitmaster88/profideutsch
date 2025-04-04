<script setup lang="ts">
import MapSection from "@/components/home/MapSection.vue";
import { useMainSettingStore } from "~/store/MainSetting";

const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);

Meta.value = {
  title: "map_section_title",
  breadcrumbs: [
    {
      to: "/page/TerritorialManagement",
      label: "map_section_title",
    },
  ],
};

</script>

<template>
	<div class="py-4">
		<MapSection />
	</div>
</template>
