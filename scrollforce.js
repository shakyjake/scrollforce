/**
 * Fix for websites (facebook) that forcibly disable scrolling by setting the root container to position: fixed !important
 */
function fix_fb(){
	const root = document.querySelector('div');
	if(root){
		root.style.position = 'relative !important';
	}
}

/**
 * Returns true if a given string ends with another string
 * @param {string} haystack - the string to search in
 * @param {string} needle - the string to search for
 * @returns {boolean}
 */
function ends_with(haystack, needle){
	return haystack.substring(haystack.length - needle.length) === needle;
}

(() => {

    if(typeof(window) === 'undefined'){/* No window object - must be running in a non-browser environment */
        return;
    }

    if(typeof(document) === 'undefined'){/* No document object - mustn't be running in a DOMish environment */
        return;
    }

    if(typeof(document.body) === 'undefined'){/* No body - mustn't be an html document */
        return;
    }

    if(!document.body){/* No body - mustn't be an html document (document.body is null on svg files) */
        return;
    }
	
	if('location' in window){
		if('hostname' in window.location){
			if(ends_with(window.location.hostname, 'facebook.com')){
				/*
					Really didn't want to access window.location but Facebook breaks 
					scrolling by adding "position: fixed !important" to the root div
				*/
				window.addEventListener('load', fix_facebook);
			}
		}
	}
    
    const body_node = document.body;
    const html_node = document.body.parentNode;
    
    const observer_config = {
        attributes: true,
        childList: false,
        subtree: false
    };
    
    const init_overflow_body = window.getComputedStyle(body_node).getPropertyValue('overflow-y');
    const init_overflow_html = window.getComputedStyle(html_node).getPropertyValue('overflow-y');
    
    const observer_callback = function(mutations){
        mutations.forEach((mutation) => {
            if(mutation.type === 'attributes'){
                if(mutation.attributeName  === 'class' || mutation.attributeName  === 'style'){
                    
                    const mutation_target = mutation.target;
                    
                    if(mutation_target.nodeName.toLowerCase() === 'body'){
                        const current_overflow = window.getComputedStyle(body_node).getPropertyValue('overflow-y');
                        if(current_overflow !== init_overflow_body){
                            body_node.style.overflowY = init_overflow_body;
                        }
                    }
                    
                    if(mutation_target.nodeName.toLowerCase() === 'html'){
                        const current_overflow = window.getComputedStyle(html_node).getPropertyValue('overflow-y');
                        if(current_overflow !== init_overflow_html){
                            html_node.style.overflowY = init_overflow_html;
                        }
                    }
                    
                }
            }
        });
    }
    
    const observer = new MutationObserver(observer_callback);

    if(init_overflow_body !== 'hidden'){
        observer.observe(body_node, observer_config);
    }

    if(init_overflow_html !== 'hidden'){
        observer.observe(html_node, observer_config);
    }


})();
