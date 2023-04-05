(() => {
  function convertToSlug(str) {
    //replace all special characters | symbols with a space
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
      .toLowerCase();
    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm, '');
    // replace space with dash/hyphen
    str = str.replace(/\s+/g, '-');
    return str;
  }

  function htmlTableOfContents(documentRef) {
    console.log("toc");
    var documentRef = documentRef || document;
    var toc = documentRef.getElementById("toc");
    var headings = [].slice.call(
      documentRef.body.querySelectorAll(
        "#article-text h2, #article-text h3, #article-text h4, #article-text h5, #article-text h6"
      )
    );

    var ul = documentRef.createElement("ul"); // create unordered list
    ul.setAttribute("class", "ib-toc-anchors"); // set class to unordered list
    var prevLevel = 2; // initialize previous level to h2
    var prevList = ul; // initialize previous list to top-level unordered list
    var startList = ul; // initialize previous list to top-level unordered list

    headings.forEach(function (heading, index) {
      var ref = convertToSlug(heading.textContent);
      if (heading.hasAttribute("id")) {
        ref = heading.getAttribute("id");
        heading.setAttribute("class", "bbh-toc-link");
      } else {
        heading.setAttribute("id", ref);
        heading.setAttribute("class", "bbh-toc-link");
      }
      var link = documentRef.createElement("a");
      link.setAttribute("href", "#" + ref);
      link.textContent = heading.textContent;

      var li = documentRef.createElement("li"); // create list item
      li.setAttribute("class", heading.tagName.toLowerCase()); // set class to heading tag name
      li.appendChild(link); // add link to list item

      var currLevel = parseInt(heading.tagName.charAt(1)); // get current level from heading tag name
      if (currLevel == 2) {
        startList.appendChild(li);
      } else if (currLevel > prevLevel) {
        // if current level is deeper than previous level
        var newUl = documentRef.createElement("ul"); // create new nested unordered list
        newUl.appendChild(li); // add new unordered list to current list item
        latestList.appendChild(newUl);
        prevList = newUl; // set previous list to current list
        // add current list item to the previous list
      } else if (currLevel === prevLevel) {
        // if current level is same as previous level
        prevList.appendChild(li); // add current list item to the previous list
      }
      else if (currLevel < prevLevel) {
        // if current level is shallower than previous level
        var diff = prevLevel - currLevel; // get difference in levels
        for (var i = 0; i < diff; i++) {
          // loop over the difference
          prevList = prevList.parentNode.parentNode; // move up the previous list hierarchy
        }
      }
      latestList = li;
      prevLevel = currLevel; // set previous level to current level
    });

    toc.appendChild(ul); // add unordered list to table of contents container
  }

  try {
    module.exports = htmlTableOfContents;
  } catch (e) {
    // module.exports is not defined
  }
  // resources/js/app.js
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth);
  }
  window.addEventListener("scroll", function () {
    function flowAnimation() {
      jQuery(".step").each(function (i) {
        jQuery(this).delay(i * 1500).queue(function () {
          jQuery(this).addClass("active done");
          jQuery(this).find(".checkmark").css("visibility", "visible");
          setTimeout(function () {
            jQuery(".step").removeClass("active");
          }, 750);
        });
      });
    }
    ;
    let flowContainer = document.querySelectorAll(".flow-container");
    flowContainer.forEach(function (element) {
      if (isInViewport(element)) {
        console.log('in viewport');
        flowAnimation();
      }
    });
  });
})();
