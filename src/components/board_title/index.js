import tpl from './index.tpl'
import './index.scss'

import tools from '../../utils/tools'

class BoardTitle {
    constructor(el, title) {
        this.name = 'boardTitle'
        this.$el = el
        this.title = title
    }

    init() {
        this.render()
    }

    render() {
        this.$el.append(tools.tplReplace(tpl(), {
            title: this.title
        }))
    }
}

export { BoardTitle }