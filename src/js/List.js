import { App } from './App'

import { Header } from '../components/header'
import { Tab } from '../components/tab'
import { ShowBoard } from '../components/show_board'
import { Footer } from '../components/footer'

import tools from '../utils/tools'

class List extends App {
    constructor($, app) {
        super($, app, {
            swiper: false,
            phone: true,
            field: true
        })
        this.keyword = tools.getUrlQueryValue('keyword')
    }
    render() {
        const oTab = new Tab(this.$app, this.cache.phoneDatas, this.cache.fieldDatas)
        new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init()
        oTab.init()
        new ShowBoard(this.$app, this.cache.phoneDatas).init()
        new Footer(this.$app).init()

        $('body').prepend(this.$app)
    }
}

new List(jQuery)