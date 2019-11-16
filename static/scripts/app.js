$(document).ready(function(){
    $.ajaxSetup({ cache: false });

    var sudokuArray;
    var solvedArray;
    var prefilledArray;
    var lives = 3;

    //sudokuArray = [[0,0,0,0,0,0,0,0,4],[0,1,2,6,0,0,7,0,0],[9,0,8,0,0,1,0,0,6],[0,0,0,3,0,4,2,9,0],[0,0,6,0,0,9,0,0,7],[5,0,4,0,0,0,6,3,0],[0,8,0,0,0,0,0,6,0],[0,3,0,0,8,2,0,0,0],[0,0,5,7,0,0,0,0,0]];
    sudokuArray = [[0,6,3,2,9,5,8,1,4],[4,1,2,6,3,8,7,5,9],[9,5,8,4,7,1,3,2,6],[8,7,1,3,6,4,2,9,5],[3,2,6,8,5,9,1,4,7],[5,9,4,1,2,7,6,3,8],[1,8,7,9,4,3,5,6,2],[6,3,9,5,8,2,4,7,1],[2,4,5,7,1,6,9,8,3]];

    solvedArray = [[7,6,3,2,9,5,8,1,4],[4,1,2,6,3,8,7,5,9],[9,5,8,4,7,1,3,2,6],[8,7,1,3,6,4,2,9,5],[3,2,6,8,5,9,1,4,7],[5,9,4,1,2,7,6,3,8],[1,8,7,9,4,3,5,6,2],[6,3,9,5,8,2,4,7,1],[2,4,5,7,1,6,9,8,3]];
    prefilledArray = [[0,0,0,0,0,0,0,0,1],[0,1,1,1,0,0,1,0,0],[1,0,1,0,0,1,0,0,1],[0,0,0,1,0,1,1,1,0],[0,0,1,0,0,1,0,0,1],[1,0,1,0,0,0,1,1,0],[0,1,0,0,0,0,0,1,0],[0,1,0,0,1,1,0,0,0],[0,0,1,1,0,0,0,0,0]];


    populateData();


    $(".sudoku-cell").click(function(){
        //Add animation when clicking
        $(".selected").removeClass("selected");
        $(this).addClass("selected");

        //Highlight cells in row/column/block
        var cellId = $(this).attr("id");
        row = cellId[4]
        col = cellId[5]

        $(".highlighted").removeClass("highlighted");

        //Highlight for row and column
        for (let index = 0; index < 9; index++) {
            var $el = $("td[id*='cell" + row + index + "']");
            $el.addClass("highlighted");
            var $el = $("td[id*='cell" + index + col + "']");
            $el.addClass("highlighted");
        }

        //Highlight for block
        cell_orig = [Math.floor(row/3)*3,Math.floor(col/3)*3]
        for (let block_row = cell_orig[0]; block_row < cell_orig[0]+3; block_row++) {
            for (let block_col = cell_orig[1]; block_col < cell_orig[1]+3; block_col++) {
                var $el = $("td[id*='cell" + block_row + block_col + "']");
                $el.addClass("highlighted");
            }
        }
    });

    $(".number-tray-cell").click(function(){
        //Add number to sudoku cell if empty
        var cellValue = $(this).text();
        var selectedCell = $(".selected")
        selectedCell.removeClass("incorrect-value")
        var cellId = selectedCell.attr("id");

        if (!prefilledArray[cellId[4]][cellId[5]]) {
            selectedCell.text(cellValue);

            //If selected value is wrong
            if (solvedArray[cellId[4]][cellId[5]] != cellValue) {
                selectedCell.addClass("incorrect-value");
                lives--;
                //Check if out of lives
                if (lives == 0) {
                    $(".win-overlay").addClass("loser");
                }
            } else {
                //Check if row/column/square completed

                //Check if sudoku completed
                if (
                    $('td').each(function(){
                        if ($(this).val().length == 0) {
                            return 0
                        }
                    })
                ) {
                    $(".win-overlay").addClass("winner");
                }
                
            }
        }
    });

    $("#generate-button").click(function(){
        if (!$(this).hasClass("generating")) {
            $(this).addClass("generating");
            $.ajax({
                type : "POST",
                url : '/generate-sudoku',
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                error: function(request, error){
                    $(this).removeClass("generating");
                    console.log(error)
                },
                success: function (data) {
                    $(this).removeClass("generating");
                    sudokuArray = data[0]
                    solvedArray = data[1]
                    prefilledArray = data[2]
                    console.log(prefilledArray)
                    populateData();
                    }
                });
        }
    });
    function populateData() {
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