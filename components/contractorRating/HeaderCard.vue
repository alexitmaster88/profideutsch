<template>
	<BaseCard class="min-w-[17rem] h-24 pl-[1.875rem] bg-white">
		<div class="justify-start items-center gap-8 flex h-full">
			<div class="w-[22.85px] h-[30px] relative">
				<component :is="icon" />
			</div>
			<div class="text-primary text-base font-normal leading-[18px]">{{ label }}</div>
		</div>
	</BaseCard>
</template>

<script setup lang="ts">
import { type Component } from "vue";
import BaseCard from "@/components/shared/card/BaseCard.vue";

defineProps<{ label: string; icon: Component }>();
</script>
