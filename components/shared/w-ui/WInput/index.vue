<template>
	<label
		:class="{
			'block mb-2 text-sm font-medium': true,
			'text-gray-900': !forMenu,
			'text-white': forMenu,
		}"
	>
		{{ label }} <span v-if="required" class="text-red-500">*</span>
		<input
			class="my-1 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus-visible:ring-primary focus-visible:outline-none focus:border-primary focus-visible:border-primary block w-full px-4 py-2 text-sm leading-5"
			:class="{
				'!border-red-500': error,
				'cursor-not-allowed': $attrs.disabled,
			}"
			v-model="innerVal"
			v-maska
			:data-maska="mask"
			:placeholder="placeholder"
			v-bind="$attrs"
		/>
	</label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { vMaska } from "maska";

type IProps = {
	modelValue?: string | number | unknown;
	label: string;
	forMenu?: boolean;
	placeholder?: string;
	required?: boolean;
	mask?: string;
	error?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const props = withDefaults(defineProps<IProps>(), {
	label: "",
	error: false,
});

const emit = defineEmits(["update:modelValue"]);

const innerVal = computed({
	get() {
		return props.modelValue;
	},
	set(v) {
		emit("update:modelValue", v);
	},
});
</script>
