import _ from 'lodash'
export default {
    data: () => ({
        page: 1,
        pageSize: 10,
        items: [],
        pageMax: 0,
        allItems: [] 
    }),
    methods: {
        PageHandler(page) {
            this.items = this.allItems[page - 1] || this.allItems[0]           
        },
        paginationSetup(itm) {
            this.allItems = _.chunk(itm, this.pageSize)
            this.pageMax = _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        }
    }    
    
}