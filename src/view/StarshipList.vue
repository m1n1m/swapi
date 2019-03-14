<template>
    <div>
        <v-toolbar>
            <v-flex xs12 sm6 md3>
                <v-text-field
                        style="padding-left: 20px; width: 400px;"
                        hide-details
                        prepend-icon="search"
                        :append-icon="searchAppendIcon"
                        :append-icon-cb="clearSearch"
                        single-line
                        :full-width="false"
                        v-model="searchString"
                        @input="onSearch"
                ></v-text-field>
            </v-flex>
        </v-toolbar>
        <v-flex xs12 sm12 md12>
            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="dataList"
                    :loading="tablePending"
                    item-key="id"
                    class="elevation-5 fixed-header"
                    hide-actions
                    :pagination.sync="pagination"
            >
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="props">
                    <tr style="cursor: pointer" @dblclick="rowClick(props.item)" @click.prevent='rowClick(props.item)'>
                        <td class="text-xs-left small"> {{ props.item.name }}</td>
                    </tr>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination
                        v-model="currentPage"
                        :length="countPages"
                        @input="onPageChange"
                        value="pagination.page"
                ></v-pagination>
            </div>
        </v-flex>
    </div>
</template>

<script>

    import {dateTimeView} from '../module/filters'
    let starshipService = require('../service/StarshipService');

    export default {
        data() {

            return {
                queryParams: {
                    page: 1,
                    search: null
                },
                currentPage: 1,
                rowsPerPage: 0,
                totalItems: 0,
                countPages: 0,
                searchString: null,
                searchAppendIcon: '',
                tablePending: true,
                pagination: {},
                selected: [],
                headers: [
                    {text: 'Наименование', value: 'name'},
                ],
                dataList: []
            }
        },
        computed: {

        },
        components: {},
        filters: {
            dateTimeView: dateTimeView
        },
        methods: {

            clearSearch: function() {
                this.searchString = null;
                this.onSearch()
            },
            onSearch () {
                if (this.searchString != null && this.searchString.length > 0) {
                    this.searchAppendIcon = 'close'
                } else {
                    this.searchAppendIcon = ''
                }

                this.queryParams.search = this.searchString;
                this.getShips()
            },

            calculatePagesCount() {
                if (this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                ) return 0;

                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            },

            onPageChange(page) {
                this.currentPage = page;
                this.queryParams.page = page;
                this.getShips()
            },

            rowClick(starship) {
                let id = starshipService.getId(starship);
                this.$router.push({path: `/starship/${id}`})
            },

            updateTableData(data) {
                this.dataList = data.results;

                // обновить данные пагинации (дибильный API)
                if (data.previous == null) {
                    this.rowsPerPage = data.results.length;
                    this.totalItems = data.count;
                    this.pagination.rowsPerPage = this.rowsPerPage;
                    this.pagination.totalItems = this.totalItems;
                    this.countPages = this.calculatePagesCount();
                }

                this.pagination.rowsPerPage = this.rowsPerPage;
                this.pagination.totalItems = this.totalItems;

                this.tablePending = false;
            },

            getShips() {

                let view = this;
                view.tablePending = true;

                let params = this.queryParams;

                if (params.search === null) {
                    delete params.search;
                }

                if (params.page === 1) {
                    delete params.page;
                }

                starshipService.getAll(this.queryParams).then(
                    function (response) {

                        view.updateTableData(response.data);

                    }, function (error) {
                        console.error(error);
                        view.tablePending = false
                    });
            }
        },
        created: function () {
            this.getShips()
        }
    }
</script>

<style scope>

    table.table tbody td.small, table.table tbody th.small {
        height: 30px;
    }

</style>
