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

    <el-upload
      ref="upload"
      class="mb"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        Перетащите изображение<em> или нажмите</em>
      </div>
      <div slot="tip" class="el-upload__tip">
        файлы jpg/png до 500kb
      </div>
    </el-upload>

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
      image: null,
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
    handleImageChange (file, fileList) {
      this.image = file.raw
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.image) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image
          }
          try {
            await this.$store.dispatch('post/create', formData)
            this.controls.title = ''
            this.controls.text = ''
            this.image = null
            this.$refs.upload.clearFiles()
            this.$message.success('Пост создан')
          } catch (e) {
            console.log('Error create post', e)
          } finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Форма не валидна')
        }
      })
    }
  },
  head () {
    return {
      title: `Новый пост | ${process.env.appName}`
    }
  }
}
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>
