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
    <div class="area">
      <ul class="area_list" v-for="(item,index) in areaList" :key="index">
        <li>
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Location from '../components/Location'
import AMap from 'AMap'
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
      search_val: '', // 搜索内容
      areaList: []
    }
  },
  watch: {
    search_val () {
      this.searchPlace()
    }
  },
  methods: {
    searchPlace () {
      AMap.plugin('AMap.Autocomplete', () => {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: this.city
        }
        // eslint-disable-next-line no-debugger
        var autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(this.search_val, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          this.areaList = result.tips
        })
      })
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
  .area {
    margin-top:16px;
    background-color: #fff;
    li{
      border-bottom: 1px solid #eee;
      padding:8px 16px;
      color:#aaa;
      h4{
        font-weight: bold;
        color:#333;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
