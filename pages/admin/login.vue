<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}"
  >
    <el-form
      ref="form"
      :model="controls"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <h2>Войти в панель администратора</h2>

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
          Войти
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: 'empty',
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
  mounted () {
    const { message } = this.$route.query

    switch (message) {
      case 'login':
        this.$message.info('Сначала войдите в систему')
        break
      case 'logout':
        this.$message.success('Вы вышли из системы')
        break
      case 'session':
        this.$message.warning('Время сессии истекло, пожалуйста залогиньтесь')
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
            await this.$store.dispatch('auth/login', formData)
            this.$router.push('/admin')
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  },
  head () {
    return {
      title: `Вход в панель администратора | ${process.env.appName}`
    }
  }
}
</script>
