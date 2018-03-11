module.exports = function (app) {

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  var pages = [
    { '_id': '3', 'name': 'Post 1', 'websiteId': '4', 'description': 'Lorem' },
    { '_id': '4', 'name': 'Post 2', 'websiteId': '4', 'description': 'Lorem' },
    { '_id': '5', 'name': 'Post 3', 'websiteId': '4', 'description': 'Lorem' },
    { '_id': '1', 'name': 'Post 4', 'websiteId': '3', 'description': 'Lorem' },
    { '_id': '2', 'name': 'Post 5', 'websiteId': '2', 'description': 'Lorem' }
  ];

  function createPage(req, res) {
    var createdPage = req.body;
    var websiteId = req.params["websiteId"];
    createdPage._id = (pages.length + 1).toString();
    createdPage.websiteId = websiteId;
    pages.push(createdPage);
    res.json(createdPage);
  }

  function findAllPagesForWebsite(req, res) {
    var resultSet = [];
    var websiteId = req.params["websiteId"];
    for(var i = 0; i < pages.length; i++) {
      if (pages[i].websiteId === websiteId) {
        resultSet.push(pages[i]);
      }
    }
    res.json(resultSet);
  }

  function findPageById(req, res){
    var pageId = req.params["pageId"];
    var foundPage = pages.find(function (page) {
      return page._id === pageId;
    });
    if (foundPage){
      res.json(foundPage);
    } else {
      res.status(401);
      res.json(foundPage);
    }
  }

  function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var foundPage = pages.find(function (page) {
      return page._id === pageId;
    });
    var page = req.body;
    foundPage.name = page.name;
    foundPage.websiteId = page.websiteId;
    foundPage.description = page.description;
    res.json(foundPage);
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];
    for (const i in pages) {
      if (pages[i]._id === pageId) {
        const j = +i;
        pages.splice(j, 1);
      }
    }
    res.send("success");
  }
};
