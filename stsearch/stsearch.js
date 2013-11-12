var datas = {};
var allrecords = null;
var nextindex = 0;

var load_allrecords = function() {
  if (allrecords) return;

  $.getJSON('./records.json', function(data) {
    allrecords = data['records'];
    load_index(0, function() {});
  });
};

var load_index = function(index, func) {
  if (index >= allrecords.length) return;
  var source = allrecords[index];

  if (source in datas == false) {
    $.getJSON('./data/' + source, function(data) {
      datas[source] = data['records'];
      nextindex++;
      if (index == 0) {
        $('#keyword').focus();
      }
      func();
    });
  }
};

var render_index = function(index) {
  var data = datas[allrecords[index]];
  $('#content').append('<ul>');
  for (var i=0; i < data.length; i++) {
    var d = data[i];

    html = '<li>' + d['title'] + '</li>';
    $('#content').append(html);
  }
  $('#content').append('</ul>');
};

var search_next = function(keyword) {
  if (nextindex >= allrecords.length) return;
  load_index(nextindex, function () {
    search_in_index(keyword, nextindex-1);
    $('#keyword').focus();
  });
}

var search_in_index = function(keyword, index) {
  if (!allrecords[index]) return;
  var records = datas[allrecords[index]];
  var pt = RegExp(keyword, "i");

  for (var i=0; i < records.length; i++) {
    var record = records[i];
    if (pt.test(record['title'])) {
      $('#results').append('<p><a href="' + record['url'] + '" target="_blank">' + record['title'] + '</a> - ' + record['vendor'] + '</p>');
    }
  }

  if (nextindex < allrecords.length) {
    $('#nextbutton').show();
  } else {
    $('#nextbutton').hide();
  }
}

var search = function(keyword) {
  $('#results').html('');
  for (var i=0; i < nextindex; i++) {
    search_in_index(keyword, i);
  }
  $('#keyword').focus();
}
