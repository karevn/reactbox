# Reactbox - React.js lightbox

Every ecosystem needs its own lightbox, right? So does React.js.

## Main features:
* Nice minimal UI.
* Based on React.js and Flux idioms.
* Can be used in a non-react environment.
* Lots of item types.
* 3 item layout supported (see [demo](http://reactbox.karevn.com/demo)).
* No dependencies.
* Clean API - provides a simple one-function API, plus a React component.
* Responsive and mobile friendly.
* Supports swiping.
* Sharing features.
* Deeplinking support.
* Supports carousel mode.

## Supported item types
* Images.
* Youtube or Vimeo videos.
* Iframe content.
* AJAX content.
* HTML content.

All these item types come with a number of lightbox layout options.

## Installation
You can install Reactbox from npm with one command:

```
npm install --save reactbox
```

or

```
yarn add reactbox
```

## Usage

```js
import reactbox from 'reactbox'

reactbox(items)
```
This will open Reactbox in your application, passing it `items` as an option.

## Options available

### carousel
Default: `true`

If the thumbnail carousel below the mainbox will be displayed. Carousel is only displayed on if the screen is 768+ px wide.


Example:

```js
reactbox({
  items: [...],
  carousel: false
})
```
### share

Defines the list of the sharing services displayed.

Default:
```js
{
  facebook: {
    url: "//www.facebook.com/share.php?v=4&src=bm&u=%url%",
    name: 'Facebook'
  },
  twitter: {
    url: "//twitter.com/home?status=%url%"
    name: 'Twitter'
  },
  googleplus: {
    url: "//plus.google.com/share?url=%url%",
    name: 'Google Plus'
  },
  reddit: {
    url: "//reddit.com/submit?url=%url%",
    name: 'Reddit'
  },
  digg: {
    url: "//digg.com/submit?phase=2&url=%url%",
    name: 'Digg'
  }
  stumbleupon: {
    url: "http://www.stumbleupon.com/submit?url=%url%&title=%title%",
    name: "Stumbleupon"
  }
  delicious: {
    url: "//delicious.com/post?url=%url%",
    name: 'Delicious'
  }
  pinterest: {
    url: "https://www.pinterest.com/pin/create/button/?url=%url%&media=%image_url%&description=%description%&title=%title%",
    name: 'Pinterest'
  }
  vk: {
    url: "http://vk.com/share.php?url=%url%",
    name: 'VK'
  }
```

Example:
```js
// Will only show Facebook for sharing
reactbox({
  items: [...],
  share: {
    facebook: {
      url: "//www.facebook.com/share.php?v=4&src=bm&u=%url%",
      name: 'Facebook'
    }
  }
})
```

### items

An array of the items you want to show in a lightbox. See below for the docs on the item description format.

Default: `null`

Example:
```js
reactbox({
  items: [{url: 'http:/example.com/img/image.jpg'}]
})
```

#### Item properties:
##### url
  default: `null`

  The URL of the object (image, video, ajax request, iframe).
##### type
  default: `image`

  The type of the item. Valid types are:
  * `image`
  * `video`
  * `ajax`
  * `html`
  * `iframe`

##### thumbnail
  default: `null`

  Thumbnail URL for the carousel. When no thumbnail is provided - the item does
  not show in a carousel  (but is still shown in a lightbox).

##### description
  default: `null`

Item description object:
```js
{
  style: 'none', // one of the 'none', 'mini', 'right', 'bottom'
  title: 'some title', // description title
  text: 'Some text' // description text
}
```
##### download
default: `null`

Item download URL. Enables the download link at the top of the lightbox window.
