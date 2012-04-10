var BP = {
  scroller: null,
  pHeight: null,
  sWidth: null,
  pCount: null,
  currentProject: null,
  projectEls: null,
  projects: JSON.parse("[{\"title\":\"Identity\",\"id\":\"identity\",\"description\":\"Arenson Desc\",\"slides\":[{\"src\":\"img/projects/arenson/3.jpg\",\"title\":\"arenson 3\",\"alt\":\"arenson 3\",\"description\":\"arenson 3 desc\"},{\"src\":\"img/projects/arenson/4.jpg\",\"title\":\"arenson 4\",\"alt\":\"arenson 4\",\"description\":\"arenson 4 desc\"},{\"src\":\"img/projects/arenson/5.jpg\",\"title\":\"arenson 5\",\"alt\":\"arenson 5\",\"description\":\"arenson 5 desc\"},{\"src\":\"img/projects/arenson/6.jpg\",\"title\":\"arenson 6\",\"alt\":\"arenson 6\",\"description\":\"arenson 1 desc\"},{\"src\":\"img/projects/arenson/logo.jpg\",\"title\":\"arenson logo\",\"alt\":\"arenson logo\",\"description\":\"arenson 1 desc\"},{\"src\":\"img/projects/arenson/sign.jpg\",\"title\":\"arenson sign\",\"alt\":\"arenson sign\",\"description\":\"arenson sign desc\"}]},{\"title\":\"Branding\",\"id\":\"branding\",\"description\":\"logos description\",\"slides\":[{\"src\":\"img/projects/logos/50_honeywell.jpg\",\"title\":\"logos 50_honeywell\",\"alt\":\"logos 50_honeywell\",\"description\":\"logos 50_honeywell\"},{\"src\":\"img/projects/logos/art_logo.jpg\",\"title\":\"logos art_logo\",\"alt\":\"logos art_logo\",\"description\":\"logos art_logo\"},{\"src\":\"img/projects/logos/cd_logo.jpg\",\"title\":\"logos cd_logo\",\"alt\":\"logos cd_logo\",\"description\":\"logos cd_logo\"},{\"src\":\"img/projects/logos/center4innov.jpg\",\"title\":\"logos center4innov\",\"alt\":\"logos center4innov\",\"description\":\"logos center4innov\"},{\"src\":\"img/projects/logos/classique.jpg\",\"title\":\"logos classique\",\"alt\":\"logos classique\",\"description\":\"logos classique\"},{\"src\":\"img/projects/logos/empathy.jpg\",\"title\":\"logos empathy\",\"alt\":\"logos empathy\",\"description\":\"logos empathy\"},{\"src\":\"img/projects/logos/glovista.jpg\",\"title\":\"logos glovista\",\"alt\":\"logos glovista\",\"description\":\"logos glovista\"},{\"src\":\"img/projects/logos/hsbc.jpg\",\"title\":\"logos hsbc\",\"alt\":\"logos hsbc\",\"description\":\"logos hsbc\"},{\"src\":\"img/projects/logos/signup_logo.jpg\",\"title\":\"logos signup_logo\",\"alt\":\"logos signup_logo\",\"description\":\"logos signup_logo\"}]},{\"title\":\"Interface\",\"id\":\"interface\",\"description\":\"md report\",\"slides\":[{\"src\":\"img/projects/md_report/1.jpg\",\"title\":\"md report 1\",\"alt\":\"md report 1\",\"description\":\"md report 1\"},{\"src\":\"img/projects/md_report/2.jpg\",\"title\":\"md report 2\",\"alt\":\"md report 2\",\"description\":\"md report 2\"},{\"src\":\"img/projects/md_report/3.jpg\",\"title\":\"md report 3\",\"alt\":\"md report 3\",\"description\":\"md report 3\"}]},{\"title\":\"Corporate\",\"id\":\"corporate\",\"description\":\"pratt news\",\"slides\":[{\"src\":\"img/projects/pratt_news/1.jpg\",\"title\":\"pratt news 1 title\",\"alt\":\"pratt news 1 alt\",\"description\":\"pratt news 1 description\"},{\"src\":\"img/projects/pratt_news/2.jpg\",\"title\":\"pratt news 2 title\",\"alt\":\"pratt news 2 alt\",\"description\":\"pratt news 2 description\"},{\"src\":\"img/projects/pratt_news/3.jpg\",\"title\":\"pratt news 3 title\",\"alt\":\"pratt news 3 alt\",\"description\":\"pratt news 3 description\"}]},{\"title\":\"Editorial\",\"id\":\"editorial\",\"description\":\"editorial\",\"slides\":[{\"src\":\"img/projects/pratt_news/1.jpg\",\"title\":\"pratt news 1 title\",\"alt\":\"pratt news 1 alt\",\"description\":\"pratt news 1 description\"}]},{\"title\":\"Experimental\",\"id\":\"experimental\",\"description\":\"experimental\",\"slides\":[{\"src\":\"img/projects/pratt_news/1.jpg\",\"title\":\"pratt news 1 title\",\"alt\":\"pratt news 1 alt\",\"description\":\"pratt news 1 description\"}]}]"),

  render: function(el, data, partialRender) {
    el.empty();
    $('#projectTmpl').tmpl(data).appendTo(el);

    if (!partialRender) { 
      el.data('rendered', true);
      $('.slide', el).first().addClass('current');
    }
  },

  scrollTo: function(el, firstLoad) {
    var pos = el.position(), t = pos.top - 25;

    // we don't animate on first load
    if (firstLoad) {
      BP.scroller.scrollTop(t);
    } else {
      BP.scroller.stop().animate({scrollTop: t}, 500);
    }
  },

  getId: function() {
    var match, hash = window.location.hash;

    return hash && (match = hash.match(/\/([^$?]*)/)) && match[1] ||
        BP.projects[0].id;
  },

  getProjectData: function(id) {
    return id ? _.find(BP.projects, function(p) { return p.id == id }) : BP.projects[0];
  },

  _load: function(id) {
    var firstLoad   = !BP.pCount,
        projectData = BP.getProjectData(id),
        projectEl   = $('#'+projectData.id);

    if (!projectEl.data('rendered')) {
      BP.render(projectEl, projectData);
    }

    if (firstLoad) {
      BP.projectEls = $('.project');
      BP.pHeight = BP.projectEls.outerHeight(true);
      BP.pCount  = BP.projectEls.length;
      BP.resize();

      _(BP.projects).chain()
        .filter(function(p) { return p.id != id })
        .each(function(pData) {
          pData = _.clone(pData);
          if (pData.slides) { 
            pData.slides = pData.slides[0];
          }

          BP.render($('#'+pData.id), pData, true);
        });
    }

    BP.scrollTo(projectEl, firstLoad);

    $('#sub-nav li')
      .removeClass('current')
      .siblings('.'+projectData.id).addClass('current');

    projectEl
      .addClass('current')
      .siblings().removeClass('current');

    BP.currentProject = projectEl;
  },

  load: function() {
    BP._load(BP.getId());
  },

  _vScroll: function(dir) {
    return function() {
      var el;
      if (BP.currentProject && (el = BP.currentProject[dir]())) {
        BP._load(el.attr('id'));
      }
    }
  },

  _hScroll: function(dir) {
    return function() {
      if (BP.currentProject) {
        $('.slide.current', BP.currentProject)[dir]().each(function(i, s) {
          s = $(s);

          s.closest('.slides').animate({left: s.position().left * -1}, 500, function() {
            s.addClass('current').siblings().removeClass('current');
          });
        });
      }
    }
  },

  init: function() {

    var arrowu = $('<div class="arrow" id="arrow-u" />').click(BP._vScroll('prev')),
        arrowd = $('<div class="arrow" id="arrow-d" />').click(BP._vScroll('next')),
        arrowl = $('<div class="arrow" id="arrow-l" />').click(BP._hScroll('prev')),
        arrowr = $('<div class="arrow" id="arrow-r" />').click(BP._hScroll('next'));

    $('<div class="arrows" />')
      .append(arrowu, arrowd, arrowl, arrowr)
      .appendTo('#container');

    $(window).bind('hashchange', BP.load);
    $(window).resize(BP.resize);

    BP.scroller = $('#scroller');

    BP.load();
  },

  resize: function(inf) {
    $('#projects').height(
      $(window).height() - BP.pHeight + (BP.pHeight * BP.pCount)
    );
  }
}

$(BP.init)
