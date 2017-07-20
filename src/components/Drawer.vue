<template lang="pug">
  v-navigation-drawer(right overflow persistent v-model='drawer')
    app-detail(v-if='operation', :operation='operation')
</template>
