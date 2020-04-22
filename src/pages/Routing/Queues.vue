<template>
  <div class="q-pa-md">
    <q-table :title="$t('queues.listing.title')" :data="queues" :columns="columns" row-key="name">
      <template v-slot:top-right>
        <q-btn color="primary" flat icon-right="mdi-refresh" no-caps @click="refresh" />
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: this.$t('queues.listing.column.name'),
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'division',
          required: true,
          label: this.$t('queues.listing.column.division'),
          align: 'left',
          field: row => row.division.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'members',
          required: true,
          label: this.$t('queues.listing.column.members'),
          align: 'left',
          field: row => row.memberCount,
          format: val => `${val}`,
          sortable: true
        }
      ]
    }
  },
  created() {
    this.$store.dispatch('app/updateTitleHeader', this.$t('queues.title'))
    this.fetchQueues({
      pageSize: 500,
      pageNumber: 1,
      sortBy: 'name',
      active: true // found at https://developer.mypurecloud.com/api/rest/client-libraries/ruby/latest/RoutingApi.html#get_queues
    })
  },
  computed: {
    ...mapState('queue', ['queues'])
  },
  methods: {
    ...mapActions('queue', ['fetchQueues', 'refreshQueues']),
    refresh() {
      this.$q.notify({
        message: this.$t('queues.refreshing'),
        color: 'primary',
        icon: 'mdi-emoticon-happy-outline',
        actions: [
          {
            label: this.$t('btn.dismiss'),
            color: 'white',
            handler: () => {
              /* ... */
            }
          }
        ]
      })

      this.refreshQueues()
    }
  }
}
</script>
