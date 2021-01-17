import tpl from './index.tpl'
import './index.scss'

import tools from '../../../utils/tools'
class OrderItem {
    constructor() {
        this.name = 'orderItem'
    }
    tpl(data) {
        return tools.tplReplace(tpl(), {
            orderId: data.orderId,
            link: data.link,
            img: data.img,
            name: data.name,
            price: data.price ? data.price : 899,
            version: data.version,
            color: data.color
        })
    }
}
export { OrderItem }