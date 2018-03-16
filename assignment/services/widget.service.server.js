module.exports = function (app) {

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname + '/../../src/assets/uploads' });

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget",reorderWidgets);
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  var widgets = [
    { '_id': '1', 'widgetType': 'HEADING', 'pageId': '3', 'size': 2, 'text': 'GIZMODO', 'url': undefined, 'width': undefined, 'formatted': false },
    { '_id': '2', 'widgetType': 'HEADING', 'pageId': '3', 'size': 4, 'text': 'Lorem ipsum', 'url': undefined, 'width': undefined, 'formatted': false },
    { '_id': '3', 'widgetType': 'IMAGE', 'pageId': '3', 'width': '100%',
      'url': 'http://lorempixel.com/400/200/', 'size': undefined, 'text': 'it is a image', 'formatted': false },
    { '_id': '4', 'widgetType': 'HTML', 'pageId': '3', 'text': '<p>HTML1 <b>HELLO</b></p>',
      'url': undefined, 'width': undefined, 'size': undefined, 'formatted': false },
    { '_id': '5', 'widgetType': 'HEADING', 'pageId': '3', 'size': 4, 'text': 'Lorem ipsum', 'url': undefined, 'width': undefined, 'formatted': false },
    { '_id': '6', 'widgetType': 'YOUTUBE', 'pageId': '3', 'width': '100%',
      'url': 'https://www.youtube.com/embed/AM2Ivdi9c4E', 'size': undefined, 'text': undefined, 'formatted': false },
    { '_id': '7', 'widgetType': 'HTML', 'pageId': '3', 'text': '<p>I am a <i>HTML</i>, haha :)</p>',
      'url': undefined, 'width': undefined, 'size': undefined, 'formatted': false },
    { '_id': '8', 'widgetType': 'TEXT', 'pageId': '3', 'text': 'Some Text',
      'url': undefined, 'width': undefined, 'size': undefined, 'formatted': true }
  ];

  function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if(myFile == null) {
      // res.redirect("http://localhost:4200/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
      res.redirect("https://cs5610-webdev-junruxu.herokuapp.com/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
      return;
    }

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    if (!widgetId) {
      var tobeCreated = {_id: (widgets.length + 1).toString(), widgetType: 'IMAGE', pageId: pageId, size: size, text: 'text', width:'100%',
        url:'/uploads/' + filename, formatted: false};
      widgets.push(tobeCreated);
    } else {
      var foundWidget = widgets.find(function (widget) {
        return widget._id === widgetId;
      });
      foundWidget.url = "/uploads/" + filename;
    }

    // res.redirect("http://localhost:4200/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
    res.redirect("https://cs5610-webdev-junruxu.herokuapp.com/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
  }

  function reorderWidgets(req,res) {
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query.start);
    var endIndex = parseInt(req.query.end);

    // found the index in widgets array
    var startIndexDb = 0;
    var endIndexDb = 0;
    var count = 0;
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i].pageId === pageId) {
        if (startIndex === count) {
          startIndexDb = i;
        }
        if (endIndex === count) {
          endIndexDb = i;
        }
        count++;
      }
    }

    var changedWidget = widgets[startIndex];
    widgets.splice(startIndexDb, 1);
    widgets.splice(endIndexDb, 0, changedWidget);
    res.json(widgets);
  }

  function createWidget(req, res) {
    var createdWidget = req.body;
    var pageId = req.params["pageId"];
    createdWidget._id = (widgets.length + 1).toString();
    createdWidget.pageId = pageId;
    widgets.push(createdWidget);
    res.json(createdWidget);
  }

  function findAllWidgetsForPage(req, res) {
    var resultSet = [];
    var pageId = req.params["pageId"];
    for(var i = 0; i < widgets.length; i++) {
      if (widgets[i].pageId === pageId) {
        resultSet.push(widgets[i]);
      }
    }
    res.json(resultSet);
  }

  function findWidgetById(req, res){
    var widgetId = req.params["widgetId"];
    var foundWidget = widgets.find(function (widget) {
      return widget._id === widgetId;
    });
    if (foundWidget){
      res.json(foundWidget);
    } else {
      res.status(401);
      res.json(foundWidget);
    }
  }

  function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var foundWidget = widgets.find(function (widget) {
      return widget._id === widgetId;
    });
    var widget = req.body;
    foundWidget.widgetType = widget.widgetType;
    foundWidget.size = widget.size;
    foundWidget.text = widget.text;
    foundWidget.width = widget.width;
    foundWidget.url = widget.url;
    foundWidget.formatted = widget.formatted;
    res.json(foundWidget);
  }

  function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        const j = +i;
        widgets.splice(j, 1);
      }
    }
    res.send("success");
  }

};
