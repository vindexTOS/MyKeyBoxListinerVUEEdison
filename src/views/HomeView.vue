<template>
    <section class="homepage">
        <div class="welcome text-center color-white font-montserrat">Welcome to</div>
        <div class="mykeybox text-center color-main font-russo-one">MyKeyBox3</div>
        <div class="flex-center-container">
            <router-link :to="{name: 'code'}" class="press-to-start font-montserrat">Press to start</router-link>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.homepage {
  height: 100vh;

  .welcome {
    margin-top: 50px;
    font-size: 45px;
  }

  .mykeybox {
    font-size: 128px;
  }

  .press-to-start {
    color: var(--color-dark);
    background-color: var(--color-main);
    border-radius: 34px;
    font-size: 28px;
    padding: 28px 48px;
    margin-top: 50px;
  }
}
</style>