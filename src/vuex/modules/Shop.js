import Vue from "vue"

import {
  GET_SHOP_MSG, ADD_FOOD_COUNT, SUB_FOOD_COUNT, EMPTYSHOPCAR
} from '../mutation-type'
import { reqShopMsg } from '../../api/index';
import { getFoodCar } from "../../utils/index.js"



export default {
  state: {
    shopMsg: {},
    shopCar: [],

  },
  mutations: {
    [GET_SHOP_MSG](state, {shopMsg, shopCar}) {
      state.shopMsg = shopMsg;
      state.shopCar = shopCar
    },
    [ADD_FOOD_COUNT](state, food) {
      if (food.count) {
        food.count++;
      } else {
        Vue.set(food, "count", 1)
        state.shopCar.push(food);
      }
      // console.log(state.shopCar);
    },
    [SUB_FOOD_COUNT](state, food) {
      if (food.count) {
        food.count--;
        food.count === 0 && state.shopCar.splice(state.shopCar.indexOf(food), 1);
      }
    },
    [EMPTYSHOPCAR](state) {
      state.shopCar.forEach((food) => {
        food.count = 0;
      })
      state.shopCar = []
      // console.log(state.shopCar);
    }
  },
  actions: {
    async getShopMsg({ commit },id) {
      // 注意shopMsg是一个含有数据data和状态码code的对象
      const shopMsg = await reqShopMsg(id);
      const shopCar = getFoodCar(shopMsg.data);
      // console.log(shopCar);
      if (!shopMsg.code) {
        commit(GET_SHOP_MSG,{ shopMsg: shopMsg.data, shopCar})
      }
    },

    changeFoodCount({ commit }, { isAdd, food }) {
      if (isAdd) {
        commit(ADD_FOOD_COUNT, food);
      } else {
        commit(SUB_FOOD_COUNT, food);
      }
    },
    
  },
  getters: {
    totalPrice(state) {
      return state.shopCar.reduce((pre, val) => pre + val.count * val.price, 0)
    },
    totalCount(state) {
      return state.shopCar.reduce((pre, val) => pre + val.count, 0)
    },
  }
}