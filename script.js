window.addEventListener('DOMContentLoaded', event => {
    let scrollToTopVisible = false;
    
    const searchButton = document.getElementById('searchButton')
    
    searchButton.addEventListener('click', event => {
        const url = "https://binaryjazz.us/wp-json/genrenator/v1/genre/4";
        window.fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json)
            let results = "";
            for (let i=0; i < json.length; i++) {
    	        results += '<div class="col-lg-6">';
        	        results += '<div class="portfolio-item">';
            	        results += '<div class="caption">';
                	        results += '<div class="caption-content">';
                    	        results += '<div class="h1">'+ json[i] + '</div>';
                	        results += '</div>';
            	        results += '</div>';
            	        results += `<div id="img${i}"></div>`;
        	        results += '</div>';
    	        results += '</div>';
            }
            document.getElementById("resultsGrid").innerHTML = results;
            
            
            for (let i=0; i < json.length; i++) {
                results = "";
                const url2 = "https://api.unsplash.com/search/photos?"
                const access_key = 'ol8t2j4EXcsE9hoksKXiDgOVhrlFm25GoF4u3gEMJxA';
                window.fetch(url2 + new URLSearchParams({
                    query: json[i],
                    per_page: 1,
                    }), {
                    headers: {
                        Authorization: `Client-ID ${access_key}`
                    }
                }).then(function(response) {
    	            return response.json();
                }).then(function(json2) {
                    console.log(json2);
                    
                    if (json2.results[0].urls.full != undefined){
                        const image = json2.results[0].urls.full;
                        const description = json2.results[0].description;
                        document.getElementById(`img${i}`).innerHTML = `<img class="img-fluid" src="${image}" alt="${description}" />`;
                    }
                    else {
                        document.getElementById(`img${i}`).innerHTML = `<img class="img-fluid" src="https://images.unsplash.com/photo-1534294668821-28a3054f4256?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" alt="unknown" />`;
   
                    }
                    
                    
                })
            }
            document.getElementById('results').style.display = "block";
            document.getElementById('jumpHere').style.background = "#fff";
        })
        
    
    })
    
    
    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
