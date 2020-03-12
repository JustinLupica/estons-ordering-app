function populate(s1, s2, s3) {
  var s1 = document.getElementById(s1);
  var s2 = document.getElementById(s2);
  var s3 = document.getElementById(s3);
  s2.innerHTML = "";
  s3.innerHTML = "";
  if (s1.value == "cakes") {
    var optionArray = [
      "|Size",
      "6 inch|6 inch",
      "8 inch|8 inch",
      "10 inch|10 inch",
      "1/2 Sh|1/2 Sh"
    ];
    var flavorArray = [
      "|Flavor",
      "CM|Chocolate Supreme",
      "STR|Strawberries n Cream",
      "LB|Lemon Berry",
      "WCM|White Chocolate Silk",
      "CRSP|Chocolate Raspberry",
      "KL|Key Lime",
      "AZ|Almond Zebra",
      "RR|Raspberry Royale"
    ];
  } else if (s1.value == "cupcakes") {
    var optionArray = [
      "|Size",
      "single|Single",
      "1/2 dozen|1/2 Dozen",
      "dozen|Dozen"
    ];
    var flavorArray = [
      "|Flavor",
      "TC|Triple Chocolate",
      "STR|Strawberry",
      "LK|Lemon Kiss",
      "RV|Red Velvet",
      "RF|Raspberry Forest",
      "WC|White Chocolate",
      "VBC|Vanilla Buttercream",
      "CBC|Chocolate Buttercream"
    ];
  } else if (s1.value == "cheesecakes") {
    var optionArray = [
      "|Size",
      "single slice|Single Slice",
      "whole cheesecake|Whole Cheesecake",
      "sampler|Sampler"
    ];
    var flavorArray = [
      "|Flavor",
      "original|Original",
      "chocolate bliss|Chocolate Bliss",
      "strawberry|Strawberry Chiffon",
      "mixed berry|Mixed Berry",
      "fresh apple|Fresh Apple",
      "buckeye|Buckeye",
      "key lime|Key Lime",
      "cookies n dream|Cookies n Dream",
      "chocolate raspberry|Chocolate Raspberry",
      "mocha mud|Mocha Mud"
    ];
  }
  for (var option in optionArray) {
    var pair = optionArray[option].split("|");
    var newOption = document.createElement("option");
    newOption.value = pair[0];
    newOption.innerHTML = pair[1];
    s2.options.add(newOption);
  }
  for (var option in flavorArray) {
    var flavorPair = flavorArray[option].split("|");
    var newOption2 = document.createElement("option");
    newOption2.value = flavorPair[0];
    newOption2.innerHTML = flavorPair[1];
    s3.options.add(newOption2);
  }
}

function visibility(typeselector, icing) {
  var typeselector = document.getElementById("type").value;
  var icing = document.getElementById("icing");
  if (typeselector == "cupcakes" || typeselector == "cheesecakes") {
    icing.style.visibility = "hidden";
  } else {
    icing.style.visibility = "visible";
  }
}

function fulfillment(drpdwn1, pickupDate, deliveryDate) {
  var drpdwn1 = document.getElementById("pickupOrDelivery").value;
  var pickupDate = document.getElementById("pickupDate");
  var deliveryDate = document.getElementById("deliveryDate");
  var pickupLabel = document.getElementById("pickupLabel");
  var deliveryLabel = document.getElementById("deliveryLabel");

  if (drpdwn1 == "pickup") {
    deliveryDate.style.visibility = "hidden";
    deliveryLabel.style.visibility = "hidden";
    pickupDate.style.visibility = "visible";
    pickupLabel.style.visibility = "visible";
  } else if (drpdwn1 == "delivery") {
    pickupDate.style.visibility = "hidden";
    pickupLabel.style.visibility = "hidden";
    deliveryDate.style.visibility = "visible";
    deliveryLabel.style.visibility = "visible";
  }
}
