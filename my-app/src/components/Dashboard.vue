<template>
    <div class="container mrgnbtm">
      <div class="d-block ml-auto mr-auto" :class="loading" v-if="loading.length"></div>
      <div v-else>
        <input type="text" class="form-control form-group" v-model="username" name="username" placeholder="Cuenta instagram">
        <button type="button" name="btn-username" class="btn btn-success form-group form-control" @click="getInsta()">Buscar</button>
        <div
            class="pt-3"
            v-show="result && typeof result === 'object' && Object.keys(result).length > 0">
          <b-table hover class="text-center" :items="result"></b-table>
        </div>
      </div>
      </div>
</template>

<script>

import { getInstagram } from '../services/UserService'

export default {
  name: 'Dashboard',
  components: {
  },
  data() {
      return {
        username: null,
        result: [],
        loading: false
      }
  },
  methods: {
    getInsta() {
      if(this.username === null || this.username.length < 1) return
      this.loading = 'loader'
      getInstagram(this.username).then(response => {
        console.log(response);
        this.loading = ''
        this.result = [response]
      })
    }
  },
}
</script>