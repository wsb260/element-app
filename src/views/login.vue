<template>
  <div class='login'>
    <div class="logo">
        <img src="../assets/logo.jpg" alt="login" >
    </div>
    <!-- 手机号 -->
    <InputGroup type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode">
    </InputGroup>
    <!-- 验证码 -->
    <InputGroup type="number"
      v-model="verifyCode"
      placeholder="验证码"
      :error="errors.code">
    </InputGroup>
    <!-- 用户服务协议 -->
    <div class="login_des">
      新用户登录即自动注册，表示已同意
      <span>《用户服务协议》</span>
    </div>
    <!-- 登录按钮 -->
     <div class="login_btn">
      <button :disabled="isClick" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup'
export default {
  name: 'login',
  components: {
    InputGroup
  },
  data () {
    return {
      phone: '',
      verifyCode: '',
      errors: {},
      btnTitle: '获取验证码',
      disabled: false
    }
  },
  computed: {
    isClick () {
      if (!this.phone || !this.verifyCode) return true
      else return false
    }
  },
  methods: {
    getVerifyCode () {
      if (this.validatePhone()) { // 验证手机号是否合法
        // 发送请求
        this.validateBtn()
        this.$axios.post('/api/posts/sms_send', {
          sid: '',
          token: '',
          appid: '',
          templateid: '',
          phone: this.phone
        }).then(res => {
          console.log(res)
        })
      }
    },
    validateBtn () {
      let time = 60
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.btnTitle = '获取验证码'
          this.disabled = false
        } else {
          this.btnTitle = time + '秒后重试'
          this.disabled = true
          time--
        }
      }, 1000)
    },
    validatePhone () {
      // 验证手机号码
      if (!this.phone) {
        this.errors = {
          phone: '请填写正确的手机号码'
        }
        return false
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: '请填写正确的手机号码'
        }
        return false
      } else {
        this.errors = {}
        return true
      }
    },
    handleLogin () {
      // 取消错误提醒
      this.errors = {}
      // 接口验证
      this.$axios.post('/api/posts/sms_back', {
        phone: this.phone,
        code: this.verifyCode
      }).then(res => {
        localStorage.setItem('ele_login', true)
        this.$router.push('/')
      }).catch(err => {
        this.errors = {
          code: err.response.data.msg
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>
