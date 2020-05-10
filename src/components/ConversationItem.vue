<template>
  <b-media tag="li" class="conversation-item" vertical-align="end" @click="handleClick">
    <template v-slot:aside>
      <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img>
    </template>
    <span class="h5">{{ contact.name }}</span>
    <template v-if="lastMessage">
      <small class="float-right p-1">{{ lastMessage.created_at }}</small>
      <span class="conversation-item__text text-muted mt-1">{{ lastMessage.message_body }}</span>
    </template>
  </b-media>
</template>

<script>
import { BMedia, BImg } from 'bootstrap-vue';

export default {
  name: "ConversationItem",
  components: { BMedia, BImg },
  props: {
    contact: {
      type: Object,
      required: true,
    },
    lastMessage: {
      type: Object,
      required: false,
    },
    chatId: {
      type: Number,
      required: true,
    }
  },

  methods: {
    handleClick() {
      this.$router.push( { name: 'conversation', params: { id: this.chatId } });
    }
  },
}
</script>

<style scoped>
  .conversation-item {
    border-bottom: 2px solid rgba(0, 0, 0, 0.14);
  }

  .conversation-item__text {
    display: block;
    font-size: 0.9rem;
  }
</style>