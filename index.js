'use strict';

// Import stylesheets
import './style.css';

var orgNameInput, orgBNInput;
load(); // Simulates a window onload event

function load() {
  orgNameInput = document.querySelector('#name');
  init();
}

function init() {
  try {
    if (!orgNameInput) return;
    $(orgNameInput).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "https://orgbook.gov.bc.ca/api/v3/search/autocomplete",
          data: {
            q: request.term
          },
          success: function (data) {
            var results = data.total ? data.results : [];
            response(results);
          }
        });
      },
      minLength: 2
    });
  } catch (e) {
    console.error('Unable to initialize autocomplete', e);
  }
}