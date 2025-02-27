
$(document).ready(function () {

    console.log("loaded script")

    //Dynamically create and catalog headlines from the JSON files.
    //=============================================================

    // catalog the headline by storing the topic from the data atribute.  
    var topics = new Set();

    // Dynamically create headlines with a left-wing bias.
    var injectLeft = $.getJSON('headlinesLeft.json', function (data) {
        let html = '';
        $.each(data, function (index, item) {
            topics.add(item.topic);
            html += `
            <div class="article" data-topic="${item.topic}">
                <h3 class="source">${item.source}</h3>
                <a class="article-link" href="${item.href}">${item.headline} | </a>
            </div>`;
        });
        $('.article-container.left-bias').html(html);
    });

    // Dynamically create headlines with a left-wing bias.
    var injectRight = $.getJSON('headlinesRight.json', function (data) {
        let html = '';
        $.each(data, function (index, item) {
            topics.add(item.topic);
            html += `
            <div class="article" data-topic="${item.topic}">
                <h3 class="source">${item.source}</h3>
                <a class="article-link" href="${item.href}">${item.headline} | </a>
            </div>`;
        });
        $('.article-container.right-bias').html(html);
    });

    //Dynamically create filter buttons.
    //==================================

    // By storing the creation functions as variables the topic data stored in the set can then be called here to create the filter buttons
    $.when(injectLeft, injectRight).done(function () {
        topics.forEach(function (topic) {
            // (.length === 0 ensures that is is only created if the filter-btn doesnt already exist)
            if ($('.filter-btn-container button[data-topic="' + topic + '"]').length === 0) {
                $('.filter-btn-container').append(
                    '<button class="filter-btn" data-topic="' + topic + '">' + topic + '</button>'
                );
            }
        });
    });

    // Filter Button Functionality 
    $(document).on('click', '.filter-btn', function () {
        var selectedTopic = $(this).data('topic');

        // If the clicked filter button is "all" show all articles and remove the "clicked" class from all filters buttons.
        if (selectedTopic === "all") {
            $('.article').show();
            $('.filter-btn').removeClass('clicked');

            // else (if the clicked filter button is not all) add the class clicked but remove it from the other filter buttons.
        } else {
            $('.filter-btn').removeClass('clicked');
            $(this).addClass('clicked')

            // Actual filter functionality, if the article matches the clicked filter button then use then show the element.
            $('.article').each(function () {
                if ($(this).data('topic') === selectedTopic) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    //Mouse events for the source tooltip.
    //====================================

    //Use if else statements to chain mouse events.
    $('.article-container').on('mouseenter mousemove mouseleave', '.article', function (event) {
        if (event.type === 'mouseenter') {
            console.log('enter');
            $('.source', this).css({
                'opacity': '1',
                top: event.pageY - $(window).scrollTop() + 'px',
                left: event.pageX + 20 + 'px'

            });
        } else if (event.type === 'mousemove') {
            $('.source', this).css({
                top: event.pageY - $(window).scrollTop() + 'px',
                left: event.pageX + 20 + 'px',
                // 'transition': 'all 0.5s cubic- bezier(0.175, 0.885, 0.32, 1.275)'
            });
        } else if (event.type === 'mouseleave') {
            $('.source', this).css({
                'opacity': '0',
                // 'top': '0px', 'left': '0px'
            });
            console.log('leave');
        }
    });

    //Mouse events for the bias filter.
    //=================================

    //Hover State
    $('.btn').hover(
        function (e) { $(this).addClass('hover') },
        function (e) {
            $(this).removeClass('hover')

        })

    //Left-winng bias filter
    $('.btn.left').click(function (event) {

        //Change the headline "A collection of bias" to red to have the propper blend color.
        var reset = $('.reset')
        reset.addClass('red')
        if (reset.hasClass, 'blue') {
            reset.removeClass('blue')
        }
        //Change the filter buttons to red to have the propper blend color.

        var buttons = $('.filter-btn')
        buttons.addClass('red')
        if (buttons.hasClass, 'blue') {
            buttons.removeClass('blue')
        }

        // Remove the button from DOM, Found that using css is a little smoother that .show()/.hide()
        $(this).css('display', 'none')
        $('.btn.right').css('display', 'flex')

        // Change the pointer events so the right tooltips appear.
        $('.article-container.left-bias .article').css('pointer-events', 'all')
        $('.article-container.right-bias .article').css('pointer-events', 'none')

        // Expand the filter
        $('.filter.left').toggleClass('expand')
        $('.filter.right').removeClass('expand')
    })

    // Right wing bias filter, same as left wing just inverted. 
    $('.btn.right').click(function (event) {
        var reset = $('.reset')
        reset.addClass('blue')
        if (reset.hasClass, 'red') {
            reset.removeClass('red')
        }
        var buttons = $('.filter-btn')
        buttons.addClass('blue')
        if (buttons.hasClass, 'red') {
            buttons.removeClass('red')
        }

        $(this).css('display', 'none')
        $('.btn.left').css('display', 'flex')

        $('.article-container.left-bias .article').css('pointer-events', 'none')
        $('.article-container.right-bias .article').css('pointer-events', 'all')

        $('.filter.right').toggleClass('expand')
        $('.filter.left').removeClass('expand')
    })

    // Reset button.
    $('.reset').click(function (event) {
        $(this).removeClass('blue red')
        $('.filter-btn').removeClass('blue red')
        $('.expand').removeClass('expand')
        $('.article-container.left-bias .article, .article-container.right-bias .article').css('pointer-events', 'none');
        $('.btn.left, .btn.right').css('display', 'flex');
    })

});