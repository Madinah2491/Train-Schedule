$(document).ready(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxrxNLTvPc9brnANMrKOLu5Sv3_C5GXrc",
    authDomain: "train-schedule-6abc2.firebaseapp.com",
    databaseURL: "https://train-schedule-6abc2.firebaseio.com",
    projectId: "train-schedule-6abc2",
    storageBucket: "train-schedule-6abc2.appspot.com",
    messagingSenderId: "413289603311"
  };
  //config is like a pw
  firebase.initializeApp(config);
  ///turns everything below into on in database
  var database = firebase.database();



  $("#add-trainEntry-btn").on("click", function(event) {
    console.log("we clicked")
    var NewTrain = {
      trainName: $("#inputtrainname").val().trim(),
      destination: $("#inputdestination").val().trim(),
      FirstTrainTime: $("#inputtraintime").val().trim(),
      Frequency: $("#inputfrequency").val().trim(),
    }
  //adds above obj to firebase
  database.ref().push(NewTrain);

  })
  //grabs everything added and puts it on the page w/out refreshing
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val())

  $("#trainsched").append("<tr><td>"+ childSnapshot.val().trainName + "</td>"),
  $("#trainsched").append("<tr><td>"+ childSnapshot.val().destination + "</td>")
  $("#trainsched").append("<tr><td>"+ childSnapshot.val().FirstTrainTime + "</td>")
  $("#trainsched").append("<tr><td>"+ childSnapshot.val().Frequency + "</td>")

  })

    
  //time/momentjs stuff//  
  var Frequency = 15;

  // Time is 12:00 AM
  var firstTime = "12:15";

  // First Time 
  var firstTimeConverted = moment(firstTime, "HH:mm").divide(15, "minutes");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format());

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Minutes Away: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tNextTrain = tFrequency - tRemainder;
  console.log("Next Arrival: " + tNextTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

});