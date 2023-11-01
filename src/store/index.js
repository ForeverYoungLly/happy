import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const url ="http://123.207.73.185:8080/postUserMessage"

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