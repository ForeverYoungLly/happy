import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store( 
  {
    state:
    { 
    // 存放用户列表
      UserList:[]
    },
    mutations:{
      //修改用户列表
     editUserList(state,newUserList){
        state.UserList = newUserList
      }
    }
  }
  )
export  default store