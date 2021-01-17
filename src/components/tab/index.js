import tpl from './tpl/wrapper.tpl'
import itemTpl from './tpl/item.tpl'
import './index.scss'

import { ShowBoard } from '../../components/show_board'
import { NoDataTip } from '../../components/no_data_tip'

import tools from '../../utils/tools'

class Tab {
    constructor(el, phoneDatas, fieldDatas) {
        this.name = 'tab'
        this.$el = el
        this.phoneDatas = phoneDatas
        this.fieldDatas = fieldDatas
        this.noDataTip = new NoDataTip()

        this.cache = {}
    }
    async init() {
        await this.render()
        this.bindEvent()
    }

    async render() {
        let list = ''
        this.fieldDatas.map(item => {
            list += tools.tplReplace(itemTpl(), {
                field: item.field,
                series_name: item.series_name
            })
        })
        await this.$el.append(tools.tplReplace(tpl(), { list }))
    }

    bindEvent() {
        const $tab = $('.J_tab')
        const $board = $('.J_board')
        const $searchInput = $('#J_search')
        const oShowBoard = new ShowBoard()

        $tab.on('click', '.tab-item', {
            $board,
            oShowBoard
        }, $.proxy(this.tabClick, this))

        $searchInput.on('input', {
            $board,
            oShowBoard,
            $tab
        }, tools.throttle($.proxy(this.inputSearch, this), 1000))
    }

    tabClick(e) {
        const data = e.data
        const $board = data.$board
        const oShowBoard = data.oShowBoard
        const tar = e.target
        const $tar = $(tar)
        const tagName = tar.tagName.toLowerCase()

        if (tagName === 'a') {
            const field = $tar.attr('data-field')
            this.tabChange($tar)
            this.appendList(field, $board, oShowBoard)
        }
    }

    tabChange($target) {
        $target.parent().addClass('current')
            .siblings().removeClass('current')
    }

    inputSearch(e) {
        const data = e.data
        const $board = data.$board
        const $tab = data.$tab
        const oShowBoard = data.oShowBoard
        const $tar = $(e.target)
        const value = tools.trimSpaces($tar.val())
        const len = value.length

        this.tabChange($tab.find('.all'))
        if (len <= 0) {
            this.appendList('all', $board, oShowBoard)
        } else {
            this.appendList('all', $board, oShowBoard, value)
        }
    }

    appendList(field, $board, oShowBoard, keyword) {
        if (keyword) {
            let data = this.filterDatas(this.phoneDatas, field, keyword)
            const len = data.length
            if (len === 0) {
                $board.html(this.noDataTip.tpl('未搜索到相关数据'))
            } else {
                $board.html(oShowBoard.makeList(data))
            }
        } else {
            if (!this.cache[field]) {
                this.cache[field] = oShowBoard.makeList(this.filterDatas(this.phoneDatas, field))
            }
            $board.html(this.cache[field])
        }
    }

    filterDatas(datas, field, keyword) {
        return datas.filter((item, idx) => {
            if (keyword) {
                const phone_name = item.phone_name.toLowerCase()
                const slogan = item.slogan.toLowerCase()
                keyword = keyword.toLowerCase()
                return phone_name.includes(keyword) || slogan.includes(keyword)
            } else {
                switch (field) {
                    case 'all':
                        return true
                        break
                    default:
                        return item.field === field
                        break
                }
            }
        })
    }
}

export { Tab }