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
      nextarrival: $("#inputtraintime").val().trim(),
      Frequency: $("#inputfrequency").val().trim(),
    }
  //adds above obj to firebase
  database.ref().push(NewTrain);

  })
  //grabs everything added and puts it on the page w/out refreshing
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  //makes appropriate values appear in proper places in table
  $("#trainsched > tbody").append("<tr><td>"+ childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination
   + "</td><td>"+ childSnapshot.val().nextarrival + "</td><td>"+ childSnapshot.val().Frequency + "</td></tr>");

   })

  // //time/momentjs stuff//  
  // var  = $("#inputfrequency").val().trim();

  var firstTime = $("#inputtraintime").val().trim();

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format());

  // First Time 
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(Frequency, "minutes");
  console.log(firstTimeConverted);

  // Difference between the times...we need this to calculate how long until the next train comes
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Minutes Away: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % firstTime;
  console.log(tRemainder);

  // Minute Until Train
  var tNextTrain = firstTime - tRemainder;
  console.log("Next Arrival: " + tNextTrain);

  // Next Train
  var tnextArrival = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(tnextArrival).format("HH:mm"));

});