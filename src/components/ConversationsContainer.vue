<template>

  <div class="card conversations-panel">
    <div class="card-header">
      Contatos
      <b-button @click="logout" class="float-right">Sair</b-button>
    </div>
    <b-overlay :show="sharedState.loadings.conversations" rounded="sm">
      <div class="card-body" style="padding: 0; height: 100%;">
        <ul class="list-unstyled">
          <ConversationItem v-for="chat in sharedState.chats" :key="chat.id" :chat-id="chat.id" :contact="chat.user" :last-message="chat.last_message"/>
        </ul>
      </div>
    </b-overlay>
  </div>

</template>

<script>

import store from "@/store";
import ConversationItem from "@/components/ConversationItem";
import { BOverlay, BButton } from 'bootstrap-vue';

export default {
  name: "ConversationsContainer",
  components: { ConversationItem, BOverlay, BButton },
  data() {
    return {
      sharedState: store.state
    }
  },

  created() {
    store.fetchConversations();
  },

  methods: {
    logout() {
      store.logout();
    }
  },
}
</script>

<style scoped>

</style>