<template>
	<div class="text-primary text-2xl font-semibold mt-2">{{ $t("organizations") }}</div>
	<div class="flex gap-4 items-start">
		<div class="mf:w-1/5">
			<div class="min-w-[182px] bg-white rounded-xl shdow-sm p-4">
				<div class="flex justify-between items-center">
					<div class="text-primary text-base font-bold">{{ $t("total") }}</div>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M4.66667 7.99999C4.66667 7.26362 4.06971 6.66666 3.33333 6.66666C2.59695 6.66666 2 7.26362 2 7.99999C2 8.73637 2.59695 9.33333 3.33333 9.33333C4.06971 9.33333 4.66667 8.73637 4.66667 7.99999ZM9.33333 7.99999C9.33333 7.26362 8.73638 6.66666 8 6.66666C7.26362 6.66666 6.66667 7.26362 6.66667 7.99999C6.66667 8.73637 7.26362 9.33333 8 9.33333C8.73638 9.33333 9.33333 8.73637 9.33333 7.99999ZM12.6667 6.66666C13.403 6.66666 14 7.26362 14 7.99999C14 8.73637 13.403 9.33333 12.6667 9.33333C11.9303 9.33333 11.3333 8.73637 11.3333 7.99999C11.3333 7.26362 11.9303 6.66666 12.6667 6.66666Z"
							fill="#92929D"
						/>
					</svg>
				</div>

				<div class="text-primary mt-3 text-xl font-normal">{{ TOTAL?.countAll }}</div>

				<div class="h-[2.375rem] my-3 rounded-xl border border-zinc-200 flex px-4 items-center">
					<div class="text-zinc-700 text-sm font-normal leading-normal tracking-tight">{{ $t("barchasi") }}</div>
				</div>
				<div>
					<div class="text-zinc-700 text-sm font-normal leading-normal tracking-tight mt-2">{{ $t("rating.adc_tolovchi") }}:</div>
					<div class="text-zinc-700 text-sm font-semibold leading-normal tracking-tight">{{ parseNumber(TOTAL?.countSt) }}</div>
					<div class="text-zinc-700 text-sm font-normal leading-normal tracking-tight mt-2">{{ $t("rating.qqs_tolovchi") }}:</div>
					<div class="text-zinc-700 text-sm font-semibold leading-normal tracking-tight">{{ parseNumber(TOTAL?.countVat) }}</div>
				</div>
			</div>
		</div>
		<!-- cards -->
		<div class="mf:w-4/5 flex flex-wrap gap-4">
			<div v-for="(item, i) in otherList" :key="i" class="min-w-[10.5625rem] bg-white rounded-xl shdow-sm">
				<div class="flex justify-between">
					<div class="w-20 h-9 rounded-tl-xl rounded-br-xl shdow-sm flex justify-center items-center" :class="getColorsWithBg(i)">
						<div class="w-10 text-center text-sm font-bold">{{ item.type }}:</div>
					</div>
					<div class="text-primary p-4 text-sm font-bold">{{ item.countAll }}</div>
				</div>

				<div class="flex justify-between items-center p-4">
					<div>
						<div class="text-zinc-700 text-xs font-medium tracking-tight">{{ $t("rating.adc_tolovchi") }}:</div>
						<div class="text-primary text-sm font-bold">{{ parseNumber(item.countSt) }}</div>
					</div>
					<div>
						<div class="text-zinc-700 text-xs font-medium tracking-tight">{{ $t("rating.qqs_tolovchi") }}:</div>
						<div class="text-primary text-sm font-bold">{{ parseNumber(item.countVat) }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CompanyHighNewInfoDto } from "@/services/erp/soliq/models";
import { getColorsWithBg, parseNumber } from "@/lib/helper";

const props = defineProps<{ companyHighNewInfo: CompanyHighNewInfoDto[] }>();

const TOTAL = computed(() => props.companyHighNewInfo.find((e) => e.type == "TOTAL"));
const otherList = computed(() => props.companyHighNewInfo.filter((e) => e.type != "TOTAL"));
</script>
