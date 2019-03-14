import Vue from 'vue'

const API_URL = "https://swapi.co/api/starships/";

export function getAll(params) {

    let config = {
        params: params
    };

    return Vue.http.get(API_URL, config);
}

export function getOne(id) {
    return Vue.http.get(API_URL + id);
}

export function getId(starship) {
    return starship.url.replace(API_URL, "").replace("/", "");
}


