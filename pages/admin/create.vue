<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h1 class="mb">
      Создание нового поста
    </h1>

    <el-form-item label="Название поста" prop="title">
      <el-input
        v-model="controls.title"
      />
    </el-form-item>

    <el-form-item label="Текст в формате .md или .html" prop="text">
      <el-input
        v-model="controls.text"
        type="textarea"
        resize="none"
        rows="10"
      />
    </el-form-item>

    <el-button class="mb" type="success" plain @click="previewDialog = true">
      Предпросмотр
    </el-button>

    <el-dialog
      title="Предпросмотр"
      :visible.sync="previewDialog"
    >
      <div :key="controls.text">
        <vue-markdown>{{ controls.text }}</vue-markdown>
      </div>
    </el-dialog>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Создать пост
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  data () {
    return {
      previewDialog: false,
      loading: false,
      controls: {
        titlle: '',
        text: ''
      },
      rules: {
        title: [
          { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            text: this.controls.text
          }
          try {
            await this.$store.dispatch('post/create', formData)
            this.controls.title = ''
            this.controls.text = ''
            this.$message.success('Пост создан')
          } catch (e) {
            console.log('Error create post', e)
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>
