<template>
	<div class="overflow-auto">
		<table class="mt-5 border-spacing-y-3 border-separate">
			<thead>
				<tr>
					<th>{{ $t("rating.no") }}</th>
					<th>{{ $t("rating.mezon_name") }}</th>
					<th>{{ $t("rating.norma") }}</th>
					<th>{{ $t("rating.amaldagi") }}</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<template v-for="item in list" :key="item.id">
					<tr>
						<td class="text-center font-medium">{{ item.ord }}</td>
						<td class="font-medium">{{ item.nameUz }}</td>
						<td class="font-bold text-center">{{ item.maxPoint }}</td>
						<td class="font-bold text-center">{{ item.point }}</td>
						<td class="font-bold text-center">
							<button
								class="cursor-pointer p-2 rounded-full h-10 w-10 flex justify-center items-center duration-200 hover:bg-primary-100"
								@click="item.isCollapsed = !item.isCollapsed"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
									<path
										d="M6.33306 7.40457L0.539462 1.61078C0.170729 1.24223 0.170729 0.644679 0.539462 0.276304C0.907866 -0.092102 1.50538 -0.092102 1.87376 0.276304L7.00021 5.40291L12.1265 0.276453C12.495 -0.0919525 13.0925 -0.0919524 13.4609 0.276453C13.8294 0.644859 13.8294 1.24238 13.4609 1.61093L7.66721 7.40472C7.48291 7.58892 7.24163 7.68092 7.00023 7.68092C6.75872 7.68092 6.51726 7.58874 6.33306 7.40457Z"
										fill="#0B2F82"
									/>
								</svg>
							</button>
						</td>
					</tr>
					<tr v-if="item.isCollapsed" class="-translate-y-5 duration-200">
						<td colspan="5">
							<div class="flex md:flex-row flex-col gap-4 p-2">
								<div class="md:w-1/3 w-full">
									<div class="inline-flex gap-2 items-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
											<path
												d="M23.105 17.9499C23.0401 17.9033 22.9633 17.8794 22.8861 17.8794C22.8337 17.8794 22.7809 17.8904 22.7315 17.9127L18.6386 19.7626C18.5166 19.818 18.4331 19.9341 18.4199 20.0678C18.4066 20.201 18.4654 20.3315 18.5744 20.4099L19.3192 20.9445C17.4793 22.5768 15.0839 23.4976 12.6069 23.4976C7.03527 23.4976 2.50253 18.9648 2.50253 13.3933C2.50253 12.7021 1.94239 12.1419 1.2513 12.1419C0.56014 12.1419 0 12.7021 0 13.3933C0 20.3446 5.65541 26 12.6068 26C15.8856 26 19.0497 24.7075 21.393 22.4331L22.2234 23.0291C22.3323 23.1073 22.4748 23.1213 22.5969 23.0661C22.719 23.011 22.8024 22.8947 22.8157 22.7612L23.2596 18.2915C23.2728 18.1584 23.2139 18.028 23.105 17.9499Z"
												fill="#5EF4EB"
											/>
											<path
												d="M1.13842 9.65401C1.20337 9.70059 1.28017 9.7245 1.3574 9.7245C1.40986 9.7245 1.46254 9.71349 1.51199 9.69119L5.60474 7.84124C5.72685 7.7859 5.81032 7.66975 5.82358 7.5362C5.83683 7.40287 5.77798 7.27248 5.66899 7.19413L4.92424 6.65952C6.76415 5.02701 9.15944 4.10629 11.6365 4.10629C13.6003 4.10629 15.4344 4.66993 16.9872 5.64312L18.6092 3.71294C16.6109 2.38119 14.2128 1.60376 11.6365 1.60376C8.35767 1.60376 5.19351 2.89616 2.85026 5.17066L2.02001 4.57468C1.91108 4.49641 1.76856 4.48231 1.64644 4.53758C1.52433 4.59271 1.44086 4.70907 1.42761 4.84248L0.983759 9.31208C0.970573 9.44556 1.02949 9.57588 1.13842 9.65401Z"
												fill="#5EF4EB"
											/>
											<path
												d="M20.4097 9.20201C21.2562 10.6792 21.7409 12.3894 21.7409 14.2106C21.7409 14.9018 22.301 15.4621 22.9922 15.4621C23.6833 15.4621 24.2435 14.9019 24.2435 14.2106C24.2435 11.6131 23.4535 9.19689 22.1018 7.18878L20.4097 9.20201Z"
												fill="#5EF4EB"
											/>
											<path
												d="M24.6005 0.328887C24.0074 -0.169458 23.1224 -0.0928648 22.6239 0.500239L12.1219 13.4184L6.3455 10.1831C5.67679 9.79176 4.81757 10.0165 4.42626 10.6852C4.03488 11.3539 4.25968 12.2131 4.92832 12.6044L11.4064 16.3959C11.6278 16.5257 11.8721 16.5881 12.1143 16.5881C12.5173 16.5881 12.9142 16.4146 13.1889 16.0878L24.772 2.30529C25.2703 1.71226 25.1936 0.827373 24.6005 0.328887Z"
												fill="#5EF4EB"
											/>
										</svg>
										<div class="text-primary text-sm font-semibold">{{ $t("rating.aniqlash_mexanizmi") }}</div>
									</div>
									<div class="text-black text-sm font-normal overflow-auto">
										<Markdown :source="item.procedureUz" html />
									</div>
								</div>

								<div class="md:w-1/3 w-full">
									<div class="inline-flex gap-2 items-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none">
											<path
												d="M21.6013 7.18131L17.1913 6.54048L15.219 2.54436C14.4576 1.00122 12.2548 1.00064 11.493 2.54431L9.52072 6.54048L5.11066 7.18131C3.40777 7.42871 2.72666 9.52337 3.95928 10.725L7.15044 13.8356L6.39712 18.2278C6.10621 19.9237 7.88768 21.2188 9.41157 20.4179L13.356 18.3441L17.3005 20.4179C18.8262 21.2199 20.6051 19.9199 20.3148 18.2278L19.5615 13.8356L22.7527 10.725C23.9849 9.52379 23.3049 7.42887 21.6013 7.18131Z"
												fill="#5EF4EB"
											/>
											<path
												d="M7.02914 1.83272L5.96426 0.367098C5.67517 -0.0306617 5.11834 -0.118885 4.72058 0.170201C4.32277 0.459234 4.2346 1.01607 4.52363 1.41388L5.58851 2.8795C5.87776 3.27747 6.43464 3.36538 6.83219 3.0764C7.23 2.78741 7.31818 2.23053 7.02914 1.83272Z"
												fill="#5EF4EB"
											/>
											<path
												d="M3.49536 14.9673C3.34338 14.4997 2.84117 14.2436 2.3734 14.3957L0.615457 14.9669C0.147786 15.1188 -0.108118 15.6212 0.0438071 16.0889C0.196045 16.5574 0.699297 16.8123 1.16577 16.6605L2.92376 16.0893C3.39143 15.9374 3.64733 15.4351 3.49536 14.9673Z"
												fill="#5EF4EB"
											/>
											<path
												d="M21.9914 0.170155C21.5936 -0.118931 21.0368 -0.03076 20.7477 0.367052L19.6828 1.83267C19.3937 2.23048 19.482 2.78737 19.8798 3.07635C20.2778 3.36549 20.8345 3.27711 21.1235 2.87945L22.1883 1.41383C22.4774 1.01602 22.3892 0.459188 21.9914 0.170155Z"
												fill="#5EF4EB"
											/>
											<path
												d="M26.0966 14.9669L24.3386 14.3957C23.871 14.2434 23.3687 14.4997 23.2167 14.9673C23.0647 15.435 23.3206 15.9373 23.7883 16.0893L25.5463 16.6605C26.0131 16.8123 26.5161 16.5572 26.6683 16.0889C26.8202 15.6212 26.5643 15.1189 26.0966 14.9669Z"
												fill="#5EF4EB"
											/>
											<path
												d="M13.3562 21.8696C12.8645 21.8696 12.4658 22.2682 12.4658 22.7599V24.5671C12.4658 25.0588 12.8645 25.4574 13.3562 25.4574C13.8479 25.4574 14.2466 25.0588 14.2466 24.5671V22.7599C14.2466 22.2682 13.848 21.8696 13.3562 21.8696Z"
												fill="#5EF4EB"
											/>
										</svg>
										<div class="text-primary text-sm font-semibold">{{ $t("rating.baholash_metodikasi") }}</div>
									</div>
									<div class="text-black text-sm font-normal">
										<Markdown :source="item.methodsUz" html />
									</div>
								</div>

								<div class="md:w-1/3 w-full">
									<div class="inline-flex gap-2 items-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
											<path
												d="M16.886 6.06163H17.807V2.0564H14.8621V1.86216C14.8621 0.835334 14.0267 0 12.9999 0C11.9732 0 11.1378 0.835334 11.1378 1.86216V2.0564H8.19287V6.06163H9.11433C9.80514 6.06163 10.3672 6.62367 10.3672 7.31453C10.3672 8.0054 9.80519 8.56743 9.11402 8.56743H8.19287V12.5727H11.1378V12.7668C11.1378 13.265 11.332 13.7329 11.6847 14.0845C12.037 14.4356 12.506 14.6291 13.0053 14.6291H13.0329C13.5216 14.6291 13.9809 14.4388 14.3264 14.0933C14.6719 13.7477 14.8621 13.2884 14.8621 12.7998V12.5726H17.807V8.56738H16.8859C16.1949 8.56738 15.6327 8.00535 15.6327 7.31448C15.6327 6.62362 16.1947 6.06163 16.886 6.06163Z"
												fill="#5EF4EB"
											/>
											<path d="M0 18.728H2.558V25.9993H0V18.728Z" fill="#5EF4EB" />
											<path
												d="M23.8525 14.7067C23.3096 14.7067 22.7992 14.9182 22.4153 15.3021L17.4358 20.2816H9.79184V18.7582H15.6074C15.3494 17.2643 14.0442 16.1242 12.4777 16.1242H9.37473C7.47459 16.1242 5.68814 16.8642 4.3446 18.2078L4.13965 18.4127V25.9994H16.0132L26.0001 16.0124L25.2898 15.3021C24.9059 14.9182 24.3955 14.7067 23.8525 14.7067Z"
												fill="#5EF4EB"
											/>
										</svg>
										<div class="text-primary text-sm font-semibold">{{ $t("rating.bartaraf_etish_yollari") }} Бартараф этиш йўллари</div>
									</div>
									<div class="text-black text-sm font-normal">
										<Markdown :source="item.eliminateUz" html />
									</div>
								</div>
							</div>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { CriteriesDto } from "@/services/erp/soliq/models";

// @ts-ignore
import Markdown from "vue3-markdown-it";

type IProps = CriteriesDto & {
	isCollapsed: boolean;
};
const props = defineProps<{ criteries: CriteriesDto[] }>();

const list = computed({
	get() {
		return props.criteries as unknown as IProps[];
	},
	set() {},
});
</script>

<style scoped>
thead tr {
	@apply text-gray-600 text-sm;
}

tbody tr:nth-child(odd) td:first-child {
	border-top-left-radius: 10px;
}
tbody tr:nth-child(odd) td:last-child {
	border-top-right-radius: 10px;
}

tbody tr td:first-child {
	border-bottom-left-radius: 10px;
}
tbody tr td:last-child {
	border-bottom-right-radius: 10px;
}

tbody tr td {
	@apply min-h-[3.1875rem] p-4 text-sm  text-primary bg-white;
}

tbody tr td:nth-child(even) {
	@apply bg-indigo-100;
}
</style>
