<template>
  <div class="text_group">
    <!-- 输入框 -->
    <div class="input_group" :class="{'is-invalid':error}">
      <input :type="type"
      :value="value"
      :placeholder="placeholder"
      :name="name"
      @input="$emit('input',$event.target.value)">
      <!-- 输入框后面的按钮 -->
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
    </div>
    <!-- 错误提醒 -->
    <div v-if="error" class='invalid-feedback'>{{error}}</div>
  </div>
</template>

<script>
export default {
  name: 'inputGroup',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  }
}
</script>

<style lang="scss" scoped>
.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    height: 100%;
    width: 60%;
    outline: none;
    border:none;
  }
  button {
    border: none;
    outline: none;
    background: #fff;
  }
  button[disabled] {
    color: #aaa;
  }
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>
