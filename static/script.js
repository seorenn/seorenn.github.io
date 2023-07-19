function toggleToc() {
  var display = document.getElementById("text-table-of-contents").style.display;
  console.log("display = " + display);
  if (display === "none") {
    document.getElementById("text-table-of-contents").style.display = "block";
  } else {
    document.getElementById("text-table-of-contents").style.display = "none";
  }
}
