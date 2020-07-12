/* eslint-disable*/
import firebase from 'firebase/app'
export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name, bill}) {
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`user/${uid}/info`).set({
                name,
                bill
            })
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout() {
            await firebase.auth().signOut()
            console.log('logout')
        }
    }
}