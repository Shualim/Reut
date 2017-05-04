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

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn && !window.sessionStorage.getItem('wasLoggedIn')
        && !window.sessionStorage.getItem('EventsInserted')) {
        window.sessionStorage.setItem('wasLoggedIn', true);
        authorizeButton.style.display = 'none';
        // getScheduleFromServer();
        insertEvent();
    }
    else if (window.sessionStorage.getItem('wasLoggedIn')){
        if ( window.sessionStorage.getItem('EventsInserted')) { // case of was logged in in current session and events inserted
            successModal("Calendar Updated Successfuly");
        }
        else { // case of insertion fail but login success
            failureModal({message: 'Insertion of events failed'});
        }
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

function getScheduleFromServer(userID) {


    var foo = '{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}';
    JSON.parse(foo, function(key, value) {});

    var response = '{"userId" :"305685406", "name" : "tomer", "schedule" : [{"name": "therapy", "date": "12-01-2017", "start":"12:00", "end": "16:00", "location":"therapy room", "therapistName":"Ilana"}, {"name": "therapy2", "start":"15:00", "end": "18:00", "location":"therapy room", "therapistName":"Ilana"}]}'
    var events = JSON.parse(response).schedule;
    events.forEach(insertEvent);
}

function ListEvents() {

}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function insertEvent(event) {
    // // var date = event.date;
    // var date = '21/03/2017';
    // var startTime = '15:00';
    // var endTime = '18:00';
    // var location = 'Daniel Hotel, Herzelia';
    // var eventName = 'Hackathon';
    // date = date.split('/');
    // var gmtTimeZone = date.indexOf('GMT')+3;
    // var start = {}; var end = {};
    // var parseDate = function(time) {
    //     debugger;
    //     return date[2] + '-' + date[1] + '-' + date[0] + 'T' + time + ':00' + gmtTimeZone + ':00';
    // };
    // gmtTimeZone = date.substring(gmtTimeZone, gmtTimeZone + 3);
    // start.dateTime = parseDate(startTime);
    // end.dateTime = parseDate(endTime);

     console.log('inserting events!');

    var event2 = {
        'summary': 'Hackathon',
        'location': 'Daniel Hotel, Herzelia',
        'description': 'Winning at least second place',
        'start': {
            'dateTime': '2017-05-10T09:00:00+02:00',
            'timeZone': 'Asia/Jerusalem'
        },
        'end': {
            'dateTime': '2017-05-10T17:00:00+02:00',
            'timeZone': 'Asia/Jerusalem'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
        ],
        'attendees': [
            {'email': 'danielle611@example.com'},
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
            ]
        }
    };

    var request = gapi.client.calendar.events.insert({
        'calendarId': 'pkgiq4dasdasdas2321312312.com',
        'resource': event2
    });

    request.execute(function(resp) {
        if (resp.error) {
            failureModal(resp.error);
        }
        else {
            window.sessionStorage.setItem('EventsInserted', true);
            successModal(resp)
        }
    });
}

function successModal(resp) {
    console.log('Events created: ', resp);
}

function failureModal(error) {
    console.log('FAILLL, reaseon: ', error.message);
}
