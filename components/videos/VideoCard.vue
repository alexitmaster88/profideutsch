<template>
	<div
		class="md:max-w-[23.5625rem] cursor-pointer group overflow-hidden self-stretch md:w-1/3 shadow-sm rounded-lg hover:shadow-md transition duration-300 ease-in-out"
	>
		<div class="h-[14.625rem] overflow-hidden bg-gray-100 relative">
			<iframe :src="video.link" class="rounded-lg h-full object-cover w-full bg-gray-100 group-hover:scale-105 duration-300 ease-in-out"> </iframe>
		</div>
		<div class="p-8 justify-between grow-0 h-full items-stretch gap-[0.6875rem]">
			<LocLink :to="'/videos/' + video.id" class="text-slate-900 hover:underline text-lg font-bold leading-[1.3125rem]">{{ video.title }}</LocLink>
			<div class="">
				<span class="text-gray-600 text-sm font-normal leading-[1.125rem] line-clamp-4 mt-6">
					{{ video.description }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import LocLink from "../shared/LocLink.vue";

defineProps<{ video: any }>();
</script>
