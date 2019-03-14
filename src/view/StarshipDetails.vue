<template>
<div>

  <v-flex xs12 style="margin-bottom: 50px;">
    <span class="headline"> Информация о космическом корабле </span>
  </v-flex>

  <v-layout row xs10>
    <v-flex xs2 md2>
      <v-text-field
        outline
        label="ID"
        v-model="id"
      ></v-text-field>
    </v-flex>
    &nbsp;
    <v-flex xs2 md2>
      <v-text-field
        outline
        label="Дата создания"
        v-model="details.created"
      ></v-text-field>
    </v-flex>
    &nbsp;
    <v-flex xs2>
      <v-text-field
        outline
        label="Дата изменения"
        v-model="details.edited"
      ></v-text-field>
    </v-flex>
  </v-layout>

  <v-flex xs10>
      <v-text-field
        outline
        label="Наименование"
        v-model="details.name"
      ></v-text-field>
  </v-flex>

  <v-flex xs10>
    <v-text-field
            outline
            label="Производитель"
            v-model="details.manufacturer"
    ></v-text-field>
  </v-flex>

  <!--<v-flex xs8>-->
    <!--<v-textarea-->
      <!--outline-->
      <!--name="input-7-4"-->
      <!--label="Текст"-->
      <!--:value=" details.message "-->
    <!--&gt;</v-textarea>-->
  <!--</v-flex>-->
  
</div>
</template>

<script>

import { dateTimeView } from '../module/filters'
let starshipService = require('../service/StarshipService');

export default {
  
  data () {

      return {
        details: {
            created: null,
            edited: null,
            name: null,
            manufacturer: null
        }
      }
  },

  props: {
    id: { 
      required: true,
    },
  },

  components: {
    
  },
  filters: {
    dateTimeView: dateTimeView
  },
  methods: {

    getDetails() {

        let view = this;

        starshipService.getOne(this.id).then(
            function (response) {

                view.details = response.data;
                view.details.created = dateTimeView(view.details.created)
                view.details.edited = dateTimeView(view.details.edited)

            }, function (error) {
                // handle error
                console.error(error)
        });
    }
    
  },
  created: function () {
      this.getDetails()
  }
}
</script>