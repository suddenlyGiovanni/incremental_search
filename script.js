$( document ).ready( function () {
    $( '#input' ).focus();
    /*_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ */
    var xhr;
    var clearDelay;

    /* DOM GRAPLES */
    var $input = $( '#input' );
    var $resultsContainer = $( '#results' );


    /* EVENT LISTENERS _______________________________________________________*/

    // INPUT EventListener.
    $input.on( 'input', search );

    // MOUSE ENTER EventListener.
    $resultsContainer.on( 'mouseover', select );
    $resultsContainer.on( 'mousedown', handleInput );

    // KEYDOWN EventListener.
    $input.on( 'keydown', handleInput );

    // BLUR EventListener.
    $input.blur( function () {
        // 5. blur on field or mousedown on document: results disappear
        $resultsContainer.hide();
    } );

    // FOCUS EventListener.
    // 6. focus on field: matching results reappear
    $input.focus( ajaxRequest );

    /*_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ */


    /* FUNCTION DECLARATION _________________________________________________*/

    // HANDLE SEARCH
    function search(e) {
        e.stopPropagation();
        var value = $input.val().trim().toLowerCase();
        // 1.a. if the field has no length, hide the results
        if ( value.length == 0 ) {
            $resultsContainer.hide();
        } else {
            clearTimeout(clearDelay);
            clearDelay = setTimeout(function() {
                ajaxRequest(value);
            }, 250);
        }
    }


    // DISPLAY OPTIONS
    function ajaxRequest( query ) {
        // AJAX REQUEST HERE!!!
        if ( xhr ) {
            xhr.abort();
        }
        xhr = $.ajax( {
            url: 'https://flame-egg.glitch.me/',
            data: {
                q: query
            },
            success: function ( data ) {
                makeHtmlString( data );
            }
        } );
    }


    //  DISPLAY OPTIONS
    function displayOptions( result ) {
        // 1.f. insert the html string in to the DOM.
        $resultsContainer.html( result ).show();
    }

    // MAKEHTMLSTRING
    function makeHtmlString( data ) {
        var html = '';
        var results = [];
        // 1.e. if no matches, the html string contains no result
        if ( data.length ) {
            // 1.d. loop through all the matches and build an html string
            //      holding the results.
            for ( var i = 0; i < data.length; i++ ) {
                if ( i == 0 ) {
                    html = '<div class="country highlighted">' + data[ i ] + '</div>';
                    results.push( html );
                } else if ( i >= 1 || i < data.length ) {
                    html = '<div class="country">' + data[ i ] + '</div>';
                    results.push( html );
                }
            }
        } else {
            html = '<div class="no-results"> no results... </div>';
            results.push( html );
        }
        displayOptions( results );
    }


    // SELECT
    function select( event ) {
        event.stopPropagation();
        // verify if an highlighted element exist, if it does removeClass.
        $( '.highlighted' ).toggleClass( 'highlighted' );
        // 1.a. when mouse add highlight class to result
        $( event.target ).toggleClass( 'highlighted' );
        // when the pointer is moved away...
        $( event.target ).mouseleave( function ( e ) {
            // 2.b. remove highlight class from previously highlighted result
            $( e.target ).toggleClass( 'highlighted' );
            // and detach the mouse leave ev.
            $( e.target ).off( 'mouseleave' );
        } );
    }

    // HANDLEINPUT
    function handleInput( event ) {
        var $selected = $( '.highlighted' );
        event.stopPropagation();
        if ( event.type == 'mousedown' || event.which == 13 ) {
            // 3.a. mouse click - result text appears in the text field
            // 4.c.i. keyDown - highlighted result text appears in the text field
            $input.val( $selected.text() );
            // 3.b. mouse click - result suggestions disappear
            // 4.c.ii. keyDown - result disappear.
            $resultsContainer.hide();
            $selected.toggleClass( 'highlighted' );
        } else if ( event.which == 40 ) {
            // 4.a. keyDown - if the key is arrow down
            if ( $selected.length == 0 ) {
                // 4.a.i. arrow down - if no result is selected, add highlight to
                // first result
                $( '.country' ).first().toggleClass( 'highlighted' );
            } else {
                // 4.a.ii. arrow down - if a result other than the last result
                // is highlighted, remove highlight from highlighted result
                // and add to next
                $selected.toggleClass( 'highlighted' ).next().toggleClass( 'highlighted' );
            }
        } else if ( event.which == 38 ) {
            // 4.b. keyDown - if the key is arrow up
            if ( $selected.length == 0 ) {
                // 4.b.i. arrow up - if no result is selected, add highlight to
                // last result
                $( '.country' ).last().toggleClass( 'highlighted' );
            } else {
                // 4.b.ii. arrow up - if a result other than first is selected,
                // remove highlight from highlighted results and add to previous
                $selected.toggleClass( 'highlighted' ).prev().toggleClass( 'highlighted' );
            }
        }
    }
} );
