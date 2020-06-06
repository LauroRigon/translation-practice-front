<template>
  <div
    class="draggable-container"
    ref="dragElement"
    @touchstart.prevent.stop="dragStart"
    @touchend.prevent.stop="dragEnd"
    @touchmove.prevent.stop="drag"

    @contextmenu.prevent.stop="dragStart"
    @mouseup.prevent.stop="dragEnd"
    @mousemove.prevent.stop="drag"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DraggableFree",
  props: {
    translateX: {
      type: Number,
      default: 0
    },
    translateY: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      active: false,
      currentX: null,
      currentY: null,
      initialX: this.translateX,
      initialY: this.translateY,
      xOffset: this.translateX,
      yOffset: this.translateY,
    }
  },
  mounted() {
    this.$refs.dragElement.style.transform = `translate3d(${this.translateX}px, ${this.translateY}px, 0)`;
  },
  methods: {
    dragStart(e) {
      if (e.type === 'touchstart')  {
        this.initialX = e.touches[0].clientX - this.xOffset;
        this.initialY = e.touches[0].clientY - this.yOffset;
      } else {
        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;
      }
      if (e.path.includes(this.$refs.dragElement)) {
        this.active = true;
        this.$emit('drag-start', e);
      }
    },
    dragEnd(e) {
      this.initialX = this.currentX;
      this.initialY = this.currentY;

      this.active = false;
      this.$emit('drag-end', {e, context: {...this._data}});
    },
    drag(e) {
      if (!this.active) return

      if (e.type === 'touchmove') {
        this.currentX = e.touches[0].clientX - this.initialX;
        this.currentY = e.touches[0].clientY - this.initialY;
      } else {
        this.currentX = e.clientX - this.initialX;
        this.currentY = e.clientY - this.initialY;
      }

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      this.$refs.dragElement.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
      this.$emit('drag', e);
    },
  }
}
</script>

<style scoped>
.draggable-container {

  touch-action: none;
}
</style>