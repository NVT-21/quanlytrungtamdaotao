
document.getElementById('create-course-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const nameInput = document.getElementById('nameCourse');
    const describeInput = document.getElementById('describe');
    const totalSessionInput = document.getElementById('totalSession');
    const tuitionInput = document.getElementById('tuition');
    console.log(nameInput )

    // Get values from form elements
    const nameValue = nameInput.value;
    const describeValue = describeInput.value;
    const totalSessionValue = totalSessionInput.value;
    const tuitionValue = tuitionInput.value;
    // Create FormData object
    const formData = new FormData();
    formData.append('Name', nameValue);
    formData.append('describe', describeValue);
    formData.append('totalSession', totalSessionValue);
    formData.append('tuition', tuitionValue);
    console.log(formData);
    
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    
    // Make a POST request using Axios
    axios.post('http://localhost:3000/course/createCourse', jsonData,{
      withCredentials: true
  })
      .then(response => {
        console.log('Course created successfully:', response.data);
        // Handle success response, e.g., show a success message to the user
      })
      .catch(error => {
        console.error('There was a problem creating the course:', error);
        // Handle error, e.g., show an error message to the user
      });
  });