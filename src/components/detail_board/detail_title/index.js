import tpl from './index.tpl'
import './index.scss'

import tools from '../../../utils/tools'

class DetailTitle {
    constructor() {
        this.name = 'detailTitle'
    }
    tpl(title) {
        return tools.tplReplace(tpl(), {
            title
        })
    }
}

export { DetailTitle }