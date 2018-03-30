module.exports = function (app) {

  var pageModel = require("../model/page/page.model.server");

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  // var pages = [
  //   { '_id': '3', 'name': 'Post 1', 'websiteId': '4', 'description': 'Lorem' },
  //   { '_id': '4', 'name': 'Post 2', 'websiteId': '4', 'description': 'Lorem' },
  //   { '_id': '5', 'name': 'Post 3', 'websiteId': '4', 'description': 'Lorem' },
  //   { '_id': '1', 'name': 'Post 4', 'websiteId': '3', 'description': 'Lorem' },
  //   { '_id': '2', 'name': 'Post 5', 'websiteId': '2', 'description': 'Lorem' }
  // ];

  function createPage(req, res) {
    var createdPage = req.body;
    var websiteId = req.params["websiteId"];
    pageModel.createPage(websiteId, createdPage)
      .then(function (page){
        res.json(page);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    pageModel.findAllPagesForWebsite(websiteId)
      .then(function(pages) {
        res.json(pages);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findPageById(req, res){
    var pageId = req.params["pageId"];
    pageModel.findPageById(pageId).then(function(page) {
      if (page) {
        res.json(page);
      } else {
        res.status(404);
        res.json(page);
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }

  function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page = req.body;
    pageModel.updatePage(pageId, page)
      .then(function(status) {
        res.send(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];
    pageModel.deletePage(pageId)
      .then(function(status) {
        res.json(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }
};
