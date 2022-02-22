$(document).ready(function () {

    let sss = 0;
    setInterval(() => {
        if (sss === 0) {
            $(".sss").css("visibility", "visible");
            sss = 1;
        } else {
            $(".sss").css("visibility", "hidden");
            sss = 0;
        }
    }, 800);

    let menu = "open";

    $(".menu-button").click(() => {
        if(window.innerWidth > 414) {
            if (menu === "open") {
                $("#menu-container").css("margin-left", "0vw");
                menu = "close";
            } else {
                $("#menu-container").css("margin-left", "-50vw");
                menu = "open";
            }
        } else {
            if (menu === "open") {
                $("#menu-container").css("margin-left", "0vw");
                menu = "close";
            } else {
                $("#menu-container").css("margin-left", "-65vw");
                menu = "open";
            }
        }
    });

    $("#container").click(() => {
        if(window.innerWidth > 414) {
            $("#menu-container").css("margin-left", "-50vw");
        } else {
            $("#menu-container").css("margin-left", "-65vw");
        }
        menu = "open";
    })

    $(".close-0, .close-1").click(() => {
        if(window.innerWidth > 414) {
            $("#menu-container").css("margin-left", "-50vw");
        } else {
            $("#menu-container").css("margin-left", "-65vw");
        }
        menu = "open";
    })



    $(".service-card").mouseenter(
        () => {
            $("#service-card-top").css("transform", "translateY(-100%)");
            $(".circle").css("transform", "translateY(-200%)");
            setTimeout(() => {
                $("#service-card-top").css("zIndex", "1");
                $("#service-card-top").css("transform", "translateY(0)");
            }, 500);

        }).mouseleave(() => {
            $("#service-card-top").css("transform", "translateY(-100%)");
            setTimeout(() => {
                $("#service-card-top").css("zIndex", "11");
                setTimeout(() => {
                    $(".circle").css("transform", "translateY(0)");
                    $("#service-card-top").css("transform", "translateY(0)");
                }, 250)
            }, 500);

        })

    // filter portfolios
    $("select.category").change(updateFilter);

    function updateFilter() {
        let category = $('select.category').val();
        $('.property-load-section')
            .find('.property-item')
            .hide()
            .filter(function () {
                let matchCategory = true;
                if (category !== "all") {
                    matchCategory = $(this).attr('data-category') === category;
                }
                return matchCategory;
            }).fadeIn('slow');
    }


    $(".image").attr({
        "data-toggle": "modal",
        "data-target": ".bd-example-modal-lg"
    })


    //carousel

    $("select.category").change(carousel);

    function carousel() {
        let category = $('select.category').val();
        let chekData = $('.property-item');
        let images = $(".img-fluid");
        let carouselInner = $(".carousel-inner");
        let carouselIndicators = $(".carousel-indicators");
        let carouselItem = $(".carousel-item");



        $(".carousel-item").remove();
        $(".indicate").remove();
        let counter2 = 0;
        let counter1 = 0;
        let indic = 0;
        for (let i = 0; i < images.length; i++) {
            if ($(`.property-item:nth-child(${i + 1})`).attr("data-category") === category) {
                $(`.property-item:nth-child(${i + 1})`).attr("data-" + category, counter1);
                counter1++;
            } else {
                $(`.property-item:nth-child(${i + 1})`).attr("data-all", counter2);
                counter2++;
            }
            if (category === $(chekData[i]).attr("data-category")) {
                $(chekData[i]).removeAttr("data-all");
                let carouselItem = document.createElement("div");
                $(carouselItem).attr("class", "carousel-item");
                let carouselImage = document.createElement("img");
                let src = $(images[i]).attr("src");
                $(carouselImage).attr({ "src": src, "class": "d-block w-100" });
                carouselItem.appendChild(carouselImage);
                carouselInner[0].appendChild(carouselItem);
                let indicator = document.createElement("li");
                $(indicator).attr({
                    "data-target": "#carouselExampleIndicators",
                    "data-slide-to": indic,
                    "class": "indicate"
                });
                carouselIndicators[0].appendChild(indicator);
                indic++;
            } else if (category === "all") {
                let carouselItem = document.createElement("div");
                $(carouselItem).attr("class", "carousel-item");
                let carouselImage = document.createElement("img");
                let src = $(images[i]).attr("src");
                $(carouselImage).attr({ "src": src, "class": "d-block w-100" });
                carouselItem.appendChild(carouselImage);
                carouselInner[0].appendChild(carouselItem);
                let indicator = document.createElement("li");
                $(indicator).attr({
                    "data-target": "#carouselExampleIndicators",
                    "data-slide-to": indic,
                    "class": "indicate"
                });
                carouselIndicators[0].appendChild(indicator);
                indic++;
            }

        }
    }

    carousel();


    $(".image").click(function () {
        let category = $('select.category').val();
        let carouselItem = $(".carousel-item");
        let carouselIndicators = $(".indicate");
        let num = $(this).attr("data-" + category);
        carouselItem.removeClass("active");
        carouselIndicators.removeClass("active")

        $(carouselItem[num]).attr("class", "carousel-item active")
        $(carouselIndicators[num]).attr("class", "indicate active")
    })

});