import firebase from 'firebase/app'
export default {
    actions: {
        async fetchCategory ({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`/user/${uid}/categories`).once('value')).val() || {} 
                const cats = []
                Object.keys(categories).forEach( key => {
                    cats.push({
                        title: categories[key].title,
                        id: key
                    })
                })
                return cats            
            } catch (e) {
                commit('setError', e)
                throw e  
            } 
        },
        async updateCategory({dispatch, commit}, {id, title}) {
            try{
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/user/${uid}/categories`).child(id).update({title})
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async deleteCategory({dispatch, commit}, {id}) {
            try{
                const uid = await dispatch('getUid')
                await (firebase.database().ref(`/user/${uid}/categories`).child(id)).remove()          
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async CreateCategory({dispatch, commit}, {title}) {
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`/user/${uid}/categories`).push({title}) 
                return {title, id: category.key}               
            } catch (e) {
                commit('setError', e)
                throw e  
            }          
        }
    }
}