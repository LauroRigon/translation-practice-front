<template>
  <div class="translation-view">
    <splitpanes horizontal="horizontal" style="height: 100vh;">
      <pane>
        <editor-content :editor="originalTextEditor" style="width: 100%; height: 100%;"/>
      </pane>
      <pane>
        <splitpanes vertical="vertical">
          <pane>
            <editor-content :editor="translationTextEditor" style="width: 100%; height: 100%;"/>
          </pane>
          <pane>
            <editor-content :editor="translationTextInvertedEditor" style="width: 100%; height: 100%;"/>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  Heading,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import store from "@/store";

const EDITOR_EXTENSIONS = [
  new Blockquote(),
  new Heading({ levels: [1, 2, 3] }),
  new Bold(),
  new Italic(),
  new Link(),
  new Strike(),
  new Underline(),
  new History(),
];

export default {
  name: "TranslationShow",
  components: { Splitpanes, Pane, EditorContent, EditorMenuBar },
  props: {
    translation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      originalTextEditor: null,
      translationTextEditor: null,
      translationTextInvertedEditor: null,
    }
  },
  mounted() {
    this.originalTextEditor = new Editor({
      extensions: EDITOR_EXTENSIONS,
      content: this.translation.originalText,
      onBlur: this.handleOriginalBlur,
    });

    this.translationTextEditor = new Editor({
      extensions: EDITOR_EXTENSIONS,
      content: this.translation.translationText,
      onBlur: this.handleTranslationBlur,
    });

    this.translationTextInvertedEditor = new Editor({
      extensions: EDITOR_EXTENSIONS,
      content: this.translation.translationInvertedText,
      onBlur: this.handleTranslationInvertedBlur,
    });
  },
  beforeDestroy() {
    this.originalTextEditor.destroy()
  },
  methods: {
    handleOriginalBlur() {
      const text = this.originalTextEditor.getHTML();
      store.updateTranslation({ _id: this.translation._id, originalText: text })
    },
    handleTranslationBlur() {
      const text = this.translationTextEditor.getHTML();
      store.updateTranslation({ _id: this.translation._id, translationText: text })
    },
    handleTranslationInvertedBlur() {
      const text = this.translationTextInvertedEditor.getHTML();
      store.updateTranslation({ _id: this.translation._id, translationInvertedText: text })
    }
  }
}
</script>

<style>
.splitpanes {
  color: white;
}
.splitpanes__pane {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
  justify-content: center;
  align-items: center;
  display: flex;
}
.splitpanes__splitter {
  cursor: ns-resize;
}

.splitpanes--vertical > .splitpanes__splitter {
  min-width: 10px;
  background-color: #333642;
}
.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 10px;
  background-color: #333642;
}

.ProseMirror {
  height: 100%;
}

</style>