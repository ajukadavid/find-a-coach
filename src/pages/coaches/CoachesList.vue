<template>
  <div>
  <base-dialog :show='!!error' title='An error occurred'>
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter='setFilters'></coach-filter>
  </section>
  <section>
  <base-card>
    <div class='controls'>
      <base-button mode='outline' @click='loadCoaches(true)'>Refresh</base-button>
      <base-button v-if='!isCoach && !isLoading' link to='/register'>Register as Coach</base-button>
    </div>
    <div v-if='isLoading'>
      <base-spinner></base-spinner>
    </div>
    <ul v-else-if='hasCoaches'>
      <coach-item
        v-for='coach in filteredCoaches'
        :key='coach.id'
        :id='coach.id'
        :first-name='coach.firstName'
        :last-name='coach.lastName'
        :rate='coach.hourlyRate'
        :areas='coach.areas'
      ></coach-item>
    </ul>
<h3 v-else>
  No coaches found.
</h3>
  </base-card>
  </section>
  </div>
</template>

<script>
import BaseDialog from '../../Components/ui/BaseDialog';
import CoachFilter from '../../Components/coaches/CoachFilter';
import CoachItem from '../../Components/coaches/CoachItem';
import BaseCard from '../../Components/ui/BaseCard';
import BaseButton from '../../Components/ui/BaseButton';
export default {
  components: { BaseButton, BaseCard, CoachItem, CoachFilter, BaseDialog},
  data(){
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    filteredCoaches(){
      const coaches =  this.$store.getters['coaches/coaches']

      return coaches.filter(coach => {
        if(this.activeFilters.frontend && coach.areas.includes('frontend')){
          return true
        }
        if(this.activeFilters.backend && coach.areas.includes('backend')){
          return true
        }
        return this.activeFilters.career && coach.areas.includes('career');

      })
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
      isCoach() {
        return this.$store.getters['coaches/isCoach']
      }
  },

  methods: {
    setFilters(updatedFilters) {
    this.activeFilters = updatedFilters
    },
   async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh});

      }catch(error){
        this.error = error.message || 'Something went wrong!'
      }
       this.isLoading = false
   }
  },
  created(){
    this.loadCoaches()
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

</style>