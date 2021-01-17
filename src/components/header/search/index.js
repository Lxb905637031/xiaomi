import tpl from './index.tpl'
import './index.scss'

import tool from '../../../utils/tools'

class Search {
    constructor() {
        this.name = 'search'
        this.tpl = tpl
    }
    searchPhone(e) {
        const data = e.data
        const $searchForm = $('#J_searchForm')
        const $searchInput = $('#J_keyword')

        const keyoword = tool.trimSpaces($searchInput.val())
        const action = $searchForm.prop('action')
        const keywordLen = keyword.length

        if (keywordLen > 0) {
            window.open(action + '?keyword=' + keyoword)
        }
    }
}

export { Search }