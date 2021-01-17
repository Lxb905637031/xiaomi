import { App } from './App'

import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { OrderBorad } from '../components/order_board'

class Order extends App {
    constructor($, app) {
        super($, app, {
            swiper: false,
            phone: true,
            field: true
        })
    }
    render() {
        new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init()
        new OrderBorad(this.$app).init()
        new Footer(this.$app).init()
        $('body').prepend(this.$app)
    }
}

new Order(jQuery)