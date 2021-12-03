$(function(){
 
    $('#uploadBtn').on('click', function(){
        translatedText();
    });
 
});

function translatedText() {
    let form = $('#uploadForm')[0];
    let formData = new FormData(form);

    $.ajax({
        type: 'POST',
        url: '/translation',
        data : formData,
        contentType : false,
        processData : false,
        dataType: "json",
        success: function(res) {
            $('#contentEn').text(res.inputs);
            $('#contentKo').text(res.result);
        },
        error: function(err) {
            console.log(err);
        }
    });
}