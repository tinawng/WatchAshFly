<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
  <g v-if="!variant || variant == 'pak'">
      <circle stroke="white" fill="currentColor" cx="12" cy="12" r="10"></circle>
      <circle stroke="white" fill="white" cx="12" cy="12" r="4"></circle>
    </g>
    <g v-else-if="variant == 'chevron-right'">
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
    stroke: {
      type: Number,
      default: 1.5,
    },
  },
};
</script>