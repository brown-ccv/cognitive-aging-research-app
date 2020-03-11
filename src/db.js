import firebase from 'firebase/app'
import 'firebase/firestore'

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
const db = firebase.initializeApp(firebaseConfig).firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { db, TimeStamp, GeoPoint }
