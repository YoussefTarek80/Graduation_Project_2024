<template>
  <div
      id="alert-border-2"
      class="flex items-center p-4 mb-4"
      role="alert"
  >
    <svg
        class="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
    >
      <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
      />
    </svg>
    <div class="ms-3 text-sm font-medium ">
      <slot name="messageError"></slot>
    </div>
  </div>
</template>
<script>
</script>
<style scoped>
#alert-border-2{
  color: green;
  background-color: #d7f8d8;
  border-color: #699647;
}
</style>