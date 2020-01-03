<template>
  <div class='address'>
    <Header title="选择收货地址" :isLeft="true"></Header>
    <div class="city_search">
      <div class="search">
        <span class="city">
          {{city}}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等">
      </div>
      <Location :address="address"></Location>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Location from '../components/Location'
export default {
  name: 'address',
  components: {
    Header,
    Location
  },
  beforeRouteEnter (to, from, next) {
    console.log(to)
    next(vm => {
      vm.city = to.params.city
    })
  },
  computed: {
    address () {
      return this.$store.getters.location.formattedAddress
    }
  },
  data () {
    return {
      city: '', // 当前城市
      search_val: ''
    }
  }
}
</script>

<style lang="less" scoped>
.address{
  width:100%;
  height: 100%;
  overflow: hidden;
  padding-top:45px;
  .city_search {
    background-color: #fff;
    padding:10px 20px;
    color:#333;
    .search {
      background-color: #eee;
      height:40px;
      border-radius: 10px;
      box-sizing: border-box;
      line-height: 40px;
      .city {
        padding: 0 10px;
      }
      i{
        margin-right: 10px;
      }
      input{
        margin-left:5px;
        background-color: #eee;
        outline:none;
        border:none;
      }
    }
  }
}
</style>
