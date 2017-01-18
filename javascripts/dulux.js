var dulux = (function() {
	var DEFAULTS = {
		// element selectors
		loadingDiv : '#loadingDiv',
		resultsDiv : '#resultsDiv',
		submitBtn : "#send",

		// URLs
		webServiceURL : "https://httpbin.org/ip", // date Web Service Endpoint
		resultURL : "results.html" // results page

	}
	// Local storage handlers
	function saveToLocal(data) {
		localStorage.state = data;
		return 1;
	}
	function loadFromLocal() {
		return localStorage.state;
	}

	return {
		init: function() {
			// hide loading image
			$(DEFAULTS.loadingDiv).hide();
		},
		// get the date using the Web Service
		getData: function() {
			$(DEFAULTS.submitBtn).on('click', function(){
			    $.ajax(
			    	{
			    		url: DEFAULTS.webServiceURL, 
			    		beforeSend: function() {
			    			// show loading image and disable submit button
			    			$(DEFAULTS.loadingDiv).show();
			    			$(DEFAULTS.submitBtn).attr("disabled", "disabled");
			    		},
			    		complete: function(){
						    $(DEFAULTS.loadingDiv).hide();
						 },
			    		success: function(result){
			    			saveToLocal(result.origin);
			    		}
			    	}).done(function () {
				        window.location.href = DEFAULTS.resultURL;
				    });
			});
		},
		showData: function() {
			$(DEFAULTS.resultsDiv).html(loadFromLocal());
		}
	}
})();
