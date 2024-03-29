import Image from "next/image";
import React from "react";
const parse = require('html-react-parser');

export default function postConverter(element) {
  var cleanJsx = parse(element);
  var imgNumber = 0;
  function reactNodeToImg(node) {
    return React.Children.map(node, (node) => {
      if (!node.type) {
        return node;
      }
      if (node.type === 'img') {
        if (imgNumber === 0) {
          imgNumber++;
          return React.createElement(Image, { src: node.props.src, alt: node.props.alt, width: node.props.width, height: node.props.height, priority: true })
        }
        else {
          imgNumber++;
          return React.createElement(Image, { src: node.props.src, alt: node.props.alt, width: node.props.width, height: node.props.height })
        }

      }
      // If node.type is a heading tag, return a heading with an id of the same as the text
      else if (node.type === 'h2' || node.type === 'h3' || node.type === 'h4' || node.type === 'h5' || node.type === 'h6') {
        var headingElement = React.createElement(node.type, { id: node.props.children }, node.props.children);
        return headingElement;
      }
      else if (node.props && node.props.children != null) {
        React.Children.map(node.props.children, (child) => {
          if (typeof child === 'string') {
            return React.createElement('string', {}, child)
          }
        })
        return React.cloneElement(node, {}, reactNodeToImg(node.props.children));
      }
      else {
        return React.cloneElement(node, {}, null);
      }
    })
  }
  const dom = React.Children.map(cleanJsx, (elementchild) => {
    if (!elementchild.type) {
      return;
    }
    // If node.type is a heading tag, return a heading with an id of the same as the text
    else if (elementchild.type === 'h2' || elementchild.type === 'h3' || elementchild.type === 'h4' || elementchild.type === 'h5' || elementchild.type === 'h6') {
      var headingElement = React.createElement(elementchild.type, { id: elementchild.props.children }, elementchild.props.children);
      return headingElement;
    }
    else if (elementchild.props && elementchild.props.children) {
      return React.cloneElement(elementchild, {}, reactNodeToImg(elementchild.props.children));
    }
    else {
      return elementchild;
    }
  })
  return dom;
}
