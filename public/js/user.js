function viewProfile(id) {
  var form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '/loadProfile');
  form.setAttribute('id', 'hiddenForm');
  form.style.display = 'hidden';
  document.body.appendChild(form);

  var input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "memberId");
  input.setAttribute("value", id);

  //append to form element that you want .
  document.getElementById("hiddenForm").appendChild(input);

  form.submit();
}

$(function() {
  $('#findByName').on('keyup', function(e) {
    if (e.keyCode == 13) {
      //$('#tableMembers tbody').remove();
      var parameters = {
        name: $(this).val().toUpperCase()
      };
      $.ajax('/getMembersByName', {
        data: parameters,
        statusCode: {
          200: function(data) {
            console.log(data);
            var rows = "";
            for (var i = 0; i < data.length; i++) {
              rows += "<td>" + data[i].name + "</td>";
              rows += "<td>" + data[i].dadLastName + "</td>";
              rows += "<td>" + data[i].momLastName + "</td>";

              var button = '<button class="btn btn-lg btn-primary" type="button"';
              button += 'onclick="viewProfile(\'' + data[i].membership.memberId + '\')" >Profile</button>';
              rows += "<td>" + button + "</td>";
            }
            $('#tableMembers > tbody').remove();
            $('#tableMembers').append($('<tbody>'));
            $('#tableMembers > tbody:last-child')
              .append('<tr>' + rows + '</tr>');
          },
          204: function(data) {
            $('#tableMembers > tbody').remove();
          }
        }
      });
    };
  });
});

//function signIn(){
$(function(){
  var parameters = {
    email: $('#email').val(),
    password: $('#password').val()
  }
  $('#submitButton').on('click',function(){
    console.log("SessionLog");
    $.ajax({
      url: "/signin",
      type: 'POST',
      data: parameters,
      statusCode: {
          200: function(data) {
            console.log(token);
            var token = data.token;
            sessionStorage.setItem("token",token);
            $('#infoMessage').val(data.message);
          },
          403: function(data) {
            //USUARIO NO EXISTE
            $('#infoMessage').val(data.message);
          },
          404: function(data) {
            //USUARIO NO EXISTE
            $('#infoMessage').val(data.message);
          },
          500: function(data) {
            //ERROR
            $('#infoMessage').val(data.message);
          }
      },
      //contentType: 'application/json',
      async: true
    });
  });
});
