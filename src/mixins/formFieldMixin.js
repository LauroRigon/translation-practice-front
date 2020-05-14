export default {
  inheritAttrs: false,
  data() {
    return {
      labelActive: false
    }
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String],
      default: null,
    },
    block: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: () => this.labelActive = true,
        blur: () => this.labelActive = false,
      };
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  }
}