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

            // Append this Project to that column
            minCol.append(projectHtml)
        }

    });

}

var getProjectHtml = function (projectObj) {

    var projectTemplate = `<div class='rounded p-4 mb-3' style='background-color: ` + getRandomColor() + `'>
                                <a href='` + projectObj.link + `' data-toggle='' data-target=''>
                                <img class='img-fluid center-block' src='` + projectObj.image + `' />
                                <h2> ` + projectObj.title + ` </h2>
                                <p> ` + projectObj.summary + ` </p>
                                </a>
                            </div>`;
    return projectTemplate; 
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