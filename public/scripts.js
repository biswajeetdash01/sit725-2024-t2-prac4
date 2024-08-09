$(document).ready(function() {
  $('#contactForm').on('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting via the browser
      
      const formData = {
          name: $('#name').val(),
          email: $('#email').val(),
          message: $('#message').val()
      };
      
      $.ajax({
          type: 'POST',
          url: '/contact',
          data: JSON.stringify(formData),
          contentType: 'application/json',
          success: function(response) {
              alert('Contact saved successfully!');
              $('#contactForm')[0].reset(); // Reset form after successful submission
          },
          error: function(error) {
              alert('Error saving contact: ' + error.responseText);
          }
      });
  });
});
