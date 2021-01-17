import tpl from './tpl/board.tpl'
import itemTpl from './tpl/item.tpl'
import './index.scss'

import { NoDataTip } from '../no_data_tip'

import tools from '../../utils/tools'

class ShowBoard {
    constructor(el, phoneDatas) {
        this.name = 'showBoard'
        this.$el = el
        this.phoneDatas = phoneDatas
    }

    init() {
        this.render()
    }

    render() {
        this.$el.append(tools.tplReplace(tpl(), {
            list: this.makeList(this.phoneDatas) || new NoDataTip().tpl('未搜索到相关数据')
        }))
    }

    makeList(datas) {
        let list = ''
        datas.forEach((item, index) => {
            list += tools.tplReplace(itemTpl(), {
                id: item.id,
                isFisrt: index % 5 === 0 ? 'first' : '',
                phone_name: item.phone_name,
                pic: $.parseJSON(item.pics)[0][0][0],
                slogan: item.slogan.substr(0, 10),
                default_price: item.default_price
            })
        })
        return list
    }
}

export { ShowBoard }