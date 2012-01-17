var BP = {
  projects: null,

  render: function(data) {
    $("#projects").empty();
    $("#projectTmpl").tmpl(data).hide().appendTo("#projects").fadeIn();
  },

  getId: function() {
    var match, hash = window.location.hash;

    return hash && (match = hash.match(/\/([^$?]*)/)) && match[1];
  },

  fetch: function(id, callback) {
    var data;

    if (!BP.projects) {
      $.getJSON('/api/projects.json', function(json) {
        BP.projects = json;
        BP.fetch(id, callback);
      });
      return false;
    }

    data = id ? _.find(BP.projects, function(p){ return p.id == id }) 
              : BP.projects[0];

    callback(data);
  },

  load: function() {
    BP.fetch(BP.getId(), BP.render);
  }
}

$(window).bind('hashchange', BP.load);
$(BP.load);
