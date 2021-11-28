<template>
  <div class="page__container">
    <section class="ash_price">
      <span class="text-9xl font-semibold">${{ash_price.toFixed(3)}}</span>
      <div class="overflow-hidden">
        <h1 ref="title">Watch&nbsp;the&nbsp;ASH&nbsp;fly</h1>
      </div>
    </section>
    <section class="cards">
      <card
        style="background: linear-gradient(135deg, #00FABA 0%, #00D8FF 100%);"
        img="nifty.svg"
        link="https://niftygateway.com/itemdetail/primary/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/8"
      >
        <ol>
          <li class="card__title">Nifty Gateway</li>
          <li class="card__desc">Cube floor</li>
          <li>
            <span class="text-2xl">${{numberWithCommas(Math.round(nifty_floor.usd))}}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{nifty_floor.eth.toFixed(2)}}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
      <card
        class="mb-20"
        style="background: linear-gradient(45deg, #1868B7 0%, #2BCDE4 100%);"
        img="opensea.svg"
        link="https://opensea.io/assets/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/22700080007"
      >
        <ol>
          <li class="card__title">Opensea Gateway</li>
          <li class="card__desc">Cube floor</li>
          <li>
            <span class="text-2xl">${{numberWithCommas(Math.round(opensea_floor.usd))}}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{opensea_floor.eth.toFixed(2)}}</span>
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
          <li class="card__title font-bold">Burnt Cubes</li>
          <li>
            <span class="text-2xl">{{burnt_cube}}</span>
            <span class="opacity-40">/ {{total_cube}}</span>
          </li>
        </ol>
      </card>
    </section>
    <section class="stats">
      <card-carousel :cubes="cubes_stats"></card-carousel>
      <div class="text-right">
        <span class="text-9xl font-semibold">{{ash_rate.toFixed(3)}}</span>
        <h1>ASH per <a href="https://burn.art/">burn</a></h1>
      </div>
    </section>
    <section class="pak">
      <icon ref="pak" class="w-1/3 opacity-0" variant="pak" />
    </section>
    <section class="credits">
      <p><b>Buy me </b><span class="text-l">☕</span></p>
      <p><b>0xC958c2B65E9840F76E34EE660e27cCf254d75Fa4</b></p>
      <p>Base on <a href="https://watchcubesburn.art/">watchcubesburn.art</a> by [secondstate]</p>
    </section>
  </div>
</template>

<script>
import intersection_helper from "~/mixins/intersection-helper.js";
export default {
  mixins: [intersection_helper],

  async fetch() {
    let data = (await this.$http.$post("/", process.env.DATA_API + "/ashStats")).data;
    this.eth_price = 4241.755785657359203069158769979819;
    this.eth_price = parseFloat(data.bundle.ethPriceUSD);
    this.ash_price = this.eth_price * parseFloat(data.token.derivedETH);
    // this.setAshPrice(this.eth_price * parseFloat(data.token.derivedETH));

    // Market Stats
    data = await this.$http.$post("/", process.env.DATA_API + "/niftyfloorStats");
    this.nifty_floor = {
      usd: data.price_in_cents / 100,
      eth: data.price_in_cents / 100 / this.eth_price,
    };
    data = await this.$http.$post("/", process.env.DATA_API + "/osfloorStats");
    this.opensea_floor = { usd: data.floor_price * this.eth_price, eth: data.floor_price };

    // ASH stats
    data = await this.$http.$post("/", process.env.DATA_API + "/ashLiquidityStats");
    this.total_ash = data.totalSupply / 10e17;
    this.ash_rate = 1e3 * Math.pow(0.5, this.total_ash / 5e6);

    // Cubes stats
    data = await this.$http.$post("/", process.env.DATA_API + "/fungibleStats");
    this.total_cube = data.FungibleTotal;
    this.burnt_cubes = data.TotalCubesBurned;
    this.cubes_stats.push({ burnt: data.ACubeBurned, left: data.ACubeLeft });
    this.cubes_stats.push({ burnt: data.FiveCubesBurned, left: data.FiveCubesLeft });
    this.cubes_stats.push({ burnt: data.TenCubesBurned, left: data.TenCubesLeft });
    this.cubes_stats.push({ burnt: data.TwentyCubesBurned, left: data.TwentyCubesLeft });
    this.cubes_stats.push({ burnt: data.FiftyCubesBurned, left: data.FiftyCubesLeft });
    this.cubes_stats.push({ burnt: data.HundredCubesBurned, left: data.HundredCubesLeft });
    this.cubes_stats.push({ burnt: data.FiveHundredCubesBurned, left: data.FiveHundredCubesLeft });
    this.cubes_stats.push({ burnt: data.ThousandCubesBurned, left: data.ThousandCubesLeft });
  },
  data: () => ({
    eth_price: 4241.755785657359203069158769979819,
    ash_price: 47.139,

    nifty_floor: { usd: 39000, eth: 9.18 },
    opensea_floor: { usd: 37389, eth: 8.8 },

    total_cube: 6165,
    burnt_cube: 3260,

    total_ash: 2766202,
    ash_rate: 680.909,

    cubes_stats: [
      {
        name: "A Cube",
        burnt: 3200,
        left: 1948,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_800/v1618196543/Pak/ACube.mp4",
      },
      {
        name: "Five Cubes",
        burnt: 52,
        left: 523,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618197133/Pak/FiveCubes.mp4",
      },
      {
        name: "Ten Cubes",
        burnt: 3,
        left: 244,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196775/Pak/TenCubes.mp4",
      },
      {
        name: "Twenty Cubes",
        burnt: 4,
        left: 116,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196787/Pak/TwentyCubes.mp4",
      },
      {
        name: "Fifty Cubes",
        burnt: 2,
        left: 36,
        video:
          "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1617754887/Ashley/Pak/Fungible Open Edition/5_Fifty_Cubes_mnfy6l.mp4",
      },
      {
        name: "Hundred Cubes",
        burnt: 0,
        left: 34,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196813/Pak/HundredCubes.mp4",
      },
      {
        name: "Five Hundred Cubes",
        burnt: 0,
        left: 4,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196788/Pak/FiveHundredCubes.mp4",
      },
      {
        name: "Thousand Cubes",
        burnt: 0,
        left: 3,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196777/Pak/ThousandCubes.mp4",
      },
    ],
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

    this.intersectionTrigger(
      this.$refs["pak"].$el,
      () => {
        this.$refs["pak"].$el.classList.add("invoke");
      },
      0.6
    );
  },

  methods: {
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
  @apply w-full max-w-6xl;
  @apply mx-auto;
  @apply bg-white;
  @apply flex justify-between items-center;
}
section.stats {
  @apply w-full max-w-6xl;
  @apply mt-72 mx-auto;
  @apply grid items-center;
  grid-template-columns: 1fr 2fr;
}
section.pak {
  @apply mt-16;
  @apply flex justify-center;
}
section.credits {
  @apply h-32 w-full;
  @apply mt-16;
  @apply text-center;
}

.invoke {
  animation: invoke 0.6s ease-in-out forwards;
}
@keyframes invoke {
  from {
    opacity: 0;
    transform: translateY(5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
