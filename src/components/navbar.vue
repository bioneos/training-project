<template>
  <nav>
    <ul class="flex items-center rounded-full h-14 border-dotted border-2 border-gray-500 justify-between">
      <li><a href="/welcome" @click.prevent="navigate('/welcome')">Home</a></li>
      <li><a href="/settings" @click.prevent="navigate('/settings')">Settings</a></li>
      <li><a href="https://github.com/bioneos/training-project/tree/main" target="_blank">Repo</a></li>
      <li><a href="#" @click.prevent="logout">Logout</a></li>
      <li><UButton block
                    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                    variant="ghost"
                    aria-label="Theme"
                    @click="isDark = !isDark"
                    class="theme-button"
                  />
        </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCookie } from '#app'; // Ensure you import useCookie
import { computed } from 'vue';

const router = useRouter();

const navigate = (path) => {
  router.push(path);
};

const me = async () => {
  const token = useCookie('token').value || "";
  console.log('me: Token:', token); // Log to ensure token is retrieved

  return await $fetch('/api/auth/me', { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token }) 
  }).then((data) => { 
    return data;
  }).catch((error) => {
    console.log(error);
  });
};

const logout = async () => {
  const response = await $fetch('/api/auth/logout', { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((data) => {
    return data;
  }).catch((error) => {
    console.log(error);
  });

  if (response && response.success) {
    console.log('Logout successful');
    router.push('/login'); // Navigate to login page after logout
  } else {
    console.log('Logout failed');
  }
};

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
});

</script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0px;
  display: flex; 
  align-items: center; 
}

nav li {
  display: flex; 
  margin-right: 10px;
  margin-left: 10px;
  align-items: center; 
  flex: 1px; 
}

.theme-button {
    margin: 0px; 
    padding: 0px; 
  }
</style>
