<template>
  <div>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data='saveData'></coach-form>
    </base-card>

  </section>
  </div>
</template>

<script>
import CoachForm from '../../Components/coaches/CoachForm';
export default {
  components: {
    CoachForm
  },

  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches')
    }
  }
}

</script>
<style scoped>

</style>