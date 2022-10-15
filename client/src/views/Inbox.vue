<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import { Api } from '../Api.js'

export default {
  data() {
    return {
      inbox: []
    }
  },
  async mounted() {
    try {
      const { data: rawServices } = await Api.get(`/v1/providers/${localStorage.loginId}/services`)
      const { data: requests } = await Api.get(`/v1/providers/${localStorage.loginId}/bookingRequests`)

      const todayStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0)
      const services = rawServices.reduce((map, s) => map.set(s._id, s), new Map())
      const inbox = new Map()

      function formatDate(date) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
      }

      for (const request of requests) {
        if (new Date(request.date) < todayStart) continue /** skip */

        request.service = services.get(request.serviceId)
        const date = formatDate(new Date(request.date))

        if (!inbox.has(date)) {
          inbox.set(date, [])
        }

        inbox.get(date).push(request)
      }

      this.inbox = [...inbox.entries()].sort(([aDate], [bDate]) => aDate > bDate ? 1 : -1).map(([date, requests]) => ({
        date,
        requests: requests.sort((a, b) => {
          if (a.response === b.response) return 0
          if (!a.response) return -1
          if (!b.response) return 1
          if (a.response === 'declined') return 1
          if (b.response === 'declined') return -1
          return 0
        })
      }))
    } catch (err) {
      const h = this.$createElement
      const vNodesMsg = h('p', [h('strong', `Something went wrong! ${String(err.response.data.message || err.message || '')}`)])
      this.$bvToast.toast([vNodesMsg], {
        toaster: 'b-toaster-bottom-right',
        variant: 'danger',
        solid: true,
        autoHideDelay: 30000,
        appendToast: true,
        noCloseButton: true
      })
    }
  },
  components: {
    SideBar,
    NavBar
  }
}
</script>

<template>
  <div class="dashboard">
    <SideBar />
    <main class="inbox">
      <NavBar isDashboard="true"/>
      <div class="content">
        <h2 class="title">Upcoming Requests</h2>
        <h5 v-if="inbox.length === 0" class="no-data">No upcoming requests</h5>
        <div v-else class="groups">
          <div v-for="group in inbox" :key="group.date" :id="group.date" class="group">
            <h3 class="date">Requests for {{group.date}}</h3>
            <div v-for="request in group.requests" :key="request._id" class="request">
              <div class="request-info">
                <h4 class="request-heading"><span>{{request.service.name}}</span><span class="service-price">・{{request.service.price}} SEK</span></h4>
                <span class="request-timeframe"><b-icon icon="clock" /> {{request.timePeriod}}</span>
                <span class="request-note">{{request.message}}</span>
                <span class="request-sender"><b-icon icon="person" /> {{request.user.name}}</span>
              </div>
              <div v-if="!request.response" class="request-actions">
                <span class="action"><b-icon icon="check2" /> Confirm</span>
                <span class="action secondary"><b-icon icon="x" /> Decline</span>
              </div>
              <div v-else class="request-actions">
                <span v-if="request.response === 'confirmed'" class="action disabled"><b-icon icon="check2" /> Confirmed</span>
                <span v-else-if="request.response === 'declined'" class="action secondary disabled"><b-icon icon="x" /> Declined</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.inbox {
  text-align: left;
}

.content {
  padding: 2rem;
  padding-top: 0;
}

.title {
  color: #0d9488;
  font-size: 2rem;

  margin: 0;
  margin-bottom: 2rem;
}

.no-data {
  font-style: italic;
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

.action:not(.disabled) {
  user-select: none;
  cursor: pointer;
}

.action {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  color: #f0fdfa;
  background-color: #0d9488;
  border: 1px solid #0d9488;

  transition: all 0.65s;
}

.action.secondary {
  color: unset;
  background-color: unset;
  border-color: #00000000;
}

.action:not(.disabled):hover {
  color: #0d9488;
  border-color: #ccfbf1;
  background-color: #ccfbf1;
}
</style>
