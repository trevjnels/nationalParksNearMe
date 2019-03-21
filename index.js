const stateObj = {
  Alabama: { name: "Alabama", abbv: "AL" },
  Alaska: { name: "Alaska", abbv: "AK" },
  Arizona: { name: "Arizona", abbv: "AZ" },
  Arkansas: { name: "Arkansas", abbv: "AR" },
  California: { name: "California", abbv: "CA" },
  Colorado: { name: "Colorado", abbv: "CO" },
  Connecticut: { name: "Connecticut", abbv: "CT" },
  Delaware: { name: "Delaware", abbv: "DE" },
  "District of Columbia": { name: "District of Columbia", abbv: "DC" },
  Florida: { name: "Florida", abbv: "FL" },
  Georgia: { name: "Georgia", abbv: "GA" },
  Hawaii: { name: "Hawaii", abbv: "HI" },
  Idaho: { name: "Idaho", abbv: "ID" },
  Illinois: { name: "Illinois", abbv: "IL" },
  Indiana: { name: "Indiana", abbv: "IN" },
  Iowa: { name: "Iowa", abbv: "IA" },
  Kansas: { name: "Kansas", abbv: "KS" },
  Kentucky: { name: "Kentucky", abbv: "KY" },
  Louisiana: { name: "Louisiana", abbv: "LA" },
  Maine: { name: "Maine", abbv: "ME" },
  Maryland: { name: "Maryland", abbv: "MD" },
  Massachusetts: { name: "Massachusetts", abbv: "MA" },
  Michigan: { name: "Michigan", abbv: "MI" },
  Minnesota: { name: "Minnesota", abbv: "MN" },
  Mississippi: { name: "Mississippi", abbv: "MS" },
  Missouri: { name: "Missouri", abbv: "MO" },
  Montana: { name: "Montana", abbv: "MT" },
  Nebraska: { name: "Nebraska", abbv: "NE" },
  Nevada: { name: "Nevada", abbv: "NV" },
  "New Hampshire": { name: "New Hampshire", abbv: "NH" },
  "New Jersey": { name: "New Jersey", abbv: "NJ" },
  "New Mexico": { name: "New Mexico", abbv: "NM" },
  "New York": { name: "New York", abbv: "NY" },
  "North Carolina": { name: "North Carolina", abbv: "NC" },
  "North Dakota": { name: "North Dakota", abbv: "ND" },
  Ohio: { name: "Ohio", abbv: "OH" },
  Oklahoma: { name: "Oklahoma", abbv: "OK" },
  Oregon: { name: "Oregon", abbv: "OR" },
  Pennsylvania: { name: "Pennsylvania", abbv: "PA" },
  "Rhode Island": { name: "Rhode Island", abbv: "RI" },
  "South Carolina": { name: "South Carolina", abbv: "SC" },
  "South Dakota": { name: "South Dakota", abbv: "SD" },
  Tennessee: { name: "Tennessee", abbv: "TN" },
  Texas: { name: "Texas", abbv: "TX" },
  Utah: { name: "Utah", abbv: "UT" },
  Vermont: { name: "Vermont", abbv: "VT" },
  Virginia: { name: "Virginia", abbv: "VA" },
  Washington: { name: "Washington", abbv: "WA" },
  "West Virginia": { name: "West Virginia", abbv: "WV" },
  Wisconsin: { name: "Wisconsin", abbv: "WI" },
  Wyoming: { name: "Wyoming", abbv: "WY" }
};

var stateArray = Object.keys(stateObj);

//serach parks in multiple states
//user must control max number of results with default of 10
//each park listing must have: full name,  descritpion, URL, real address
//  and photo
//search must wipeout the moment someone submits form or types in input

//
// park = "acad"
// endpoint = "https://developer.nps.gov/api/v1/parks?parkCode=" + park + "&fields=addresses"
// HEADERS = {"Authorization":"INSERT-API-KEY-HERE"}
// req = fetch(endpoint,headers=HEADERS)
// "use strict";

// curl -X GET
//
//  -H "accept: application/json"

const parkAPIKey = "z1CM0ohsx8v41kKb0zKExnVzurJPqHDoa8ujQW4b";
const park = "acad";

const logger = function(func) {
  console.log(func.name, " is running!");
};

// - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - -
const renderPage = function() {
  $(".one").html(
    `<h1 class="title">Search for national parks in (near) your state!</h1> `
  );
  $(".two").html(
    `<form class="parkSearchForm"><select class="stateSelector"></select><span class="flex flex-col">Select Number of Results (between 1-10)<input class="resultsMax" type="number"></input></span><button value="10" required class="submit">Search</button></form>`
  );
  $(".three").html(`<div class="parkOutput">`);
  stateArray.forEach(function(state) {
    $(".stateSelector").append(
      `<option class="stateoption ${state}
      ${stateObj[state].abbv}">${state}</option>`
    );
  });
  //
};

const renderOutput = function(resp, max) {
  console.log(resp.data);
  // resp.data.forEach(function(entry)

  if (max > resp.data.length) {
    max = resp.data.length;
  }

  for (let i = 0; i < max; i++) {
    var entry = resp.data[i];
    $(".parkOutput").append(`

      <div class="flex flex-row">
        <h4 class="parkname">${entry.fullName}</h4>
        <a href="${entry.url}" target="_blank" ><h4>Website</h4></a>
      </div>
      <div> <p class="description">${entry.description}</p></div>
    `);
  }
};

const getData = function(url, max) {
  // Default options are marked with *
  return fetch(url)
    .then(response => response.json())
    .then(response => renderOutput(response, max)) // JSON-string from `response.json()` call
    .catch(error => console.error(error)); // parses JSON response into native Javascript objects
};

const urlBuilder = function(state, api_key) {
  //take data out of input box ()
  var url = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&fields=&api_key=${api_key}`;
  return url;
};

const formListner = function() {
  $(".submit").click(function(e) {
    e.preventDefault();
    $(".parkOutput").html("");
    var currentState = $(".stateSelector").val();
    var resultsMax = $(".resultsMax").val();
    if (resultsMax < 1 || resultsMax > 10) {
      alert("input a number between 1&10");
      $(".parkOutput").html(`<h1>Input a number between 1-10!</h1>`);
    }
    var url = urlBuilder(stateObj[currentState].abbv, parkAPIKey);
    getData(url, resultsMax);
  });
};

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
  renderPage();
  formListner();
};

autoRunner();
