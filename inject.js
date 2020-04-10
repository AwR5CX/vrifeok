const script_content = `
(function (){
	const _toLocaleDateString = Date.prototype.toLocaleDateString;
	const _toLocaleTimeString = Date.prototype.toLocaleTimeString;
	const fifteenMinutesAgo = ()=> new Date(
		(new Date()).valueOf() - 60000*15
	);
	
	Date.prototype.toLocaleDateString = locale => _toLocaleDateString.apply(
		fifteenMinutesAgo(), 
		[locale]
	);
	Date.prototype.toLocaleTimeString = locale => _toLocaleTimeString.apply(
		fifteenMinutesAgo(), 
		[locale], {
			hour: "2-digit",
			minute: "2-digit",
		}
	);
})()
`;

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      script_tag = document.createElement("script");
      script_tag.textContent = script_content;
      (document.getElementsByTagName("head")[0] || document.body).appendChild(
        script_tag
      );
    }
  }, 10);
});
