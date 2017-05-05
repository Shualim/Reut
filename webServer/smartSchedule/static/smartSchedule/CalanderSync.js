/**
 * Created by ysayag on 04/05/2017.
 */
    // Client ID and API key from the Developer Console
var CLIENT_ID = '249410764144-9fihc6l2fpgis99r7ulem4o93ad9dpam.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
    });
}

///**
// *  Called when the signed in status changes, to update the UI
// *  appropriately. After a sign-in, the API is called.
// */
//function updateSigninStatus2(isSignedIn) {
//    if (isSignedIn && !window.sessionStorage.getItem('wasLoggedIn')
//        && !window.sessionStorage.getItem('EventsInserted')) {
//        window.sessionStorage.setItem('wasLoggedIn', true);
//        authorizeButton.style.display = 'none';
//         getScheduleFromServer();
//    }
//    else if (window.sessionStorage.getItem('wasLoggedIn')){
//        if ( window.sessionStorage.getItem('EventsInserted')) { // case of was logged in in current session and events inserted
//            successModal("Calendar Updated Successfuly");
//        }
//        else { // case of insertion fail but login success
//            failureModal({message: 'Insertion of events failed'});
//        }
//    }
//}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn && $('#id-input')[0].value != '') {
        authorizeButton.style.display = 'none';
        getScheduleFromServer();
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

//function sleep(milliseconds) {
//    var start = new Date().getTime();
//    while(true) {
//        if ((new Date().getTime() - start) > milliseconds){
//            break;
//        }
//    }
//}

function getScheduleFromServer(userID) {
    //TODO validation for id
    var idValue = $('#id-input')[0].value;
    $.get("http://localhost:63343/id=" + idValue ,function(data) {
        var events = data.schedule;
        for (var i =0 ; i< events.length ; i++) {
            insertEvent(events[i]);
        }
        setTimeout(successModal,2500);
        //events.forEach(insertEvent);
    })
        .fail(function() {
            gapi.auth2.getAuthInstance().signOut();
            failureModal('Request to server failed (possible invalid id)');
        });
}

//function checkWhenDone() {
//    if (!window.didFail){
//        successModal();
//    }
//    else {
//        gapi.auth2.getAuthInstance().signOut();
//        failureModal('Failed to insert modal');
//    }
//}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function insertEvent(eventObj) {
    var event = {
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
            ]
        },
        'start': {},
        'end': {}
    };

    var startTime = eventObj.start;
    var endTime = eventObj.end;
    var date = eventObj.date.split('/');
    var now = Date();
    var gmtTimeZone = Date().indexOf('GMT')+3;
    var parseDate = function(time) {
        return date[2] + '-' + date[1] + '-' + date[0] + 'T' + time + ':00' + gmtTimeZone + ':00';
    };
    gmtTimeZone = now.substring(gmtTimeZone, gmtTimeZone + 3);
    event.start.dateTime = parseDate(startTime);
    event.end.dateTime = parseDate(endTime);
    event.summary = eventObj.name + ' - ' + eventObj.therapistName;
    event.location = eventObj.location;
    event.start.timeZone = 'Asia/Jerusalem';
    event.end.timeZone = 'Asia/Jerusalem';

    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });

    request.execute(function(resp) {
        gapi.auth2.getAuthInstance().signOut();
        if (resp.error) {
            failureModal(resp.error.message);
        }
    })
    ;
}

function successModal() {
    $("#successModal").modal();
    //console.log('Success Event created');
}

function failureModal(errorMessage) {
    console.log('event insertsion failed', errorMessage);
}

