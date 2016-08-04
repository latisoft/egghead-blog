

function edit () {
  $('.view').hide()
  $('.edit').show()
}

function cancel () {
  $('.view').show()
  $('.edit').hide()
}

function save () {
  $.ajax('/{{user.username}}', {
    method: 'PUT',
    data: {
      name: $('#name').val(),
      location: {
        street: $('#street').val(),
        city: $('#city').val(),
        state: $('#state').val(),
        zip: $('#zip').val()
      }
    },
    complete: function () {
      cancel()
      location.reload()
    }
  })
}

function del () {
  $.ajax('/{{user.username}}', {
    method: 'DELETE',
    complete: function () {
      location = '/'
    }
  })
}

function add () {
  console.log('new user!!');
}

