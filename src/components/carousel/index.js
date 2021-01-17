import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import indicatorTpl from './tpl/indicator.tpl';
import controlTpl from './tpl/control.tpl';
import './index.scss';

import tools from '../../utils/tools';

class Carousel {
  constructor (el, data) {
  	this.name = 'carousel';
  	this.$el = el;
  	this.data = data;
  	this.dataLen = this.data.length;
  	this.curIdx = 0;
  }

  async init () {
    await this.render();
    this.bindEvent();
    this.autoPlay();
  }

  async render () {
    await this.$el.append(tools.tplReplace(tpl(), {
    	list: this.renderList(),
    	indicator: this.renderIndicator(),
    	control: controlTpl(),
    	indicatorW: 18 * this.dataLen
    }));

    this.$carousel = $('.J_carousel'),
  	this.$carItems = this.$carousel.find('.car-item'),
  	this.$carIndicators = this.$carousel.find('.indicator-item');
  }

  autoPlay () {
    Carousel.timer = setInterval($.proxy(this.run.bind(this, 'next'), this), 3000);
  }

  run (dir) {
  	switch (dir) {
  		case 'next':
  		  if (this.curIdx >= this.dataLen - 1) {
		  		this.curIdx = 0;
		  	} else {
		  		this.curIdx ++;
		  	}
		  	break;
		  case 'prev':
		    if (this.curIdx === 0) {
		    	this.curIdx = this.dataLen - 1;
		    } else {
		    	this.curIdx --;
		    }
		    break;
		  default:
		    break;
  	}

  	this.fadeAction(this.curIdx);
  }

  renderList () {
  	let list = '';

    this.data.forEach((item, idx) => {
      list += tools.tplReplace(itemTpl(), {
        swiper_img: item.pic,
        alt: item.alt,
        isActive: idx === 0 ? 'active' : ''
      });
    });

    return list;
  }

  renderIndicator () {
  	let list = '';

  	for (var i = 0; i < this.dataLen; i ++) {
  		list += tools.tplReplace(indicatorTpl(), {
  			isCurrent: i === 0 ? 'current' : ''
  		});
  	}

  	return list;
  }
 
  bindEvent () {
    this.$carousel.on('click', $.proxy(this.carouselClick, this));
    this.$carousel.on('mouseenter', $.proxy(this.mouseInOut, this));
    this.$carousel.on('mouseleave', $.proxy(this.mouseInOut, this));
  }

  carouselClick (e) {
    const tar = e.target,
          className = tools.trimSpaces(tar.className),
          $tar = $(tar);

    switch (className) {
    	case 'indicator-item':
    	  this.curIdx = $tar.index();
    	  this.fadeAction(this.curIdx);
    	  break;
    	case 'car-control':
    	  const dir = $tar.attr('data-dir');
    	  this.run(dir);
    	  break;
    	default:
    	  break;
    }
  }

  mouseInOut (e) {
  	const eType = e.type;

  	switch (eType) {
  		case 'mouseenter':
  		  clearInterval(Carousel.timer);
  		  break;
  		case 'mouseleave':
  		  this.autoPlay();
  		  break;
  	}
  }

  fadeAction (index) {
    this.$carItems.eq(index).fadeIn()
                  .siblings().fadeOut();

    this.$carIndicators.eq(index).addClass('current')
                       .siblings().removeClass('current');
  }
}

export { Carousel };