$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $(".sudoku-cell").click(function(){
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
    
    $("#generate-button").click(function(){
        if (!$(this).hasClass("generating")) {
            $(this).addClass("generating");
            $(this).text("Generating...")
            $.ajax({
                type : "POST",
                url : '/generate-sudoku',
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    console.log(data);
                    $(this).removeClass("generating");
                    $(this).text("Generate")
                    populateData(data);
                    }
                });
        }
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