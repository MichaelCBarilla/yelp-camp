function previewMultiple(event) {
  document.getElementById("previewContainer").innerHTML = '';
  const images = document.getElementById("image");
  for (i = 0; i < images.files.length; i++) {
      const url = URL.createObjectURL(event.target.files[i]);
      document.getElementById("previewContainer").innerHTML += '<img src="' + url + '">';
  }
}
