<template>
  <div class="unique-code font-russo-one">
    <span class="code-title color-white">Device: </span>
    <span class="code color-main">{{ $store.state.unique_code }}</span>
  </div>
</template>

<style lang="scss" scoped>
.unique-code {
  position: absolute;
  z-index: 100000;
  top: 5px;
  right: 10px;
  font-size: 25px;
}
</style>
