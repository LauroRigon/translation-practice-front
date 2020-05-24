import apiClient from "@/services/apiClient";

export default {
  props: {
    baseUrl: {
      type: String,
      default: '',
    },
    endpoint: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      api: apiClient,
      data: null,
      error: null,
      loading: null,
    }
  },
  methods: {
    async query(type, ...params) {
      if (this.loading) return;

      this.loading = true;

      try {
        const response = await this.api[type](...params);
        this.data = response.data;
        this.error = null;
        this.$emit('success', response);
      } catch (error) {
        this.data = null;
        this.error = error.response;
        this.$emit('error', error);
      }

      this.loading = false;
    },
  }
}