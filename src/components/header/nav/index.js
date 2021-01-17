import navTpl from './tpl/nav.tpl'
import navItemTpl from './tpl/nav_item.tpl'
import './index.scss'

import { NavMenu } from './nav_menu/index'

import tools from '../../../utils/tools'

class Nav {
    constructor() {
        this.name = 'headerNav'
        this.navMenu = new NavMenu()
        this.htmlCache = {}
    }
    tpl(data) {
        let list = ''
        data.forEach((item, index) => {
            list += tools.tplReplace(navItemTpl(), {
                field: item.field,
                seriesName: item.series_name
            })
        })
        return tools.tplReplace(navTpl(), {
            navItem: list,
            navMenu: this.navMenu.tpl()
        })
    }

    navMenuMouseIn(e) {
        const phoneDatas = e.data.phoneDatas
        const oNav = e.data.nav

        const field = $(this).attr('data-field')
        const $navMenu = $('.J_navMenu')

        if (!oNav.htmlCache[field]) {
            oNav.htmlCache[field] = oNav.navMenu.appendMenuCards(phoneDatas.filter(item => {
                return item.field === field
            }))
        }
        $navMenu.html(oNav.htmlCache[field])
    }
}

export { Nav }