module.exports =
  services:
    facebook:
      url: "//www.facebook.com/share.php?v=4&src=bm&u=%url%"
      name: 'Facebook'
    twitter:
      url: "//twitter.com/home?status=%url%"
      name: 'Twitter'
    googleplus:
      url: "//plus.google.com/share?url=%url%"
      name: 'Google Plus'
    reddit:
      url: "//reddit.com/submit?url=%url%"
      name: 'Reddit'
    digg:
      url: "//digg.com/submit?phase=2&url=%url%"
      name: 'Digg'
    stumbleupon:
      url: "http://www.stumbleupon.com/submit?url=%url%&title=%title%"
      name: "Stumbleupon"
    delicious:
      url: "//delicious.com/post?url=%url%"
      name: 'Delicious'
    pinterest:
      url: "https://www.pinterest.com/pin/create/button/?url=%url%&media=%image_url%&description=%description%&title=%title%"
      name: 'Pinterest'
    vk:
      url: "http://vk.com/share.php?url=%url%"
      name: 'VK'
  getShareUrl: (service, item)->
    tags = {
      url: window.location.href
      image_url: item.urls?.image
      title: item.title
      description: item.description || ''
    }
    Object.keys(tags).reduce(((url, tag)->
      url.replace("%#{tag}%", encodeURIComponent(tags[tag]))
    ), service.url)
