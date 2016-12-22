import FacebookIcon from 'react-icons/fa/facebook'
import TwitterIcon from 'react-icons/fa/twitter'
import GooglePlusIcon from 'react-icons/fa/google-plus'
import RedditIcon from 'react-icons/fa/reddit'
import DiggIcon from 'react-icons/fa/digg'
import StumbleUponIcon from 'react-icons/fa/stumbleupon'
import DeliciousIcon from 'react-icons/fa/delicious'
import PinterestIcon from 'react-icons/fa/pinterest'
import VkIcon from 'react-icons/fa/vk'

const services = {
  facebook: {
    url: "//www.facebook.com/share.php?v=4&src=bm&u=%url%",
    name: 'Facebook',
    component: FacebookIcon,
  },
  twitter: {
    url: "//twitter.com/home?status=%url%",
    name: 'Twitter',
    component: TwitterIcon
  },
  googleplus: {
    url: "//plus.google.com/share?url=%url%",
    name: 'Google Plus',
    component: GooglePlusIcon,
  },
  reddit: {
    url: "//reddit.com/submit?url=%url%",
    name: 'Reddit',
    component: RedditIcon,
  },
  digg: {
    url: "//digg.com/submit?phase=2&url=%url%",
    name: 'Digg',
    component: DiggIcon,
  },
  stumbleupon: {
    url: "http://www.stumbleupon.com/submit?url=%url%&title=%title%",
    name: "Stumbleupon",
    component: StumbleUponIcon,
  },
  delicious: {
    url: "//delicious.com/post?url=%url%",
    name: 'Delicious',
    component: DeliciousIcon,
  },
  pinterest: {
    url: "https://www.pinterest.com/pin/create/button/?url=%url%&media=%image_url%&description=%description%&title=%title%",
    name: 'Pinterest',
    component: PinterestIcon,
  },
  vk: {
    url: "http://vk.com/share.php?url=%url%",
    name: 'VK',
    component: VkIcon,
  }
}
export { services }
export function getShareUrl(service, item){
  let tags = {
    url: window.location.href,
    image_url: __guard__(item.urls, x => x.image),
    title: item.title,
    description: item.description || ''
  };
  return Object.keys(tags).reduce(((url, tag)=>
    url.replace(`%${tag}%`, encodeURIComponent(tags[tag]))), service.url);
}

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
