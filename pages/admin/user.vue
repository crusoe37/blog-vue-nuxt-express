<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h2>Создать пользователя</h2>

    <el-form-item label="Логин" prop="login">
      <el-input v-model="controls.login" />
    </el-form-item>

    <div class="mb2">
      <el-form-item label="Пароль" prop="password">
        <el-input
          v-model="controls.password"
          type="password"
        />
      </el-form-item>
    </div>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Создать
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
      loading: false,
      controls: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          { required: true, message: 'Введите логин', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          { min: 6, message: 'Не менее 6 символов', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log('valid')
          this.loading = true

          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            }
            await this.$store.dispatch('auth/createUser', formData)
            this.$message.success('Новый пользователь добавлен')

            this.controls.login = ''
            this.controls.password = ''
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  },
  head () {
    return {
      title: `Создать пользователя | ${process.env.appName}`
    }
  }
}
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>
