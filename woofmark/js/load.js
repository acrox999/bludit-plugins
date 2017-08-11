// Newline fix for WYSIWYG mode -- http://wadmiraal.net/lore/2012/06/14/contenteditable-hacks-returning-like-a-pro/
$("div.wk-wysiwyg").keydown(function(e) {
	if(e.which === 13) {
		var doxExec = false;

		try {
			doxExec = document.execCommand('insertBrOnReturn', false, true);
		}
		catch (error) {
			// IE throws an error if it does not recognize the command...
		}

		if (doxExec) {
		// Hurray, no dirty hacks needed !
		return true;
		}
		// Standard
		else if (window.getSelection) {
			e.stopPropagation();

			var selection = window.getSelection(),
				range = selection.getRangeAt(0),
				br = document.createElement("br");
				
				range.deleteContents();
				range.insertNode(br);
				range.setStartAfter(br);
				range.setEndAfter(br);
				range.collapse(false);
				selection.removeAllRanges();
				selection.addRange(range);

				return false;
		}
		// IE
		else if ($.browser.msie) {
			e.preventDefault();
			var range = document.selection.createRange();
			range.pasteHTML('<BR><SPAN class="--IE-BR-HACK"></SPAN>');

			// Move the caret after the BR
			range.moveStart('character', 1);

			return false;
		}

		// Last resort, just use the default browser behavior and pray...
		return true;
	}
});

/* var debug=1;
$("div.wk-wysiwyg").keydown(function(e) {
	if(e.which === 13) {
		$(".wk-wysiwyg").on('blur keyup paste focus focusout',function (){
			if($(".wk-wysiwyg").children().length==0)
			{
				if(debug) console.log("add p");
				//Only Test now
				var text=$(".wk-wysiwyg").text();
				$(".wk-wysiwyg").empty();
				$(".wk-wysiwyg").append("<p>"+text+"</p>");
			}
			
			if(debug) console.log("-------------------------");
			if(debug) console.log($(".wk-wysiwyg").children());
			for(var i=0;i<$(".wk-wysiwyg").children().length;i++)
			{
				var tag=$(".wk-wysiwyg").children().eq(i).prop("tagName").toLowerCase();
				console.log("i="+i+" ["+tag+"]");
				if(i%3==2)
				{
					if($(".wk-wysiwyg").children().length==i+1 && $(".wk-wysiwyg").children().last().text()=="")
						continue;
					
					if(tag!="hr")
					{
						if(debug) console.log("  add hr");
						$(".wk-wysiwyg").children().eq(i).before("<hr/>")    
					}
				}
				else if(tag=="hr")
				{
					if(debug) console.log("  rm hr");
					$(".wk-wysiwyg").children().get(i).remove();
				}
				else if(tag=="br")
				{
					if(debug) console.log("  br");
					$(".wk-wysiwyg").children().eq(i).remove();
					var text=$(".wk-wysiwyg").children().length>=i?$(".wk-wysiwyg").children().eq(i+1).text():"";
					$(".wk-wysiwyg").children().eq(i).after($("<p>"+text +"</p>"));
					$(".wk-wysiwyg").children().eq(i).append("<p>"+text+"</p>");
					if($(".wk-wysiwyg").children().length>=i+1) 
						$(".wk-wysiwyg").children().eq(i+1).remove();    
				}
				else if (tag!="p")
				{
					if(debug) console.log("  not p");
					var text=$(".wk-wysiwyg").children().eq(i).text();
					$(".wk-wysiwyg").children().eq(i).remove();
					$(".wk-wysiwyg").children().eq(i).after($("<p>"+text +"</p>"));
				}
				
			}
			
		});
	}
}); */
// WYSIWYG save fix for Bludit
$("button").on('click', function() {
	if( $(this).html() === "Save" ) {
		
		// Get content from WYSIWYG editor
		//var content = wm.editable.innerHTML;
		var content = wm.value(); // Save in Markdown.

		// Convert to Markdown for a cleaner base
		//var content = wm.parseHTML();
		
		// Trim the content
		//content = (content.trim) ? content.trim() : content.replace(/^\s+/,'');
		
		// Give the content from WYSIWYG (if needed) to textarea so that Bludit could catch it
		if( !($("div.wk-wysiwyg").hasClass("wk-hide")) ) {
			$("textarea#jscontent").html(content);
		}
	}
});

$(document).ready(function(){
	// Restyle buttons to match admin's theme
	$(".wk-mode").addClass("uk-button");
	$(".wk-command").addClass("uk-button uk-button-primary");
});