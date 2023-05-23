<template>
  <div class="themeSwitch" @click="toggle">
    <div class="switchToggle" :class="{ 'switch-toggle-checked': isDark }">
      <!-- icons from mdi -->
      <svg
        v-if="!isDark"
        style="
          stroke: none;
          fill: var(--text-primary-color);
          width: calc(0.3 * var(--element-size));
          margin-top: calc(0.055 * var(--element-size));
          margin-left: calc(-0.006 * var(--element-size));
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <title>weather-sunny</title>
        <path
          d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z"
        />
      </svg>
      <svg
        v-else
        style="
          stroke: none;
          fill: var(--text-primary-color);
          width: calc(0.25 * var(--element-size));
          margin-top: calc(0.068 * var(--element-size));
        "
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
      >
        <path
          d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // default to dark mode for user's first time on site
      isDark:
        localStorage.getItem("isDark") === null
          ? true
          : localStorage.getItem("isDark") === "true",
      theme: "dark-theme",
    };
  },
  watch: {
    isDark() {
      this.setTheme();
    },
  },
  mounted() {
    this.setTheme();
  },
  methods: {
    toggle() {
      this.isDark = !this.isDark;
    },
    setTheme() {
      document.documentElement.className = this.isDark ? "dark-theme" : "";
      localStorage.setItem("isDark", this.isDark);
    },
  },
};
</script>

<style scoped>
.themeSwitch {
  width: var(--element-size);
  border-radius: var(--element-size);
  border: calc(var(--element-size) * 0.025) solid var(--text-secondary-color);
  padding: calc(var(--element-size) * 0.1);
  font-size: calc(var(--element-size) * 0.3);
  height: calc(var(--element-size) * 0.35);
  align-items: center;
  background: var(--accent-color);
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 15px;
  right: 15px;
  transition: background 0.5s ease;
  justify-content: space-between;
  z-index: 1;
}
.switchToggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(var(--element-size) * 0.055);
  left: calc(var(--element-size) * 0.055);
  height: calc(var(--element-size) * 0.4);
  width: calc(var(--element-size) * 0.4);
  padding: 1px;
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}
.switch-toggle-checked {
  transform: translateX(calc(var(--element-size) * 0.65)) !important;
}
</style>
