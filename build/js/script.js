/* Author: Travis Cox

*/
var BP = {
  projects: JSON.parse("[{\"title\":\"Project 1\",\"id\":\"proj1\",\"slides\":[{\"src\":\"img/projects/project_1.jpg\",\"title\":\"Project 1-A Title\",\"alt\":\"Project 1-A Alt\",\"description\":\"<p>Project 1-A Lorem ipsum dolor sit amet, consectetur adipiscing elit. \\nFusce velit ante, ultrices nec blandit iaculis, fermentum eu justo. \\nNulla convallis, est vel aliquam ultrices, sem enim scelerisque lacus, \\nat porta eros risus vitae turpis. Duis eros ipsum, dapibus sit<\/p>\\n\"},{\"src\":\"img/projects/project_2.jpg\",\"title\":\"Project 1-B Title\",\"alt\":\"Project 1-B Alt\",\"description\":\"<p>Project 1-B Lorem ipsum dolor sit amet, consectetur adipiscing elit. \\nFusce velit ante, ultrices nec blandit iaculis, fermentum eu justo. \\nNulla convallis, est vel aliquam ultrices, sem enim scelerisque lacus, \\nat porta eros risus vitae turpis. Duis eros ipsum, dapibus sit<\/p>\\n\"}]},{\"title\":\"Project 2\",\"id\":\"proj2\",\"slides\":[{\"src\":\"img/projects/project_2.jpg\",\"title\":\"Project 2-A Title\",\"alt\":\"Project 2-A Alt\",\"description\":\"<p>Project 2-A Lorem ipsum dolor sit amet, consectetur adipiscing elit. \\nFusce velit ante, ultrices nec blandit iaculis, fermentum eu justo. \\nNulla convallis, est vel aliquam ultrices, sem enim scelerisque lacus, \\nat porta eros risus vitae turpis. Duis eros ipsum, dapibus sit<\/p>\\n\"},{\"src\":\"img/projects/project_1.jpg\",\"title\":\"Project 2-B Title\",\"alt\":\"Project 2-B Alt\",\"description\":\"<p>Project 2-B Lorem ipsum dolor sit amet, consectetur adipiscing elit. \\nFusce velit ante, ultrices nec blandit iaculis, fermentum eu justo. \\nNulla convallis, est vel aliquam ultrices, sem enim scelerisque lacus, \\nat porta eros risus vitae turpis. Duis eros ipsum, dapibus sit<\/p>\\n\"}]},{\"title\":\"Project 3\",\"id\":\"proj3\",\"slides\":[{\"src\":\"img/projects/project_1.jpg\",\"title\":\"Project 3-A Title\",\"alt\":\"Project 3-A Alt\",\"description\":\"<p>Project 3-A Lorem ipsum dolor sit amet, consectetur adipiscing elit. \\nFusce velit ante, ultrices nec blandit iaculis, fermentum eu justo. \\nNulla convallis, est vel aliquam ultrices, sem enim scelerisque lacus, \\nat porta eros risus vitae turpis. Duis eros ipsum, dapibus sit<\/p>\\n\"}]}]"),

  load: function() {
    var match, data,
        hash = window.location.hash,
        id   = hash && (match = hash.match(/\/([^$?]*)/)) && match[1];

    if (!_.isEmpty(BP.projects)) {
      data = id ? _.find(BP.projects, function(p){ return p.id == id }) 
                : BP.projects[0];

      if (data) {
        $("#projects").empty();
        $("#projectTmpl").tmpl(data).hide().appendTo("#projects").fadeIn();
      }
    }
  }
}

$(window).bind('hashchange', BP.load);
$(BP.load);
