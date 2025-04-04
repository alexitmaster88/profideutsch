<template>
	<label class="block mb-2 text-sm font-medium text-gray-900">
		{{ label }} <span v-if="required" class="text-red-500">*</span>

		<v-select
			class="mt-1 "
			:class="{ '!border-red-500 border rounded-md': error }"
			v-bind="$attrs"
			:options="options"
			v-model="innerVal"
			:label="optionLabel"
			:reduce="(item:any) => item[valueid]"
		></v-select>
	</label>
</template>

<script setup lang="ts">
import { computed } from "vue";
// @ts-ignore
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

type IProps = {
	modelValue: string | number | unknown;
	options: any[];
	label: string;
	placeholder?: string;
	required?: boolean;
	optionLabel?: string;
	valueid?: string;
	error?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
	label: "",
	optionLabel: "text",
	valueid: "value",
	error: false,
});

const emit = defineEmits(["update:modelValue"]);

const innerVal = computed({
	get() {
		return props.modelValue === 0 ? null : props.modelValue;
	},
	set(v) {
		emit("update:modelValue", v);
	},
});
</script>

<style>
:root {
	--vs-border-radius: 6px;
	--vs-line-height: 1.6;
	--vs-dropdown-option--active-bg: theme("colors.primary[DEFAULT]");
}
</style>
