import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    service
}

const getters = {
    checkoutStatus: state => state.checkoutStatus,
}

const actions = {
    checkout({commit, state}, products) {
        const savedCartItems = [...state.added]
        commit('setCheckoutStatus', null)
        // empty cart
        commit('setCartItems', {items: []})
        shop.buyProducts(
            products,
            () => commit('setCheckoutStatus', 'successful'),
            () => {
                commit('setCheckoutStatus', 'failed')
                // rollback to the cart saved before sending the request
                commit('setCartItems', {items: savedCartItems})
            }
        )
    }
}

const mutations = {
    pushProductToCart(state, {id}) {
        state.added.push({
            id,
            quantity: 1
        })
    }
}