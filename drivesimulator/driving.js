function doDrive() {
  var i = 0;
  var fb = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/user1/coord");
  var drive = [
    [48.187895, 16.345406],
    [48.188568, 16.347337],
    [48.189240, 16.351393],
    [48.190386, 16.353810],
    [48.192045, 16.354518],
    [48.193433, 16.354969],
    [48.194999, 16.354851],
    [48.195786, 16.356493],
    [48.196386, 16.358327],
    [48.196744, 16.359819],
    [48.196971, 16.360703],
    [48.197515, 16.362140],
    [48.198466, 16.363835],
    [48.199110, 16.365048],
    [48.198573, 16.365863],
    [48.198330, 16.367022],
    [48.198323, 16.367751],
    [48.198724, 16.367859]
  ];

  var status = document.getElementById('status');
  function changeCoordinates() {
    fb.set({
      id: 1,
      latitude: drive[i][0],
      longitude: drive[i][1]
    });
    i++;
    status.innerHTML = 'Driving ...' + i;
    window.setTimeout(changeCoordinates, 4000);
  }

  window.setTimeout(changeCoordinates, 4000);
}
