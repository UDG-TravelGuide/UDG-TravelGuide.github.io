const params = new URLSearchParams(window.location.search);

let hidePassword = true;
let nextToken = false;
let token = '';
let newPassword = '';
let newPasswordConfirm = '';

$('#alert-password').hide();

for (const p of params) {
    if (p != null && p != undefined && p.length == 2) {
        if (p[0] == 'token') {
            token = p[1];
        }
    }
}

function changeNewPasswordInput(value) {
    newPassword = value;

    $('#alert-password').hide();
}

function changeNewPasswordConfirm(value) {
    newPasswordConfirm = value;

    $('#alert-password').hide();
}

function hideOrShowPassword() {
    const blackRGB = 'rgb(0, 0, 0)';

    const eyeLink1 = $('#eye-link-1').css('color');
    const eyeLink2 = $('#eye-link-2').css('color');

    if (eyeLink1 == blackRGB && eyeLink2 == blackRGB) {
        $('#eye-link-1').css({
            "color": "#0d6efd"
        });

        $('#eye-link-2').css({
            "color": "#0d6efd"
        });

        $('#newPassword').attr('type', 'text');
        $('#newPasswordConfirm').attr('type', 'text');
    } else {
        $('#eye-link-1').css({
            "color": blackRGB
        });

        $('#eye-link-2').css({
            "color": blackRGB
        });

        $('#newPassword').attr('type', 'password');
        $('#newPasswordConfirm').attr('type', 'password');
    }
}

function sendRecoverPassword() {

    if (newPassword != null && newPassword != undefined &&
        newPassword == newPasswordConfirm && newPassword.length > 0) {
        
        $.ajax({
            url: `https://travelguideuserapi.herokuapp.com/auth/newPassword?token=${ token }`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "password": newPassword
            }),
            processData: false,
            success: function( data, textStatus, jQxhr ) {
                console.log('DATA', data, textStatus, jQxhr);
            },
            error: function( jqXhr, textStatus, errorThrown ) {
                console.log( errorThrown );
            }
        }); 

    } else {
        $('#alert-password').show();
    }

}