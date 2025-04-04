<template>
	<LocLink
		v-bind="$attrs"
		class="md:max-w-[23.5625rem] flex flex-col self-stretch cursor-pointer group overflow-hidden md:w-1/3 shadow-sm rounded-lg hover:shadow-md transition duration-300 ease-in-out bg-white"
	>
		<div class="h-[14.625rem] overflow-hidden bg-gray-100 relative">
			<nuxt-img
				class="rounded-lg h-full object-cover w-full bg-gray-100 group-hover:scale-105 duration-300 ease-in-out"
				:src="news.image?.formats?.small?.url || news.image?.url"
				provider="strapi"
				loading="lazy"
				:alt="news.title"
			/>
			<span class="absolute bottom-2 left-2 text-white bg-primary-900 rounded text-xs p-3 py-1">{{ news.news_tag?.title }}</span>
		</div>
		<div class="md:p-8 p-6 flex-1 flex justify-between flex-col">
			<div class="text-gray-600 text-xs font-normal">{{ formatDate(news.publishDate) }}</div>
			<div class="text-slate-900 text-lg font-bold leading-[1.3125rem]">{{ news.title }}</div>
			<div class="">
				<span class="text-gray-600 text-sm font-normal leading-[1.125rem] line-clamp-4">
					{{ news.shortContent }}
				</span>
			</div>

			<div class="mt-8 flex justify-between items-center w-full">
				<div class="text-gray-600 text-opacity-30 text-xs font-bold duration-200 hover:text-opacity-80">{{ $t("read_more") }}</div>
				<div class="text-gray-600 text-xs font-bold flex gap-3 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
						<path
							d="M8.38629 10.9668C5.29572 10.9668 2.36392 9.17757 0.130951 5.92864C-0.0436503 5.67393 -0.0436503 5.31754 0.130951 5.06194C2.36512 1.81533 5.29691 0.0273438 8.38629 0.0273438C11.4769 0.0273438 14.4087 1.81661 16.6416 5.06554C16.817 5.32096 16.817 5.67772 16.6416 5.93314C14.4079 9.17917 11.4761 10.9668 8.38629 10.9668ZM8.38534 1.63744C8.30995 1.63744 8.2331 1.64016 8.15695 1.64554C6.39117 1.76614 4.97634 3.31381 4.86595 5.24554C4.7989 6.41798 5.2117 7.54446 5.9985 8.33614C6.65153 8.99487 7.50053 9.35764 8.38912 9.35764C8.46483 9.35764 8.54136 9.35492 8.61657 9.34954C10.378 9.22448 11.7924 7.67643 11.9066 5.74864C11.9737 4.57651 11.5609 3.4497 10.7741 2.65714C10.1214 1.99958 9.27302 1.63744 8.38534 1.63744ZM8.38649 7.57361C7.90688 7.57363 7.44893 7.37789 7.09696 7.02246C6.67471 6.59601 6.45425 5.991 6.4921 5.36254C6.55073 4.32377 7.31352 3.48919 8.26643 3.42124C8.30735 3.41841 8.34889 3.41697 8.38987 3.41697C8.86941 3.41697 9.32731 3.61268 9.67921 3.96805C10.1016 4.3946 10.3221 4.99997 10.2843 5.62894C10.2218 6.67089 9.45902 7.50508 8.50992 7.56934C8.46886 7.57217 8.42733 7.57361 8.38649 7.57361Z"
							fill="#BFC4CE"
						/>
					</svg>
					<span class="text-gray-600 text-xs font-bold">{{ news.viewCount }}</span>
				</div>
			</div>
		</div>
	</LocLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isValid, format } from "date-fns";
import { API_URL } from "@/services/base";
import LocLink from "../shared/LocLink.vue";

defineProps<{ news: any }>();

const formatDate = computed(() => {
	return (date: string, f = "dd.MM.yyyy") => (isValid(new Date(date)) ? format(new Date(date), f) : "");
});
</script>
