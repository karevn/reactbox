require('../../../sass/description.sass')
React = require('react')
Scrollbar = require('react-scrollbar')
options = require('../../options')
classnames = require('classnames')

module.exports = (props)->
  item = props.item
  style = options.getDescriptionStyle(item)
  <Scrollbar className={classnames ['reactbox-lightbox-item-description',
    'reactbox-description-light': options.getDescriptionStyle(props.item) == 'right' && item.type == 'video'
    ]}
    speed={0.8}
    horizontal={false}
    contentClassName="reactbox-lightbox-item-description-inner">
    { if item.description?.title
      <h2 className="reactbox-lightbox-item-description-title"
        dangerouslySetInnerHTML={__html: item.description.title} />
    }
    { if item.description?.text
      <div className="reactbox-lightbox-item-description-content"
      dangerouslySetInnerHTML={__html: item.description.text} />
    }
  </Scrollbar>
