<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h1>Добавить комментарий</h1>

    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model="controls.name" />
    </el-form-item>

    <el-form-item label="Текст" prop="text">
      <el-input
        v-model="controls.text"
        type="textarea"
        resize="none"
        :rows="2"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Добавить комментарий
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      controls: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: 'Введите имя', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Введите ваш комментарий', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: ''
          }

          console.log('!!!!!!', formData)

          try {
            setTimeout(() => {
              this.$message.success('Комментарий добавлен')
              this.$emit('created')
            }, 1500)
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
