<template>
  <div class="player" @click.stop="">
    <div class="player-controls">
      <div>
        <a href="#">
          <font-awesome-icon icon="stop"/>
        </a>
      </div>
      <div>
        <a href="#" @click.prevent="playing = true">
          <font-awesome-icon icon="play"/>
        </a>
      </div>
      <div>
        <div class="player-progress">
          <div class="player-seeker" style="width: 50%"></div>
        </div>
      </div>
      <div style="align-self: center;">
        <input type="range" min="0" max="100"/>
      </div>
    </div>
    <audio
      ref="audiofile"
      :src="file"
      preload="auto"
      style="display: none;"
      @timeupdate="update"
      @loadeddata="load"
      @pause="playing = false"
      @play="playing = true"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    file: {
      type: String,
      default: null,
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      audio: null,
      currentSeconds: 0,
      durationSeconds: 0,
      loaded: false,
      playing: false,
      previousVolume: 15,
      showVolume: false,
      volume: 100,
    }
  },

  computed: {
    percentComplete() {
      return parseInt(this.currentSeconds / this.durationSeconds * 100);
    },
  },

  watch: {
    playing(newValue) {
      if (newValue) return this.audio.play();

      this.audio.pause();
    },

    volume(newValue) {
      this.showVolume = false;
      this.audio.volume = newValue / 100;
    }
  },

  methods: {
    load() {
      if (this.audio.readyState >= 2) {
        this.loaded = true;
        this.durationSeconds = parseInt(this.audio.duration);

        return this.playing = this.autoPlay;
      }
    },

    update() {
      this.currentSeconds = parseInt(this.audio.currentTime);
    }
  },

  mounted() {
    this.audio = this.$refs.audiofile;
  }
}
</script>

<style scoped>

</style>