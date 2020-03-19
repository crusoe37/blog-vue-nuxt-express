<template>
  <div class="error-layout">
    <div class="error-content">
      <h1 class="error-title">
        Error 404
      </h1>
      <nuxt-link to="/">
        Вернуться на главную
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .error-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5rem;
  }

  .error-title {
    color: rgb(211, 2, 2);
    margin-bottom: 1rem;
  }
</style>
