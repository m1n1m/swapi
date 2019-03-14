<template>
<div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Страница не найдена (404)</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="headline">
                Запрашиваемы ресурс не обнаружен
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="goBack">
                  Домой
                  <v-icon right dark>home</v-icon>
                </v-btn>
                <v-spacer></v-spacer>                
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>

export default {
  methods: {
    goBack : function () {
      this.$router.go(-1)
    }
  },
  computed: {
    location: function () {
      return document.referrer;
    }
  }
}
</script>

<style scoped>

  body {
    background: #f4f6f6;
    font-family: 'Roboto', sans-serif;
    color: #414546;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 20px 0;
  }

  .panel {
    background: #eee;
    padding: 40px 60px;
    border-radius: 6px;
    width: 40em;
    margin: 50px auto;
    max-width: 100%;
  }

  a, a:link, a:active, a:visited {
    color: #00c7b7;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  
</style>