<template>
  <div class="translation-view">
      <app-toolbox style="padding-top: 25px;">
        <toolbox-tool icon="file-audio">
          <div class="player-wrapper">
            <audio-player :file="'http://localhost:3000/' + translation.audioFile" />
          </div>
        </toolbox-tool>
      </app-toolbox>

      <splitpanes horizontal="horizontal" style="height: 100vh;">
      <pane >
        <div v-html="translation.originalText" class="w-100 h-100" style="padding: 20px; word-wrap: break-word;"></div>
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
import AppToolbox from "@/components/toolbox/AppToolbox";
import ToolboxTool from "@/components/toolbox/ToolboxTool";
import AudioPlayer from "@/components/AudioPlayer";

export default {
  name: "TranslationShow",
  components: {AudioPlayer, ToolboxTool, AppToolbox, Redactor, Splitpanes, Pane},
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
      store.updateTranslation(this.translation._id, { translationText: text });
    },
    handleTranslationInvertedUpdate(Editor) {
      const text = Editor.getHTML();
      store.updateTranslation(this.translation._id, { translationInvertedText: text });
    },
    handleToolboxDragEnded({ context }) {
      window.localStorage.setItem('toolbox-initials-cords', JSON.stringify({translateX: context.currentX, translateY: context.currentY}));
    }
  },
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