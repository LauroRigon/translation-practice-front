<template>
  <div class="translation-view">
    <splitpanes horizontal="horizontal" style="height: 100vh;">
      <pane>
        <div v-html="translation.originalText"></div>
      </pane>
      <pane>
        <splitpanes vertical="vertical">
          <pane>
            <Redactor class="p-1 w-100 h-100" @update="handleTranslationUpdate" :populate-with="translation.translationText"/>
          </pane>
          <pane>
            <Redactor class="p-1 w-100 h-100" @update="handleTranslationInvertedUpdate" :populate-with="translation.translationInvertedText"/>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes';

import store from "@/store";
import Redactor from "@/components/Redactor";

import debounce from 'lodash/debounce'

export default {
  name: "TranslationShow",
  components: {Redactor, Splitpanes, Pane},
  props: {
    translation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {
    this.handleTranslationUpdate = debounce(this.handleTranslationUpdate, 3000);
  },
  methods: {
    handleTranslationUpdate(Editor) {
      const text = Editor.getHTML();
      store.updateTranslation({ _id: this.translation._id, translationText: text })
    },
    handleTranslationInvertedUpdate(Editor) {
      const text = Editor.getHTML();
      store.updateTranslation({ _id: this.translation._id, translationInvertedText: text })
    }
  }
}
</script>

<style scoped>
.ProseMirror {
  height: 100vh;
}
.splitpanes__pane {
  overflow-y: auto;
}
</style>