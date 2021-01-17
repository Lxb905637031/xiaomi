import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class CartItem {
    constructor() {
        this.name = 'cartItem';
    }

    tpl(data) {
        return tools.tplReplace(tpl(), {
            cartId: data.cardId,
            link: data.link,
            img: data.img,
            name: data.name,
            price: data.price ? data.price : 899,
            version: data.version,
            color: data.color
        });
    }
}

export { CartItem };