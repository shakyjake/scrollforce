(() => {
    
    const Body = document.body;
    const HTML = document.body.parentNode;
    
    const MutationConfig = {
        attributes: true,
        childList: false,
        subtree: false
    };
    
    const OriginalOverflowBody = window.getComputedStyle(Body).getPropertyValue('overflow-y');
    const OriginalOverflowHTML = window.getComputedStyle(HTML).getPropertyValue('overflow-y');
    
    const MutationCallback = function(Mutations){
        Mutations.forEach((Mutation) => {
            if(Mutation.type === 'attributes'){
                if(Mutation.attributeName  === 'class' || Mutation.attributeName  === 'style'){
                    
                    const Target = Mutation.target;
                    
                    if(Target.nodeName.toLowerCase() === 'body'){
                        const OverflowBody = window.getComputedStyle(Body).getPropertyValue('overflow-y');
                        if(OverflowBody !== OriginalOverflowBody){
                            Body.style.overflowY = OriginalOverflowBody;
                        }
                    }
                    
                    if(Target.nodeName.toLowerCase() === 'html'){
                        const OverflowHTML = window.getComputedStyle(HTML).getPropertyValue('overflow-y');
                        if(OverflowHTML !== OriginalOverflowHTML){
                            HTML.style.overflowY = OriginalOverflowHTML;
                        }
                    }
                    
                }
            }
        });
    }
    
    const Observer = new MutationObserver(MutationCallback);

    if(OriginalOverflowBody !== 'hidden'){
        Observer.observe(Body, MutationConfig);
    }

    if(OriginalOverflowHTML !== 'hidden'){
        Observer.observe(HTML, MutationConfig);
    }


})();
