import tpl from './index.tpl'
import './index.scss'

import { OrderItem } from './order_item'
import { NoDataTip } from '../no_data_tip'

import { OrderModel } from '../../models/order'

import tools from '../../utils/tools'

class OrderBorad {
    constructor(el) {
        this.name = 'orderBoard'
        this.$el = el
        this.orderModel = new OrderModel()
        this.purchaseData = this.orderModel.getPurchaseDatas()
    }
    init() {
        this.render()
    }
    render() {
        let html = ''
        if (this.purchaseData && this.purchaseData.length > 0) {
            const orderItem = new OrderItem()
            let orderList = ''
            this.purchaseData.forEach(item => {
                orderList += orderItem.tpl(item)
            })
            html = tools.tplReplace(tpl(), {
                orderList
            })
        } else {
            html = new NoDataTip().tpl('您还没有任何订单')
        }
        this.$el.append(html)
    }
}

export { OrderBorad }