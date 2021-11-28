<template>
  <div class="carousel__container" style="height: 30rem;">
    <transition name="fade" mode="out-in">
      <card :key="index" dark :video="cubes[index].video">
        <ol>
          <li class="card__title font-bold">{{cubes[index].name}}</li>
          <li class="card__desc">Burning Ratio</li>
          <li class="mt-1 flex">
            <div class="h-4 bg-dark" :style="`flex-basis: ${burnt_percentage}%`"></div>
            <div class="h-4 flex-grow bg-dark bg-opacity-5"></div>
          </li>
          <li class="mt-1 flex justify-between">
            <span class="text-sm font-medium tracking-wide">{{cubes[index].burnt}}</span>
            <span class="text-sm font-medium tracking-wide opacity-30">{{cubes[index].left}}</span>
          </li>
        </ol>
      </card>
    </transition>

    <button v-show="index != 0" class="carousell__button_previous" @click="index--">
      <icon class="w-6" variant="chevron-left" :stroke="2.5"/>
    </button>
    <button v-show="index < cubes.length-1" class="carousell__button_next" @click="index++">
      <icon class="w-6" variant="chevron-right" :stroke="2.5"/>
    </button>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  components: { Card },
  props: { cubes: Array },
  data: () => ({ index: 1 }),
  computed: {
    burnt_percentage: function () {
      return (this.cubes[this.index].burnt / (this.cubes[this.index].burnt + this.cubes[this.index].left)) * 100;
    },
  },
};
</script>

<style lang="postcss">
.carousel__container {
  @apply relative;
  @apply w-fit;
  @apply bg-black bg-opacity-5 rounded-2xl;
}
.carousell__button_next {
  @apply absolute top-48 -right-8;
}
.carousell__button_previous {
  @apply absolute top-48 -left-8;
}
</style>