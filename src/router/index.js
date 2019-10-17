import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Product from '../views/product'
import Category from '../views/category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/item/:productId',
      name: 'Product',
      component: Product
    }, {
      path: '/category/:categoryId',
      name: 'Category',
      component: Category
    }
  ]
})
