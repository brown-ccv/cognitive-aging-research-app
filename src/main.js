import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(VueReCaptcha, { siteKey: '6LfYQeEUAAAAAEeaM78FpwAD3VC_9zIQO_ybYwoa' })

// import nprogress css
import 'nprogress/nprogress.css'

// Global registration for components starting with Base
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

// FontAwesome icon registration

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,
  faExclamationCircle,
  faHome,
  faTachometerAlt,
  faUsers,
  faIdCard,
  faBars,
  faSignOutAlt,
  faSignInAlt,
  faAngleDoubleRight,
  faSort,
  faCaretLeft,
  faCaretRight,
  faFilter,
  faCalendar,
  faUserPlus,
  faNewspaper,
  faExternalLinkSquareAlt
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck)
library.add(faExclamationCircle)
library.add(faGoogle)
library.add(faHome)
library.add(faTachometerAlt)
library.add(faUsers)
library.add(faIdCard)
library.add(faBars)
library.add(faSignOutAlt)
library.add(faSignInAlt)
library.add(faAngleDoubleRight)
library.add(faSort)
library.add(faCaretRight)
library.add(faCaretLeft)
library.add(faFilter)
library.add(faCalendar)
library.add(faUserPlus)
library.add(faNewspaper)
library.add(faExternalLinkSquareAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

let app

const firebaseConfig = {
  apiKey: process.env['VUE_APP_FIRABASE_API_KEY'],
  authDomain: 'nassar-test.firebaseapp.com',
  databaseURL: 'https://nassar-test.firebaseio.com',
  projectId: 'nassar-test',
  storageBucket: 'nassar-test.appspot.com',
  messagingSenderId: process.env['VUE_APP_FIRABASE_MSG_SENDER_ID'],
  appId: process.env['VUE_APP_FIRABASE_API_ID']
}

// Get a Firestore instance
const init = firebase.initializeApp(firebaseConfig)
const db = init.firestore()

// Export types that exists in Firestore
const { TimeStamp, GeoPoint } = firebase.firestore
export { db, TimeStamp, GeoPoint }

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app')
  }
})
