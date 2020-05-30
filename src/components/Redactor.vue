<template>
  <editor-content :editor="TextEditor"/>
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
  name: "Redactor",
  components: { EditorContent, EditorMenuBar },
  props: {
    onBlur: {
      type: Function,
      default: () => null
    },
    populateWith: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      TextEditor: null,
    }
  },
  mounted() {
    this.TextEditor = new Editor({
      extensions: EDITOR_EXTENSIONS,
      content: this.populateWith,
      onBlur: this.onBlur,
      onUpdate: (EditorInstance) => this.$emit('update', EditorInstance),
    });
  },
  beforeDestroy() {
    this.TextEditor.destroy();
  },
}
</script>

<style scoped>

</style>