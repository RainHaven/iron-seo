# Iron SEO

Iron SEO aimes to provide a simple way to set on-page SEO related tags.

## Installation
```sh
$ meteor add rainhaven:iron-seo
```

## Iron SEO with Spiderable

To really make your site search engine friendly, the spiderable package needs to be installed in your app.
You can learn more about spiderable [here](https://atmospherejs.com/meteor/spiderable)

Note: If you're not using meteor deploy, you'll also want ensure that phantomjs is installed on your server.

## Title Tag

The title tag can be set by defining a title property on your route controller, and setting it to either a string or a function that returns a string.

```javascript
HomeController = RouteController.extend({
  title: 'My Brand — A Compelling Web Page',
  // results in: <title>My Brand — A Compelling Web Page</title>
  ...
```

**Return a title from the database.**

If, for example, you have a Posts collection and you want the title tag to be a documents field from the database, that's easy to do with iron-seo. All title and meta tags are called from the context of `Iron.utils`, which means you have full access to `this.params`.

```javascript
HomeController = RouteController.extend({
  title: function() {
    var post = Posts.findOne(this.params._id);
    if (post)
      return post.title;
  },
  // results in: <title>Whatever the post title is</title>
  ...
```

## Meta Name Tags
Similar to title tags, meta name tags are also defined on the route controller. Meta name tags are nested.
```javascript
HomeController = RouteController.extend({
  metaNames: {
    description: 'We build world class Meteor apps',
  },
  // results in: <meta name="description" content="We build world class Meteor apps">
  ...
```

## Facebook's Open Graph Meta Property Tags
Meta property tags are useful for controlling how your websites content appears when shared on Facebook
```javascript
HomeController = RouteController.extend({
  metaProperties: {
    'og:type': 'article',
    'og:title': 'My click bait title',
    'og:image': 'http://mysite.com/images/click-bait.png'
  },
  ...
```

## Meta Name Tags for Twitter Cards
Control how your web sites content is displayed when shared on Twitter
```javascript
HomeController = RouteController.extend({
  metaNames: {
    "twitter:card": "summary",
    "twitter:site": "@twitterhandle",
    "twitter:title": "Cat Tripple Back Flip",
    "twitter:description": "Cat Lands a Tripple Back Flip on a Skateboard",
    "twitter:image": "http://mysite.com/images/image-for-twitter-card.png"
  },
  ...
```