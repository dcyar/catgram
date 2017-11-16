<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <div class="mdl-cell mdl-cell--6-col-desktop mdl-cell--3-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--12-col-phone mdl-cell--0-offset">
          <template v-if="!loading">
            <div class="mdl-spinner mdl-js-spinner is-active"></div>
          </template>
          <template v-if="loading">
            <div class="card-image__picture">
              <img :src="this.catUrl" />
            </div>
          </template>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--12-col">
        <div class="mdl-cell mdl-cell--6-col-desktop mdl-cell--3-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--12-col-phone mdl-cell--0-offset">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
            <input id="username" v-model="title" type="text" class="mdl-textfield__input" />
            <label for="username" class="mdl-textfield__label">Describe me</label>
          </div>
          <div class="actions">
            <a @click.prevent="postCat" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
              POST A CAT
            </a>
            <a @click.prevent="loadingCat" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              RELOAD
            </a>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import parse from 'xml-parser';

  export default {
    data() {
      return {
        catUrl: null,
        title: null,
        loading: false,
      };
    },
    mounted() {
      this.loadingCat();
    },
    methods: {
      loadingCat() {
        this.loading = false;
        this.$http.get('https://thecatapi.com/api/images/get?format=xml&results_per_page=1').then((response) => {
          this.catUrl = parse(response.body).root.children['0'].children['0'].children['0'].children['0'].content;
          this.loading = true;
        }).catch((err) => {
          console.log(`Error: ${err}`);
        });
      },
      postCat() {
        this.$root.$firebaseRefs.cat.push(
          {
            url: this.catUrl,
            comment: this.title,
            info: 'Posted by Charles on Tuesday',
            created_at: -1 * new Date().getTime(),
          })
          .then(this.$router.push('/'));
      },
    },
  };
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
  .card-image__picture img {
    width: 100%;
  }
</style>