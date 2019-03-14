<template>
<v-app>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app    
    >
      <v-list>

        <v-list-group
          v-for="item in items"
          v-model="item.active"
          :key="item.title"
          :prepend-icon="item.action"
          no-action          
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-ripple
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="menuClick(subItem)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      :clipped-left="clipped"
      dark color="primary"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="$router.push('/')">
        <v-icon>home</v-icon>
      </v-btn>
      <!-- <v-toolbar-title>{{ title }}</v-toolbar-title> -->
        <v-flex xs8>
        <v-breadcrumbs  >
          <v-icon slot="divider">forward</v-icon>
          <v-breadcrumbs-item
            v-for="crumb in breadcrumbs"
            :key="crumb.text"
            
          >
            {{ crumb.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
        </v-flex>
    </v-toolbar>
    <v-content>
      <v-container fluid>        
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app dark color="primary" class="white--text">
      <span>Author osipenko.aleksey@gmail.com</span>
    </v-footer>
  </v-app>
</template>

<script>

var breadcrumbs = [];

export default {
  name: 'basic-page',
  components: {
    
  },
  beforeCreate : function() {

      breadcrumbs = [];

      this.$route.matched.forEach(match => {

        if (match.hasOwnProperty('meta') && match.meta.hasOwnProperty('bcTitle'))
        {
          breadcrumbs.push( { text: match.meta.bcTitle, path: match.path } )
        }
      })
  },
  data () {

      return {
        showCartDialog: false,
        clipped: true,
        drawer: true,
        fixed: false,
        miniVariant: false,
        title: '',
        breadcrumbs: breadcrumbs,
        items: [
          {
            action: 'local_airport',
            title: 'Космические корабли',
            active: true,
            items: [
              // { title: 'Новая рассылка', link: '/starship/info' },
              { title: 'Список кораблей', link: '/starship/list' }
            ]
          }
        ]
      }
    },
    computed: {
        
    },
    methods: {
      menuClick: function(menuNode) {
        this.drawer = false; 
        this.$router.push(menuNode.link);
      },
      setTitle: function () {
        this.title = this.$route.meta.title
      },
      onCloseCart: function () {
        this.showCartDialog = false
      }
    },
    watch: {
      '$route': 'setTitle'
    },
    mounted: function () {
      this.setTitle()
    }
}

</script>

<style>
.v-breadcrumbs__item {
  color: white !important
}

a.v-breadcrumbs__item {
  color: white !important
}

</style>