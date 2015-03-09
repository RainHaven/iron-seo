var metaNameTags = {};
var metaPropertyTags = {};

var getSelector = function (tagType, value) {
  var selector = 'meta[' + tagType + '="' + value + '"]';
  return selector;
}

var hasTag = function (tagType, value) {
  var selector = getSelector(tagType, value);
  return $(selector).length > 0;
}

var insertNewTags = function (metaNames, metaProperties) {
  var self = this;
  for (mn in metaNames) {
    metaNameTags[mn] = metaNames[mn];
  }
  for (mk in metaProperties) {
    metaPropertyTags[mk] = metaProperties[mk];
  }

  if (! _.isEmpty(metaNameTags)) {
    for (prop in metaNameTags) {
      if (_.isString(metaNameTags[prop])) {
        if (hasTag('name', prop)) {
          var selector = getSelector('name', prop);
          $(selector).attr('content', metaNameTags[prop]);
        } else {
          metaTag = document.createElement('meta');
          metaTag.name = prop;
          metaTag.content = metaNameTags[prop];
          document.getElementsByTagName('head')[0].appendChild(metaTag);
        }
      } else if (_.isFunction(metaNameTags[prop])) {
        if (hasTag('name', prop)) {
          var selector = getSelector('name', prop);
          $(selector).attr('content', metaNameTags[prop].call(self));
        } else {
          metaTag = document.createElement('meta');
          metaTag.name = prop;
          metaTag.content = metaNameTags[prop].call(self);
          document.getElementsByTagName('head')[0].appendChild(metaTag);
        }
      } else {
        console.warn("Meta Tag: " + prop + " needs to be either a string or function");
      }

    }
  }
  if (! _.isEmpty(metaPropertyTags)) {
    for (prop in metaPropertyTags) {
      if (_.isString(metaPropertyTags[prop])) {
        if (hasTag('property', prop)) {
          var selector = getSelector('property', prop);
          $(selector).attr('content', metaNames[prop]);
        } else {
          $('head').append('<meta property="' + prop + '" content="' + metaPropertyTags[prop] + '" />');
        }

      } else if (_.isFunction(metaPropertyTags[prop])) {
        if (hasTag('property', prop)) {
          var selector = getSelector('property', prop);
          $(selector).attr('content', metaNames[prop].call(self));
        } else {
          $('head').append('<meta property="' + prop + '" content="' + metaPropertyTags[prop].call(self) + '" />');
        }
      } else {
        console.warn("Meta Tag: " + prop + " needs to be either a string or function");
      }
    }
  }
}

var removeTag = function (tagType, value) {
  var selector = getSelector(tagType, value);

  $(selector).remove();

  if (tagType === 'name')
    delete metaNameTags[value];

  if (tagType === 'property')
    delete metaPropertyTags[value];

}

var deleteOldTags = function (metaNames, metaProperties) {
  var metaNames = metaNames || {};
  var metaProperties = metaProperties || {};

  for (mnt in metaNameTags) {
    if (_.isUndefined(metaNames[mnt]))
      removeTag('name', mnt);
  }

  for (mpt in metaPropertyTags) {
    if (_.isUndefined(metaProperties[mpt]))
      removeTag('property', mpt);
  }
}

Router.onAfterAction(function () {

  var self = this,
      metaTag,
      titleTag = this.lookupOption('title'),
      metaNames = this.lookupOption('metaNames'),
      metaProperties = this.lookupOption('metaProperties');

  if (_.isEmpty(metaNameTags) && _.isEmpty(metaPropertyTags)) {
    insertNewTags.call(self, metaNames, metaProperties);
  } else {
    deleteOldTags(metaNames, metaProperties);
    insertNewTags.call(self, metaNames, metaProperties);
  }

  if (! _.isUndefined(titleTag)) {
    if(_.isString(titleTag))
      document.title = titleTag;
    else if(_.isFunction(titleTag))
      document.title = titleTag.call(self);
    else
      console.warn("Title tag needs to be either a string or function");
  }


  // this.next();
});
