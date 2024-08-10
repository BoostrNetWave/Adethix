if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayAd);
} else {
    setTimeout(() => {
        displayAd();
    }, 230)
}

// change server base url for getting ad, tracking views and click

let on_view;

async function displayAd() {
    try {
        const element = document.getElementById("adethix");
        if (!element) return;

        const baseUrl = "https://adethix.com/api/track/getad";

        const params = new URLSearchParams({
            adType: element.dataset.bnType,
            publisher: element.dataset.bnPublisher,
            origin: window.location.origin + "/",
            pathname: window.location.pathname,
        });

        const url = `${baseUrl}?${params.toString()}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // console.log(response)

        if (response.status !== 200) {
            return;
        }

        if (response.status === 200) {
            const data = await response.json();
            // console.log(data);
            element.setAttribute('data-bn-ad', data._id);
            element.style.zIndex = "999999999";

            /*
             utm_source: 'example.com',
            utm_medium: 'banner',
            utm_campaign: 'summer_sale',
            utm_content: 'header_banner',
            */

            if (element.dataset.bnType === 'textonly') {
                // console.dir(element);

                element.style.display = 'inline-block';
                element.style.overflow = 'hidden';
                element.style.backgroundColor = '#f1f1f3';
                element.style.border = '1px solid #e1e1e7';
                element.style.borderRadius = '12px';
                element.style.padding = '12px 12px 12px 12px';
                element.style.margin = '10px'


                // outer span
                let outerSpan = document.createElement('span');

                // inner span
                let innerSpan = document.createElement('span');
                innerSpan.className = 'ad-wrap';

                // adTextLink 
                let adTextLink = document.createElement('a');
                adTextLink.href = data.linkUrl;
                adTextLink.className = "ad-text";
                adTextLink.target = "_blank";
                adTextLink.rel = "sponsored";
                adTextLink.innerText = data.content;
                adTextLink.style.cursor = 'pointer';
                adTextLink.style.textDecoration = 'none';
                adTextLink.style.color = '#212121'
                adTextLink.style.display = 'block';
                adTextLink.style.fontSize = '0.875rem';
                adTextLink.style.lineHeight = '1.5';
                adTextLink.style.letterSpacing = '0px';
                adTextLink.style.fontWeight = '400';
                adTextLink.style.marginLeft = '12px';
                adTextLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

                innerSpan.appendChild(adTextLink);

                // ad via link
                let sponsorLink = document.createElement('a');
                sponsorLink.innerText = "ads via Adethix"
                sponsorLink.href = 'https://adethix.com/';
                sponsorLink.className = "adethix-poweredby";
                sponsorLink.target = "_blank";
                sponsorLink.rel = "sponsored";
                sponsorLink.style.display = 'block';
                sponsorLink.style.fontSize = '0.75rem';
                sponsorLink.style.lineHeight = '1.5';
                sponsorLink.style.letterSpacing = '0px';
                sponsorLink.style.fontWeight = '400';
                sponsorLink.style.marginLeft = '12px';
                sponsorLink.style.color = 'rgb(182, 190, 201)';
                sponsorLink.style.marginTop = '4px';
                sponsorLink.style.textDecoration = 'none';
                sponsorLink.style.cursor = 'pointer';
                sponsorLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
                sponsorLink.addEventListener('mouseenter', function () {
                    sponsorLink.style.color = 'rgb(0, 0, 0)';
                });

                sponsorLink.addEventListener('mouseleave', function () {
                    sponsorLink.style.color = 'rgb(182, 190, 201)';
                });

                outerSpan.appendChild(innerSpan);
                outerSpan.appendChild(sponsorLink)

                // ========== media query ========== //

                const mediaQuery = window.matchMedia('(min-width: 600px)');
                function handleMediaQueryChange(event) {
                    if (event.matches) {
                        adTextLink.style.fontSize = '1rem';
                        adTextLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
                    }
                    else {
                        adTextLink.style.fontSize = '0.875rem';
                        adTextLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
                    }
                }
                mediaQuery.addEventListener('change', handleMediaQueryChange);
                handleMediaQueryChange(mediaQuery);

                // if change media query then change the custom ad width 
                const secondMediaQuery = window.matchMedia('(max-width: 450px)');
                function handleSecondMediaQueryChange(event) {
                    if (event.matches) {
                        element.style.textAlign = 'center';
                        element.style.padding = '12px 5px'

                        adTextLink.style.marginLeft = '0px';
                        adTextLink.style.marginTop = '5px';
                    }
                }
                secondMediaQuery.addEventListener('change', handleSecondMediaQueryChange);
                handleSecondMediaQueryChange(secondMediaQuery);

                // ========== media query ========== //

                // fixed for large screen //
                const changeType = window.matchMedia('(min-width: 880px)');
                function handleChangeMediaQuery(event) {
                    if (event.matches) {
                        element.style.maxWidth = '450px';
                        element.style.position = 'fixed';
                        element.style.bottom = '30px';
                        element.style.right = '30px';
                    }
                }
                changeType.addEventListener('change', handleChangeMediaQuery);
                handleChangeMediaQuery(changeType);

                element.appendChild(outerSpan);
            } else if (element.dataset.bnType === 'video') {
                element.style.maxWidth = "380px";
                element.style.margin = "0px auto"
                let outerSpan = document.createElement('span');
                // outerSpan.style.maxWidth = "380px";

                let innerSpan = document.createElement('span');
                innerSpan.className = 'ad-wrap';
                innerSpan.style.display = "flex";
                innerSpan.style.flexDirection = "column";

                let video = document.createElement('video');

                video.style.maxWidth = "380px";
                video.muted = true;
                video.controls = true;

                let source = document.createElement('source');

                source.src = data.video.url;
                source.type = 'video/mp4';

                video.appendChild(source);

                innerSpan.appendChild(video);

                let innerSpan2 = document.createElement('span');
                innerSpan2.style.display = "flex";
                innerSpan2.style.justifyContent = "space-between";
                innerSpan2.style.alignItems = "center";

                let button = document.createElement("button");
                button.style.backgroundColor = "#2e6dd1";
                button.style.border = "none";
                button.style.borderRadius = "5px";
                button.style.maxWidth = "120px";
                button.style.marginTop = "5px";

                let adTextLink = document.createElement('a');
                adTextLink.href = data.linkUrl;
                adTextLink.className = "ad-text";
                adTextLink.target = "_blank";
                adTextLink.rel = "sponsored";
                adTextLink.innerText = "Show more";
                adTextLink.style.cursor = 'pointer';
                adTextLink.style.textDecoration = 'none';
                adTextLink.style.color = '#fff'
                adTextLink.style.display = 'block';
                adTextLink.style.fontSize = '1rem';
                adTextLink.style.lineHeight = '1.5';
                adTextLink.style.fontWeight = '400';
                adTextLink.style.margin = '4px auto';
                adTextLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

                button.appendChild(adTextLink);

                innerSpan2.appendChild(button);

                let sponsorLink = document.createElement('a');
                sponsorLink.innerText = "ads via Adethix"
                sponsorLink.href = 'https://adethix.com/';
                sponsorLink.className = "adethix-poweredby";
                sponsorLink.target = "_blank";
                sponsorLink.rel = "sponsored";
                sponsorLink.style.display = 'block';
                sponsorLink.style.fontSize = '0.75rem';
                sponsorLink.style.lineHeight = '1.5';
                sponsorLink.style.letterSpacing = '0px';
                sponsorLink.style.fontWeight = '400';
                sponsorLink.style.marginLeft = '12px';
                sponsorLink.style.color = 'rgb(182, 190, 201)';
                sponsorLink.style.marginTop = '4px';
                sponsorLink.style.textDecoration = 'none';
                sponsorLink.style.cursor = 'pointer';
                sponsorLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
                sponsorLink.addEventListener('mouseenter', function () {
                    sponsorLink.style.color = 'rgb(0, 0, 0)';
                });

                sponsorLink.addEventListener('mouseleave', function () {
                    sponsorLink.style.color = 'rgb(182, 190, 201)';
                });

                innerSpan2.appendChild(sponsorLink);

                outerSpan.appendChild(innerSpan);
                innerSpan.appendChild(innerSpan2);

                outerSpan.appendChild(innerSpan2);

                element.append(outerSpan)

                video.play();

                // fixed for large screen //
                const changeType = window.matchMedia('(min-width: 1000px)');
                function handleChangeMediaQuery(event) {
                    if (event.matches) {
                        element.style.position = 'fixed';
                        element.style.bottom = '30px';
                        element.style.right = '30px';
                    }
                }
                changeType.addEventListener('change', handleChangeMediaQuery);
                handleChangeMediaQuery(changeType);

                // =========== Tracking click ===========
                button.addEventListener("click", (e) => {
                    const dataset = element.dataset;

                    const url = "https://adethix.com/api/track/clicks";
                    const data = {
                        ad: dataset.bnAd,
                        publisher: dataset.bnPublisher,
                        origin: window.location.origin + "/",
                        pathname: window.location.pathname,
                        on_view: on_view
                    };
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok ' + response.statusText);
                            }
                            return response.json();
                        })
                        .then(click => {
                            console.log('Success Click:');
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                // =========== Tracking click ===========
            } else {
                // =============== adding style ================= //

                element.style.display = 'block';
                element.style.overflow = 'hidden';
                // element.style.paddingLeft = '130px';
                element.style.backgroundColor = '#f1f1f3';
                element.style.border = '1px solid #e1e1e7';
                element.style.borderRadius = '12px';
                element.style.padding = '12px 12px 12px calc(142px)';
                // element.style.width = '100%';
                element.style.margin = '10px'


                // outer span
                let outerSpan = document.createElement('span');

                // inner span
                let innerSpan = document.createElement('span');
                innerSpan.className = 'ad-wrap';

                // adImgLink 
                let adImgLink = document.createElement('a');
                adImgLink.href = data.linkUrl;
                adImgLink.className = "ad-img";
                adImgLink.target = "_blank";
                adImgLink.rel = "sponsored";
                adImgLink.style.textDecoration = 'none';
                adImgLink.style.cursor = 'pointer';
                adImgLink.style.float = 'left';
                adImgLink.style.marginLeft = '-130px';
                adImgLink.style.width = '130px';
                adImgLink.style.height = '100px';

                // image 
                let adImage = document.createElement('img');
                adImage.src = data.image.url;
                adImage.alt = 'ads via Boostr Netwave';
                adImage.style.border = '0px';
                adImage.style.height = '100px';
                adImage.style.width = '130px';
                adImage.style.maxWidth = '130px';
                adImage.style.verticalAlign = 'middle';

                adImgLink.appendChild(adImage);
                innerSpan.appendChild(adImgLink);

                // adTextLink 
                let adTextLink = document.createElement('a');
                adTextLink.href = data.linkUrl;
                adTextLink.className = "ad-text";
                adTextLink.target = "_blank";
                adTextLink.rel = "sponsored";
                adTextLink.innerText = data.content;
                adTextLink.style.cursor = 'pointer';
                adTextLink.style.textDecoration = 'none';
                adTextLink.style.color = '#212121'
                adTextLink.style.display = 'block';
                adTextLink.style.fontSize = '0.875rem';
                adTextLink.style.lineHeight = '1.5';
                adTextLink.style.letterSpacing = '0px';
                adTextLink.style.fontWeight = '400';
                adTextLink.style.marginLeft = '12px';
                adTextLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

                innerSpan.appendChild(adTextLink);

                // ad via link
                let sponsorLink = document.createElement('a');
                sponsorLink.innerText = "ads via Adethix"
                sponsorLink.href = 'https://adethix.com/';
                sponsorLink.className = "adethix-poweredby";
                sponsorLink.target = "_blank";
                sponsorLink.rel = "sponsored";
                sponsorLink.style.display = 'block';
                sponsorLink.style.fontSize = '0.75rem';
                sponsorLink.style.lineHeight = '1.5';
                sponsorLink.style.letterSpacing = '0px';
                sponsorLink.style.fontWeight = '400';
                sponsorLink.style.marginLeft = '12px';
                sponsorLink.style.color = 'rgb(182, 190, 201)';
                sponsorLink.style.marginTop = '4px';
                sponsorLink.style.textDecoration = 'none';
                sponsorLink.style.cursor = 'pointer';
                sponsorLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
                sponsorLink.addEventListener('mouseenter', function () {
                    sponsorLink.style.color = 'rgb(0, 0, 0)';
                });

                sponsorLink.addEventListener('mouseleave', function () {
                    sponsorLink.style.color = 'rgb(182, 190, 201)';
                });

                outerSpan.appendChild(innerSpan);
                outerSpan.appendChild(sponsorLink)

                // ========== media query ========== //

                const mediaQuery = window.matchMedia('(min-width: 600px)');
                function handleMediaQueryChange(event) {
                    if (event.matches) {
                        adTextLink.style.fontSize = '1rem';
                        adTextLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
                    }
                    else {
                        adTextLink.style.fontSize = '0.875rem';
                        adTextLink.style.fontFamily = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
                    }
                }
                mediaQuery.addEventListener('change', handleMediaQueryChange);
                handleMediaQueryChange(mediaQuery);

                // if change media query then change the custom ad width 
                const secondMediaQuery = window.matchMedia('(max-width: 450px)');
                function handleSecondMediaQueryChange(event) {
                    if (event.matches) {
                        element.style.textAlign = 'center';
                        element.style.padding = '12px 5px'

                        adImgLink.style.float = 'none';
                        adImgLink.style.marginLeft = '0px';

                        adTextLink.style.marginLeft = '0px';
                        adTextLink.style.marginTop = '5px';
                    }
                }
                secondMediaQuery.addEventListener('change', handleSecondMediaQueryChange);
                handleSecondMediaQueryChange(secondMediaQuery);

                // ========== media query ========== //



                // =============== dirfferent style depending upon type =============== //

                if (element.dataset.bnType === 'custom') {

                    let elementWidth = element.clientWidth;

                    if (elementWidth <= 380) {
                        element.style.textAlign = 'center';
                        element.style.padding = '12px 8px';
                        element.style.maxWidth = '320px';

                        adImgLink.style.float = 'none';
                        adImgLink.style.marginLeft = '0px';

                        adTextLink.style.marginLeft = '0px';
                        adTextLink.style.marginTop = '5px';
                    }

                } else if (element.dataset.bnType === 'sidebar') {
                    // sidebar ad
                    element.style.textAlign = 'center';
                    element.style.maxWidth = '300px';
                    element.style.padding = '12px 10px';

                    adImgLink.style.float = 'none';
                    adImgLink.style.marginLeft = '0px';

                    adTextLink.style.marginLeft = '0px';
                    adTextLink.style.marginTop = '5px';
                } else {

                    // fixed for large screen //
                    const changeType = window.matchMedia('(min-width: 800px)');
                    function handleChangeMediaQuery(event) {
                        if (event.matches) {
                            element.style.textAlign = 'center';
                            element.style.maxWidth = '220px';
                            element.style.padding = '12px 15px';
                            element.style.position = 'fixed';
                            element.style.bottom = '30px';
                            element.style.right = '30px';

                            adImgLink.style.float = 'none';
                            adImgLink.style.marginLeft = '0px';

                            adTextLink.style.marginLeft = '0px';
                            adTextLink.style.marginTop = '5px';
                            adTextLink.style.padding = '0px 18px';
                        }
                    }
                    changeType.addEventListener('change', handleChangeMediaQuery);
                    handleChangeMediaQuery(changeType);
                }

                // =============== dirfferent style depending upon type =============== //

                element.appendChild(outerSpan);
            }

            // =========== Tracking click ===========
            element.addEventListener("click", (e) => {
                if (element.dataset.bnType === "video") {
                    return;
                }
                const dataset = element.dataset;

                const url = "https://adethix.com/api/track/clicks";
                const data = {
                    ad: dataset.bnAd,
                    publisher: dataset.bnPublisher,
                    origin: window.location.origin + "/",
                    pathname: window.location.pathname,
                    on_view: on_view
                };
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Set the content type to JSON
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(click => {
                        console.log('Success Click:');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            // =========== Tracking click ===========

            // even if page does not reload when the element came to the viewport this will work
            observerAd.observe(element);
        }
    } catch (error) {
        console.error('Error displaying in custom ad:', error);
    }
}

const observerAd = new window.IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
        const dataset = entry.target.dataset;

        const url = "https://adethix.com/api/track/views";
        const data = {
            ad: dataset.bnAd,
            publisher: dataset.bnPublisher,
            origin: window.location.origin + "/",
            pathname: window.location.pathname
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(view => {
                on_view = view._id;
                console.log('Success View:');
            })
            .catch(error => {
                console.error('Error:', error);
            });

        observer.unobserve(entry.target);

    }
}, {
    root: null,
    threshold: 1,
});