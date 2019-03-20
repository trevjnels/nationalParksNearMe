"use strict";

const logger = function(func) {
  console.log(func.name, " is running!");
};

//serach parks in multiple states
//user must control max number of results with default of 10
//each park listing must have: full name,  descritpion, URL, real address
//  and photo
//search must wipeout the moment someone submits form or types in input

const copyrightListner = function() {
  logger(copyrightListner);
  $(".github-button").on("click", function(e) {
    e.preventDefault();
    console.log("click");
    window.open("https://trevjnels.github.io/portfolio/", "_blank");
  });
};

const autoRunner = function() {
  logger(autoRunner);
  copyrightListner();
};

autoRunner();
