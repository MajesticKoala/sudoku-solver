$(document).ready(function(){
    $.ajaxSetup({ cache: false });

    $(".sudoku-cell").click(function(){
        //Add animation when clicking
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".number-tray-cell").click(function(){
        //Add number to sudoku cell if empty
        var cellValue = $(this).text();
        $(".selected").text(cellValue);
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
                error: function(request, error){
                    console.log(error)
                },
                success: function (data) {
                    $(this).removeClass("generating");
                    $(this).text("Generate")
                    populateData(data);
                    }
                });
        }
    });
    function populateData(data) {
        sudokuArray = data[0]
        solveArray = data[1]
        console.log(solveArray)
        for (let row = 0; row < sudokuArray.length; row++) {
            for (let column = 0; column < sudokuArray[row].length; column++) {
                //Clear out cell first
                $('#cell'+row+column).text("")
                if (sudokuArray[row][column] != "0") {
                    $('#cell'+row+column).text(sudokuArray[row][column])
                }
            }
        }       
    }
  });