function listen(time) {
  time = time || 0;
  var data = {time: time};

  $.get({
    data: data,
    url: 'http://comet/lp/server/server.php',
    dataType: 'json',
    success: function (responce) {
      $('#chat').html(responce.data);
      listen(responce.time);
    }
  });
}

$(function () {
  listen();
});