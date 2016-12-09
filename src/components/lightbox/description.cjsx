require('../../../sass/description.sass')
React = require('react')
Scrollbar = require('react-scrollbar')
options = require('../../options')
classnames = require('classnames')
getStyle = require('./style').default
module.exports = (props)->
  item = props.item
  style = getStyle(item)
  <Scrollbar className={classnames ['reactbox-lightbox-item-description',
    'reactbox-description-light': style == 'right' && item.type == 'video']}
    speed={0.8}
    horizontal={false}
    contentClassName="reactbox-lightbox-item-description-inner">
    { if item.description
      <div className="reactbox-lightbox-item-description-content"
      dangerouslySetInnerHTML={__html: item.description} />
    }
  </Scrollbar>
