<template>
  <el-table
    :data="posts"
    style="width: 100%"
  >
    <el-table-column
      prop="title"
      label="Название"
    />
    <el-table-column label="Дата">
      <template slot-scope="{row: { date }}">
        <i class="el-icon-time" />
        <span style="margin-left: 10px">{{ date | date('date') }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Просмотры">
      <template slot-scope="{row: { views }}">
        <i class="el-icon-view" />
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Комментарии">
      <template slot-scope="{row: { comments }}">
        <i class="el-icon-message" />
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Действия">
      <template slot-scope="{ row }">
        <el-tooltip effect="dark" content="Открыть пост" placement="top">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            @click="open(row._id)"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="Удалить пост" placement="top">
          <el-button
            icon="el-icon-delete"
            type="danger"
            circle
            @click="remove(row._id)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  async asyncData ({ store }) {
    const posts = await store.dispatch('post/fetchAdmin')
    return { posts }
  },
  methods: {
    open (id) {
      this.$router.push(`/admin/post/${id}`)
    },
    async remove (id) {
      try {
        await this.$confirm('Вы действительно хотите удалить пост?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отменить',
          type: 'warning'
        })
        await this.$store.dispatch('post/remove', id)
        this.posts = this.posts.filter(post => post._id !== id)
        this.$message.success('Пост удален')
      } catch (e) {}
    }
  },
  head () {
    return {
      title: `Все посты | ${process.env.appName}`
    }
  }
}
</script>
