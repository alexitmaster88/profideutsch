<template>
	<div class="flex flex-col gap-2">
		<LocLink
			v-for="(item, i) in links"
			:key="i"
			:to="item.link"
			target="_blank"
			external
			class="w-full flex items-center gap-6 p-4 rounded-lg duration-200 border cursor-pointer hover:shadow-sm"
		>
			<div class="bg-primary-800 rounded-md w-20 h-20 flex justify-center items-center">
				<img :src="returnImgSrc(item.image?.url)" alt="" />
			</div>
			<div class="w-[14.25rem] text-primary text-lg font-semibold" v-html="item.title"></div>
		</LocLink>
	</div>
</template>
<script setup lang="ts">
import AdditionalLinkService from "~/services/additionalLinks";
import { API_URL } from "~/services/base";
import LocLink from "../shared/LocLink.vue";

const returnImgSrc = computed(() => (url: string) => API_URL + url);

const { data: links } = await useAsyncData("additionalLinks", async () => {
	const { data } = await AdditionalLinkService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 8,
		populate: "*",
	});

	return data.data;
});
</script>
<style lang="scss" scoped></style>
