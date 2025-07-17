<template>
    <header>
        <div>
          <Logo />
          <Navbar/>
        </div>
    </header>
    <div>
      <ClientOnly>
        <NuxtPage />
      </ClientOnly>
     </div>
  </template>
  
<script setup>
  import Navbar from '../components/navbar.vue';
</script>
