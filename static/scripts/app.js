$(document).ready(function(){
    $.ajaxSetup({ cache: false });

    var sudokuArray;
    var solvedArray;

    sudokuArray = [[0,0,0,0,0,0,0,0,4],[0,1,2,6,0,0,7,0,0],[9,0,8,0,0,1,0,0,6],[0,0,0,3,0,4,2,9,0],[0,0,6,0,0,9,0,0,7],[5,0,4,0,0,0,6,3,0],[0,8,0,0,0,0,0,6,0],[0,3,0,0,8,2,0,0,0],[0,0,5,7,0,0,0,0,0]];
    solvedArray = [[7,6,3,2,9,5,8,1,4],[4,1,2,6,3,8,7,5,9],[9,5,8,4,7,1,3,2,6],[8,7,1,3,6,4,2,9,5],[3,2,6,8,5,9,1,4,7],[5,9,4,1,2,7,6,3,8],[1,8,7,9,4,3,5,6,2],[6,3,9,5,8,2,4,7,1],[2,4,5,7,1,6,9,8,3]];

    populateData();


    $(".sudoku-cell").click(function(){
        //Add animation when clicking
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".number-tray-cell").click(function(){
        //Add number to sudoku cell if empty
        var cellValue = $(this).text();
        var selectedCell = $(".selected")
        selectedCell.removeClass("incorrect-value")
        selectedCell.text(cellValue);

        //If selected value is wrong
        var cellId = selectedCell.attr("id");
        if (solvedArray[cellId[4]][cellId[5]] != cellValue) {
            selectedCell.addClass("incorrect-value")
        }
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
                    $(this).removeClass("generating");
                    $(this).text("Generate")
                    console.log(error)
                },
                success: function (data) {
                    $(this).removeClass("generating");
                    $(this).text("Generate")
                    sudokuArray = data[0]
                    solvedArray = data[1]
                    populateData();
                    }
                });
        }
    });
    function populateData() {
        console.log(solvedArray)
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