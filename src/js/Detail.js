import { App } from './App'

import { Header } from '../components/header'
import { DetailBoard } from '../components/detail_board'
import { Footer } from '../components/footer'

import tools from '../utils/tools'
import { DetailModel } from '../models/detail'


class Detail extends App {
    constructor($, app) {
        super($, app, {
            swiper: false,
            phone: true,
            field: true
        })
        this.phoneId = tools.getUrlQueryValue('id')
    }

    async render() {
        const data = await this.getPhoneInfo(this.phoneId)
        new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init()
        new DetailBoard(this.$app, data).init()
        new Footer(this.$app).init()
        $('body').prepend(this.$app)
    }

    getPhoneInfo(id) {
        const detailModel = new DetailModel()
        return detailModel.getPhoneInfo(id)
    }
}

new Detail(jQuery)