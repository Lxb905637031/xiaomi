import tpl from './index.tpl'
import './index.scss'

import { Logo } from './logo/index'
import { Nav } from './nav/index'
import { Search } from './search/index'

import tools from '../../utils/tools'

class Header {
    constructor(el, fieldDatas, phoneDatas) {
        this.name = 'header'
        this.$el = el
        this.fieldDatas = fieldDatas
        this.phoneDatas = phoneDatas
        this.logo = new Logo()
        this.nav = new Nav()
        this.search = new Search()
    }

    async init() {
        await this.render()
        this.bindEvent()
    }

    async render() {
        await this.$el.append(tools.tplReplace(tpl(), {
            logo: this.logo.tpl(),
            nav: this.nav.tpl(this.fieldDatas),
            search: this.search.tpl()
        }))
    }

    bindEvent() {
        const $searchBtn = $('.J_searchBtn')
        const $nav = $('.J_nav')

        $searchBtn.on('click', this.search.searchPhone)
        $nav.on('mouseenter', '.nav-item', { phoneDatas: this.phoneDatas, nav: this.nav }, this.nav.navMenuMouseIn)
    }
}

export { Header }