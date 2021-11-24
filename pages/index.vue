<template>
  <div class="page__container">
    <section class="ash_price">
      <h1>${{ash_price.toFixed(3)}}</h1>
      <div class="overflow-hidden">
        <span ref="title" class="text-8xl tracking-tighter">Watch&nbsp;the&nbsp;ASH&nbsp;fly</span>
      </div>
    </section>
    <section class="cards">
      <card
        style="background: linear-gradient(135deg, #00FABA 0%, #00D8FF 100%);"
        img="nifty.svg"
        link="https://niftygateway.com/itemdetail/primary/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/8"
      >
        <ol>
          <li class="mb-2 text-lg">Nifty Gateway</li>
          <li class="text-xs opacity-30">Cube floor</li>
          <li>
            ${{numberWithCommas(nifty_floor.usd)}}
            <span class="text-xs tracking-wide opacity-40">/ {{nifty_floor.eth}}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
      <card
        class="mb-16"
        style="background: linear-gradient(45deg, #1868B7 0%, #2BCDE4 100%);"
        img="opensea.svg"
        link="https://opensea.io/assets/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/22700080007"
      >
        <ol>
          <li class="mb-2 text-lg">Opensea Gateway</li>
          <li class="text-xs opacity-30">Cube floor</li>
          <li>
            ${{numberWithCommas(opensea_floor.usd)}}
            <span class="text-xs tracking-wide opacity-40">/ {{opensea_floor.eth}}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
      <card
        burning
        video="https://media.niftygateway.com/video/upload/q_auto:good,w_800/v1618196543/Pak/ACube.mp4"
        link="https://burn.art/"
      >
        <ol>
          <li class="mb-2 text-lg font-bold">Burnt Cubes</li>
          <li>3,259 <span class="text-xs opacity-40">/ 6165</span></li>
        </ol>
      </card>
    </section>
    <section class="ash_stats">
      <div></div>
      <div class="bg-dark"></div>
    </section>
    <section class="credits"></section>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  components: { Card },
  async fetch() {
    let data = (await this.$http.$post("/", process.env.DATA_API + "/ashStats")).data;
    this.eth_price = 4241.755785657359203069158769979819;
    // this.eth_price = parseFloat(data.bundle.ethPriceUSD);
    // this.ash_price = (this.eth_price * parseFloat(data.token.derivedETH)).toFixed(3);
    this.setAshPrice(this.eth_price * parseFloat(data.token.derivedETH));

    this.nifty_floor = (await this.$http.$post("/", process.env.DATA_API + "/niftyfloorStats")).price_in_cents / 100;
    this.opensea_floor =
      (await this.$http.$post("/", process.env.DATA_API + "/osfloorStats")).floor_price * this.eth_price;
  },
  data: () => ({
    eth_price: 4241.755785657359203069158769979819,
    ash_price: 47.139,

    nifty_floor: { usd: 39000, eth: 9.18 },
    opensea_floor: { usd: 37389, eth: 8.8 },
  }),

  created() {
    //   setTimeout(this.fetch)
  },

  mounted() {
    let el = this.$refs["title"];
    el.innerHTML = el.textContent.replace(/\w/g, '<span class="slide" style="--delay: #s">$&</span>');
    var spans = el.innerHTML.split("#");
    for (let i = 0; i < spans.length - 1; i++) {
      spans[i] = spans[i] + i * 0.06;
    }
    el.innerHTML = spans.join("");
  },

  methods: {
    setAshPrice(new_val) {
      let start = this.ash_price;
      let end = new_val;

      var range = end - start;
      var current = start;
      var increment = end > start ? 0.001 : -1;
      var stepTime = 1;
      var timer = setInterval(() => {
        current += increment;
        this.ash_price = current;
        if (current >= end) {
          clearInterval(timer);
        }
      }, stepTime);
    },

    numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style lang="postcss">
section.ash_price {
  height: 100vh;
  @apply max-w-7xl;
  @apply mx-auto;
  @apply pl-12;
  @apply flex flex-col justify-center text-left;
}
section.cards {
  height: 80vh;
  @apply w-full max-w-6xl;
  @apply mx-auto;
  @apply bg-white;
  @apply flex justify-between items-center;
}
section.ash_stats {
  height: 80vh;
  @apply w-full;
  @apply grid;
  grid-template-columns: 1fr 2fr;
}
section.credits {
  @apply h-32 w-full;
}

.slide {
  display: inline-block;
  transform: translateY(2ch);
  animation: slide 1s ease-in-out var(--delay) forwards;
}
@keyframes slide {
  from {
    transform: translateY(2ch);
  }
  to {
    transform: translateY(0);
  }
}
</style>
