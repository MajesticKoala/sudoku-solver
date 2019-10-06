$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $(".sudoku-cell").click(function(){
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
    $(".number-tray-cell").click(function(){
        $(".tray-selected").removeClass("tray-selected");
        $(this).addClass("tray-selected")
    });

    $("#generate-button").click(function(){
        $.ajax({
            type : "POST",
            url : '/generate-sudoku',
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                console.log(data);
                populateData(data);
                }
            });
    });
    function populateData(data) {
        for (let row = 0; row < data.length; row++) {
            for (let column = 0; column < data[row].length; column++) {
                //Clear out cell first
                $('#cell'+row+column).text("")
                if (data[row][column] != "0") {
                    $('#cell'+row+column).text(data[row][column])
                }
            }
        }       
    }
  });