<script setup lang="ts">
const props = defineProps<{
  items?: string[];
  placeholder: string;
  isRating: boolean;
  label: string;
}>();
const selectedValue = ref("");

function updateSelectedValue(data: string) {
  if (selectedValue.value === data) {
    selectedValue.value = "";
  } else {
    selectedValue.value = data;
  }
}
</script>

<template>
  <div class="w-[150px] mx-4 my-5">
    <Select
      :model-value="selectedValue"
      @update:model-value="(data) => updateSelectedValue(data)"
    >
      <SelectTrigger>
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>{{ props.label }}</SelectLabel>
        <SelectGroup v-for="item in items">
          <SelectItem :value="item">
            <span v-if="!isRating">{{ item }}</span>
            <Icon
              size="16"
              name="material-symbols:stars"
              class="text-amber-500"
              v-else
              v-for="nbr in Number(item)"
            />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
