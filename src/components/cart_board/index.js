import tpl from './index.tpl'
import './index.scss'

import { CartItem } from './cart_item'
import { CartBar } from './cart_bar'
import { NoDataTip } from '../no_data_tip'

import { CartModel } from '../../models/cart'
import { DetailModel } from '../../models/detail'

import tools from '../../utils/tools'

class CartBoard {
    constructor(el) {
        this.name = 'cartBoard'
        this.$el = el
        this.cartModel = new CartModel()
        this.detailModel = new DetailModel()
        this.cartData = this.cartModel.getCartDatas()
        this.totalPrice = 0
        this.selectedItems = []
    }
    init() {
        this.initToTalPrice()
        this.initSelectedItems()
        this.render()
        this.bindEvent()
    }
    initToTalPrice() {
        if (this.cartData && this.cartData.length > 0) {
            this.cartData.forEach(item => {
                this.totalPrice += Number(item.price ? item.price : 899)
            })
        }
    }
    initSelectedItems() {
        if (this.cartData && this.cartData.length > 0) {
            this.selectedItems = this.cartData.map(item => {
                return item.cartId
            })
        }
    }
    render() {
        let html = ''
        if (this.cartData && this.cartData.length > 0) {
            const cartItem = new CartItem()
            const cartBar = new CartBar()

            let cartList = ''

            this.cartData.forEach(item => {
                cartList += cartItem.tpl(item)
            })

            html = tools.tplReplace(tpl(), {
                cartList,
                cartBar: cartBar.tpl(this.totalPrice)
            })
        } else {
            html = new NoDataTip().tpl('购物车空空如也')
        }
        this.$el.append(html)
    }
    bindEvent() {
        const $cartBoard = this.$el.find('.J_cartBoard')
        this.$totalPrice = $cartBoard.find('.J_totalPrice')
        $cartBoard.on('click', $.proxy(this.onCartBoardClick, this))
    }
    onCartBoardClick(ev) {
        const e = ev || window.event
        const tar = e.target || e.srcElement
        const $tar = $(tar)
        const className = tar.className

        let cartId = ''
        if (className === 'checkbox' || className === 'purchase-btn' || className === 'remove-btn') {
            cartId = $tar.attr('data-cartid')
        }
        switch (className) {
            case 'checkbox':
                const price = Number(this.cartData.filter(item => {
                    return item.cartId === cardId
                })[0].price)
                this.selectedItem(cartId, price, tar.checked)
                break
            case 'purchase-btn':
                this.purchaseItem(cartId)
                break
            case 'remove-btn':
                this.removeItem(cartId)
                break
            case 'total-purchase-btn':
                this.totalPurchase()
                break
            default:
                break
        }

    }
    selectedItem(cartId, price, checked) {
        if (checked) {
            this.totalPrice += price
            this.selectedItems.push(cartId)
        } else {
            this.totalPrice -= price
            this.selectedItems = this.selectedItems.filter(item => {
                return item != cartId
            })
        }
        this.$totalPrice.html(this.totalPrice)
    }

    purchaseItem(cartId) {
        const userPhoneInfo = this.cartData.filter(item => {
                return item.cardId === cartId
            })[0]
            // 购买后删除cartId
        delete userPhoneInfo.cardId

        this.detailModel.purchase(userPhoneInfo, true, () => {
            window.location.href = 'order.html'
        })
    }

    removeItem(cartId) {
        this.cartModel.removeData(cartId)
        this.selectedItems = this.selectedItems.filter(item => {
            return item !== cartId
        })
        window.location.reload()
    }

    totalPurchase() {
        const userPhoneInfos = []
        this.selectedItems.forEach(ele => {
            this.cartData.forEach(item => {
                if (item.cartId === ele) {
                    delete item.cartId
                    userPhoneInfos.push(item)
                }
            })
        })
        userPhoneInfos.forEach((userPhoneInfo) => {
            this.detailModel.purchase(userPhoneInfo, false);
        })
        window.location.href = 'order.html'
    }

}

export { CartBoard }