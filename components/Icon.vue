<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g v-if="!variant || variant == 'chevron-right'">
     <polyline points="9 18 15 12 9 6"></polyline>
    </g>
    <g v-else-if="variant == 'chevron-left'">
      <polyline points="15 18 9 12 15 6"></polyline>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    variant: String,
    size: {
      type: Number,
      default: 24,
    },
    stroke: {
      type: Number,
      default: 1.5,
    },
  },
};
</script>