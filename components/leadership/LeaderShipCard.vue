<template>
	<div>
		<ul class="flex flex-wrap md:gap-3">
			<li
				v-for="t in tabs"
				:key="t.id"
				@click="tab = t.id"
				class="md:pt-4 md:pb-7 pt-2 pb-4 md:min-w-36 text-center font-normal md:px-6 px-3 text-base h-18 text-primary cursor-pointer rounded-t-lg"
				:class="{ 'bg-white': tab == t.id, 'bg-[#F3F3F3]': tab != t.id }"
			>
				{{ t.label }}
			</li>
		</ul>

		<div class="md:min-h-56 -translate-y-3 bg-white rounded-xl p-6">
			<div v-if="tab == 1" class="flex md:flex-row flex-col md:gap-6 gap-4 flex-wrap items-center">
				<div class="overflow-hidden rounded-xl bg-gray-300 md:w-56 md:h-56 w-40 h-40">
					<ImgWithLightBox class="object-cover h-full w-full" :imgs="leadership?.image?.url" />
				</div>
				<div class="md:text-left text-center w-auto flex-1">
					<div class="text-slate-900 md:text-3xl text-2xl leading-tight font-bold mb-2">{{ leadership.fullName }}</div>
					<div class="text-gray-600 text-base font-normal leading-normal">
						{{ leadership.position }}
					</div>
				</div>
			</div>

			<div v-else-if="tab == 2">
				<!-- <div class="text-primary text-2xl font-semibold mb-3">Mehnat Faoliyati</div> -->
				<MarkdownCustom :source="leadership.workActivity || ''" />
			</div>
			<div v-else-if="tab == 3">
				<!-- <div class="text-primary text-2xl font-semibold mb-3">Vakolati doirasida:</div> -->
				<MarkdownCustom :source="leadership.vakolat || ''" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import MarkdownCustom from "../shared/MarkdownCustom.vue";
import { useI18n } from "vue-i18n";
import ImgWithLightBox from "../shared/ImgWithLightBox.vue";

const { t } = useI18n();

const props = defineProps<{ leadership: any }>();

const tab = ref(1);
const tabs = computed(() => {
	const list = [
		{
			id: 1,
			label: t("asosiy"),
		},
	];

	if (props.leadership?.vakolat) {
		list.push({
			id: 3,
			label: t("vakolat_doirasi"),
		});
	}

	if (props.leadership?.workActivity && props.leadership?.showWorkActivity) {
		list.push({
			id: 2,
			label: t("work_activity"),
		});
	}

	return list;
});
</script>
