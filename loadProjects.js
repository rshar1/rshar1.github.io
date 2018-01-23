$(document).ready(function() {
    loadProjects()
})

var loadProjects = function () {

    $.getJSON("myProjects.json", function (json) {
        myProjectsJson = json;

        for (let project of myProjectsJson) {

            // Get the minimum column
            var minCol = getMinCol()
            var projectHtml = getProjectHtml(project)
            var modalHtml = getModalHtml(project)

            // Append this Project to that column
            minCol.append(projectHtml)

            // Add the modal
            $("body").append(modalHtml)

        }

    });

}

var getProjectHtml = function (projectObj) {

    var projectTemplate = `<div class='rounded p-4 mb-3' style='background-color: ` + getRandomColor() + `'>
                                <a href='` + projectObj.link + `' data-toggle='modal' data-target='#` + projectObj.id + `'>
                                <img class='img-fluid center-block' src='` + projectObj.image + `' />
                                <h2> ` + projectObj.title + ` </h2>
                                <p> ` + projectObj.summary + ` </p>
                                </a>
                            </div>`;
    return projectTemplate; 
}

var getModalHtml = function(projectObj) {
    var template = `
    <div class="modal fade" id="` + projectObj.id + `" tabindex="-1" role="dialog" aria-labelledby="` + projectObj.id + `Label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="` + projectObj.id + `Label">` + projectObj.title + `</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            ` + (projectObj.description === "" ? projectObj.summary : projectObj.description) + `
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          ` +
          ( projectObj.link === "" ? "" : '<a type="button" href="' + projectObj.link + '" class="btn btn-primary">View Example</a>')
          +
          `
        </div>
      </div>
    </div>
  </div>
  `; 

  return template; 
}

// Returns a string for a random color
var getRandomColor = function() {
    var colors = 
    [
        "green", 
        "rgb(89, 123, 126)",
        "orange", 
        "yellow"
    ]

    return colors[Math.floor((Math.random() * colors.length))]

}

var getMinCol = function () {
    // Goes through all the columns, gets each of their heights, then returns the one with the lowest height
    var minHeight = -1;
    var minCol;

    var grid = $("#projects-grid")

    for (let col of grid.children()) {
        var colJquery = $(col)
        var height = getHeight(colJquery)
        if (minHeight == -1 || height < minHeight) {
            minHeight = height
            minCol = colJquery
        }
    }

    return minCol
}

// @input col -> jquery object
var getHeight = function (col) {
    // gets the height of a column based on the sum of the heights of its children, ignoring margins between them
    // since each row has the same amoutn of space
    var height = 0;

    for (let item of col.children()) {
        height += $(item).height()
    }

    return height;
}