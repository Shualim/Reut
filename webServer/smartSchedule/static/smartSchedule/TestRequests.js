
function Daniel() {

    $.get("http://localhost:8000/id=123456789",function(data) {
       console.log('data ', data)
    });
}
Daniel();