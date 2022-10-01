<script>
import SideBar from '@/components/SideBar.vue'

export default {
  data() {
    return {
      inbox: [
        {
          date: '1.10.',
          requests: [
            { service: 'Haircut man' },
            { service: 'Haircut woman' },
            { service: 'Haircut man' }
          ]
        },
        {
          date: '3.10.',
          requests: [
            { service: 'Dye man' },
            { service: 'Dye woman' },
            { service: 'Dye man' }
          ]
        },
        {
          date: '4.10.',
          requests: [
            { service: 'Haircut man' },
            { service: 'Haircut woman' },
            { service: 'Haircut man' }
          ]
        }
      ]
    }
  },
  components: {
    SideBar
  }
}
</script>

<template>
  <div class="dashboard">
    <SideBar />
    <main class="inbox">
      <h2 class="title">Upcoming Requests</h2>
      <div class="groups">
        <div v-for="group in inbox" :key="group.date" :id="group.date" class="group">
        <h3 class="date">Requests for {{group.date}}</h3>
        <div v-for="request in group.requests" :key="request.service" class="request">
          <div class="request-info">
            <h4 class="request-heading"><span>{{request.service}}</span><span class="service-price">・123 SEK</span></h4>
            <span class="request-timeframe"><b-icon icon="clock" /> Afternoon</span>
            <span class="request-note">My poor child finally grew out of his "furry-phase" please help him get back to normal again.</span>
            <span class="request-sender"><b-icon icon="person" /> Hannes Mannes</span>
          </div>
          <div class="request-actions">
            <span class="action"><b-icon icon="check2" /> Confirm</span>
            <span class="action secondary"><b-icon icon="x" /> Decline</span>
          </div>
        </div>
      </div>
      </div>
    </main>
  </div>
</template>

<style>
.inbox {
  padding: 2rem;
  text-align: left;
}

.title {
  color: #0d9488;
  font-size: 2rem;

  margin: 0;
  margin-bottom: 2rem;
}

.group {
  margin-bottom: 2rem;
}

.date {
  color: #115E59;
  font-size: 1.5rem;

  margin: 0;
  margin-bottom: 0.5rem;
}

.request {
  padding: 1rem;
  margin-bottom: 0.5rem;

  display: flex;
  justify-content: space-between;

  /* box-shadow: 1px 1px 3px lightgray; */
  background-color: whitesmoke;
  border-radius: 0.5rem;
}

.request-info {
  display: flex;
  flex-direction: column;
}

.request-heading {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;

  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 0.25rem;
}

.service-price {
  font-size: 1rem;
}

.request-note {
  font-style: italic;
  margin: 0.75rem 0;
}

.request-actions {
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
}

.action {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  color: #f0fdfa;
  background-color: #0d9488;
  border: 1px solid #0d9488;

  transition: all 0.65s;
  user-select: none;
  cursor: pointer;
}

.action.secondary {
  color: unset;
  background-color: unset;
  border-color: #00000000;
}

.action:hover {
  color: #0d9488;
  border-color: #ccfbf1;
  background-color: #ccfbf1;
}
</style>
