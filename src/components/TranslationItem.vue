<template>
  <div class="translation-item">
    <BIcon icon="plus-circle" scale="1" style="position: absolute; top: 5px; right:5px; " @click.self="showForm = !showForm"/>
    <router-link v-if="!showForm" tag="div" :to="{ name: 'translation-show', params: { id: translation._id }}">
      <div class="translation-item__name">
        <strong>{{ translation.name}}</strong>
      </div>

      <div class="translation-item__lang d-flex justify-content-between">
          <span>
            <strong>De:</strong> {{ translation.fromLang }}
          </span>
          <span>
            <strong>Para:</strong> {{ translation.toLang }}
          </span>
      </div>

      <div class="translation-item__meta">
        {{ translation.created | date }}
      </div>
    </router-link>
    <slot v-else name="edit-form">

    </slot>
  </div>
</template>

<script>
export default {
  name: "TranslationItem",

  props: {
    translation: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showForm: false,
    }
  },
}
</script>

<style>
.translation-item {
  position: relative;
  flex-basis: 280px;
  flex-shrink: 0;
  margin: 10px 20px;
  padding: 10px 10px 20px;
  border: 1px solid #484848e0;
  background-color: #383838;
  transition: transform .1s;
}

.translation-item:hover, .translation-item:focus {
  cursor: pointer;
  box-shadow: -5px 5px #a970ff;
  transform: translate(5px, -5px);
}

.translation-item__name {
  font-size: 20px;
}

.translation-item__meta {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1px 3px;
  font-size: 13px;
  font-weight: 100;
}

</style>