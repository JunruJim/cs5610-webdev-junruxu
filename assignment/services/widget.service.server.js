module.exports = function (app) {

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  var widgets = [
    { '_id': '1', 'widgetType': 'HEADING', 'pageId': '3', 'size': 2, 'text': 'GIZMODO', 'url': undefined, 'width': undefined },
    { '_id': '2', 'widgetType': 'HEADING', 'pageId': '3', 'size': 4, 'text': 'Lorem ipsum', 'url': undefined, 'width': undefined },
    { '_id': '3', 'widgetType': 'IMAGE', 'pageId': '3', 'width': '100%',
      'url': 'http://lorempixel.com/400/200/', 'size': undefined, 'text': undefined },
    { '_id': '4', 'widgetType': 'HTML', 'pageId': '3', 'text': '<p>Lorem ipsum</p>',
      'url': undefined, 'width': undefined, 'size': undefined },
    { '_id': '5', 'widgetType': 'HEADING', 'pageId': '3', 'size': 4, 'text': 'Lorem ipsum', 'url': undefined, 'width': undefined },
    { '_id': '6', 'widgetType': 'YOUTUBE', 'pageId': '3', 'width': '100%',
      'url': 'https://www.youtube.com/embed/AM2Ivdi9c4E', 'size': undefined, 'text': undefined },
    { '_id': '7', 'widgetType': 'HTML', 'pageId': '3', 'text': '<p>Lorem ipsum</p>',
      'url': undefined, 'width': undefined, 'size': undefined }
  ];

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
