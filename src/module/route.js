import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import BasicPageComponent from '../view/BasicPage.vue'
import NotFound404Component from '../view/NotFound404.vue'
import StarShipList from '../view/StarshipList.vue'
import StarshipDetails from '../view/StarshipDetails.vue'

const ifAuthenticated = (to, from, next) => {
    next();
};

export default new VueRouter({
  routes: [
    { path: '*', redirect: '/404' },
    { path: '/404', component: NotFound404Component },
    {
      path: '/',
      component: BasicPageComponent,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/starship',
      component: BasicPageComponent,
      beforeEnter: ifAuthenticated,
      meta: {
        bcTitle: 'Космические корабли',
        title: 'Космические корабли'
      },
      children: [
        {
          path: 'list',
          component: StarShipList,
          meta: {
            bcTitle: 'Список',
            title: 'Список'
          }
        },
        {
          path: ':id',
          component: StarshipDetails,
          props: true,
          meta: {
            bcTitle: 'Информация о корабле',
            title: 'Информация о космическом корабле'
          }
        }
      ]
    }
  ]
})