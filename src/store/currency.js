export default {
    actions: {
        async getCurrency() {
            try{
                let rateUSD = [];
                const curUSD = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json')
                rateUSD = await curUSD.json()
                return rateUSD[0]
            }catch(e) {
                console.log('err')
                throw e
            }
        }
    }
}