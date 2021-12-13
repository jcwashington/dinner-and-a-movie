var telegraphURL = "https://api.telegra.ph/%method%";


    // "result": {
    //     "short_name": "hhak92",
    //     "author_name": "Hee Hoon Kim",
    //     "author_url": "",
    //     "access_token": "d06f6120a4635faec578c3bf6e210e40dfc5a6763c15af6be4fb771af417",
    //     "auth_url": "https://edit.telegra.ph/auth/lGCwiALXXnf32DN3YIQSozQBxk8rBa8URIq7i95fwk"
    // }

var settings = {
    "url": "https://api.telegra.ph/editAccountInfo?access_token=d06f6120a4635faec578c3bf6e210e40dfc5a6763c15af6be4fb771af417&short_name=Dinner and a Movie&author_name=Romantic Partner&author_url=https://google.com/",
    "method": "GET",
    "timeout": 0,
  };
      
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  function domToNode(domNode) {
    if (domNode.nodeType == domNode.TEXT_NODE) {
      return domNode.data;
    }
    if (domNode.nodeType != domNode.ELEMENT_NODE) {
      return false;
    }
    var nodeElement = {};
    nodeElement.tag = domNode.tagName.toLowerCase();
    for (var i = 0; i < domNode.attributes.length; i++) {
      var attr = domNode.attributes[i];
      if (attr.name == 'href' || attr.name == 'src') {
        if (!nodeElement.attrs) {
          nodeElement.attrs = {};
        }
        nodeElement.attrs[attr.name] = attr.value;
      }
    }
    if (domNode.childNodes.length > 0) {
      nodeElement.children = [];
      for (var i = 0; i < domNode.childNodes.length; i++) {
        var child = domNode.childNodes[i];
        nodeElement.children.push(domToNode(child));
      }
    }
    return nodeElement;
  }
  
  function nodeToDom(node) {
    if (typeof node === 'string' || node instanceof String) {
      return document.createTextNode(node);
    }
    if (node.tag) {
      var domNode = document.createElement(node.tag);
      if (node.attrs) {
        for (var name in node.attrs) {
          var value = node.attrs[name];
          domNode.setAttribute(name, value);
        }
      }
    } else {
      var domNode = document.createDocumentFragment();
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        domNode.appendChild(nodeToDom(child));
      }
    }
    return domNode;
  }
  
  var article = document.getElementById('article');
  var content = domToNode(article).children;
  $.ajax('https://api.telegra.ph/createPage', {
    data: {
      access_token:   '%access_token%',
      title:          'Title of page',
      content:        JSON.stringify(content),
      return_content: true
    },
    type: 'POST',
    dataType: 'json',
    success: function(data) {
      if (data.content) {
        while (article.firstChild) {
          article.removeChild(article.firstChild);
        }
        article.appendChild(nodeToDom({children: data.content}));
      }
    }
  });