var feeditems = ["Getting 8 hours of sleep a night can really boost your performance if you have the dedication to follow it through.", "Reward yourself in some way when you do something awesome!", "At the start of the semester, it's a good idea to make a list of your assignments, so you can keep track of them later on.", "For a healthy and cheap lunch at uni, try actually bringing food rather than buying it."];

function rotateFeed() {
  var ct = $("#feed").data("item") || 0;
  $("#feed").data("item", ct == feeditems.length -1 ? 0 : ct + 1).text(feeditems[ct]).fadeIn()
              .delay(4000).fadeOut(400, rotateFeed);
}
$(rotateFeed);
