<template>
  <div>
    <h1>Аналитика по постам</h1>
    <app-analytics-chart
      title="Количество просмотров"
      :labels="views.labels"
      :data="views.data"
    />
    <app-analytics-chart
      title="Количество комментариев"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
import AppAnalyticsChart from '@/components/admin/AnalyticsChart'
export default {
  components: { AppAnalyticsChart },
  async asyncData ({ store }) {
    const { views, comments } = await store.dispatch('post/getAnalytics')
    return { views, comments }
  },
  layout: 'admin',
  middleware: ['admin-auth'],
  head () {
    return {
      title: `Аналитика | ${process.env.appName}`
    }
  }
}
</script>
