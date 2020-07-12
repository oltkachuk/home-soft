import firebase from 'firebase/app'
export default{
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info

        },
        clearInfo(state) {
            state.info = {}
        }
    },
    getters: {
        info: state => state.info
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try{
                const uid = await dispatch('getUid')
                const inf = await firebase.database().ref(`user/${uid}/info`).once('value')
                const info = inf.val()
                commit('setInfo', info)
                
            }catch(e) {
                console.log('error')
                throw e
            }
        },
        async updateBill({dispatch, commit, getters}, toUpdate) {
            try {
                const UpdateData = {...getters.info, ...toUpdate}
                const uid = await dispatch('getUid')
                await firebase.database().ref(`user/${uid}/info`).update(UpdateData)
                commit('setInfo', UpdateData)
            } catch(e) {
                console.log('er')
            }
        }

    }
}