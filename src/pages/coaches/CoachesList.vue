<template>
  <section>
    <coach-filter @change-filter='setFilters'></coach-filter>
  </section>
  <base-card>
  <section>
    <div class='controls'>
      <base-button mode='outline' @click='loadCoaches'>Refresh</base-button>
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
  </section>
  </base-card>
</template>

<script>
import CoachFilter from '../../Components/coaches/CoachFilter';
import CoachItem from '../../Components/coaches/CoachItem';
import BaseCard from '../../Components/ui/BaseCard';
import BaseButton from '../../Components/ui/BaseButton';
export default {
  components: { BaseButton, BaseCard, CoachItem, CoachFilter},
  data(){
    return {
      isLoading: false,
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
   async loadCoaches() {
      this.isLoading = true;
     await this.$store.dispatch('coaches/loadCoaches');
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