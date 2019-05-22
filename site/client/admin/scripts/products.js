addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  uploadFile();
}

function uploadFile(){

    var form = document.getElementById('file-form');
    var fileSelect = document.getElementById('file-select');
    var uploadButton = document.getElementById('upload-button');

    form.onsubmit = function(event) {
      event.preventDefault();

      // Update button text.
      uploadButton.innerHTML = 'Uploading...';

      // Get the selected files from the input.
        var files = fileSelect.files;

        // Create a new FormData object.
        var formData = new FormData();

        // Loop through each of the selected files.
        for (var i = 0; i < files.length; i++) {
          var file = files[i];

          // Check the file type.
          if (!file.type.match('image.*')) {
            continue;
          }

          // Add the file to the request.
          formData.append('photos[]', file, file.name);
        }

        // Set up the request.
        var xhr = new XMLHttpRequest();
        // Open the connection.
        xhr.open('POST', 'admin/image_upload', true);

        // Set up a handler for when the request finishes.
        xhr.onload = function () {
          if (xhr.status === 200) {
            // File(s) uploaded.
            uploadButton.innerHTML = 'Upload';
          } else {
            alert('An error occurred!');
          }
        };
        // Send the Data.
        xhr.send(formData);
    }

}

function getHeader() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayHeader;
  q.open("GET", '/admin/frame/get_header', true);
  q.send();
}

function displayHeader() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let header = document.getElementsByTagName("header")[0];
  header.innerHTML = this.responseText;
  pageHeading = header.getElementsByClassName("productsHeader")[0];
  pageHeading.className = "abon-yellow"
}

function getFooter() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", 'admin/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = this.responseText;
}
