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
                }
            });
    });
  });