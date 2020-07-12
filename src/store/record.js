import firebase from 'firebase/app'

export default {
    actions: {
        async createRecord({dispatch}, record) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/user/${uid}/record`).push(record)
            } catch(e) {
                console.log('err')
                throw (e)
            }
        },
        async fetchRecords ({dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/user/${uid}/record`).once('value')).val() || {} 
                const rec = []
                Object.keys(records).forEach( key => {
                    rec.push({
                        CatId: records[key].catName,
                        date: records[key].date,
                        description: records[key].description,
                        summ: records[key].summ,
                        type: records[key].type,
                        id: key
                    })
                })
                return rec            
            } catch (e) {
                console.log('error')
                throw e  
            } 
        },
        async deleteRecord({dispatch, commit}, {CategoryId}) {
            try{
                let record = []
                record = await dispatch('fetchRecords')
                let NewBill = 0
                for (let i = 0; i < record.length; i++) {
                    if ( record[i].CatId === CategoryId ) {
                        await dispatch('deleteOnlyRecord', {
                            recordId: record[i].id,
                            recordType: record[i].type,
                            recordSum: record[i].summ
                        })
                    }
                }
                console.log('OK', NewBill)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async deleteOnlyRecord({dispatch, commit, getters}, {recordId, recordType, recordSum}) {
            try {
                const uid = await dispatch('getUid')
                let NewBill = 0
                recordType === 'income'
                    ? NewBill = getters.info.bill - recordSum
                    : NewBill = getters.info.bill + recordSum
                let bill = NewBill > 0 
                    ? NewBill
                    : 0        
                await dispatch('updateBill', {bill})
                await (firebase.database().ref(`/user/${uid}/record`).child(recordId)).remove()
            } catch (e) {
                commit('setError', e)
                throw e
            }

        }
    }
}