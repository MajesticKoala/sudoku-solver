import math
import random
import numpy
import time


numbers = numpy.zeros((9,9), dtype=int)
removing = numpy.zeros((9,9), dtype=int)

#solveThis = [[5,1,7,6,0,0,0,3,4],
#            [2,8,9,0,0,4,0,0,0],
#            [3,4,6,2,0,5,0,9,0],
#            [6,0,2,0,0,0,0,1,0],
#            [0,3,8,0,0,6,0,4,7],
#            [0,0,0,0,0,0,0,0,0],
#            [0,9,0,0,0,0,0,7,8],
#            [7,0,3,4,0,0,5,6,0],
#            [0,0,0,0,0,0,0,0,0]]
         
solveThis = [[5,1,7,6,0,0,0,3,4],
            [2,8,9,0,0,4,0,0,0],
            [3,4,6,2,0,5,0,9,0],
            [6,0,2,0,0,0,0,1,0],
            [0,3,8,0,0,6,0,4,7],
            [0,0,0,0,0,0,0,0,0],
            [0,9,0,0,0,0,0,7,8],
            [7,0,3,4,0,0,5,6,0],
            [0,0,0,0,0,0,0,0,0]]

mix_numbers = list(range(1,10))
random.shuffle(mix_numbers)
cell_orig = list()
solutions = 0

def ifValid(x,y,num):

    #Get valid options for this cell
    for i in range(9):
        if numbers[x,i] == num: #Number in row
            return False
        if numbers[i,y] == num: #Number in column
            return False
        
    cell_orig = [math.floor(x/3)*3,math.floor(y/3)*3]
    for block_x in range(int(cell_orig[0]),int(cell_orig[0]+3)): #Number in Cell
        for block_y in range(int(cell_orig[1]),int(cell_orig[1]+3)):
            if numbers[block_x, block_y] == num:
                return False
    return True

def fillCell(x,y):
    if y == 9 and x == 8:
        return True

    if y > 8:
        x+=1
        y=0
        random.shuffle(mix_numbers)

    for candidate in mix_numbers:
        if ifValid(x,y,candidate):
            numbers[x,y] = candidate

            if fillCell(x,y+1):
                return True
            else:
                if y != 8:
                    numbers[x,y+1] = 0
    return False

#Will not compile print statements in Flask
#def drawSudoku():
#    cellValue = " "
#    for x in range(9):
#        if x == 0:
#            print('-----------------------------------')
#        for y in range(9):
#            if numbers[x,y] == 0:
#                cellValue = " "
#            else:
#                cellValue = numbers[x,y]
#
#            if y == 0:
#                print("| ", cellValue," ", end="")
#            elif (y+1)%9 == 0:
#                print(cellValue, " |")
#            elif (y+1)%3 == 0:
#                print(cellValue, " | ", end="")
#            else:
#                print(cellValue," ", end="")
#        
#        if (x+1)%3 == 0:
#            print('-----------------------------------')

def findNextCell(i,j):
    for x in range(i,9):
        for y in range(j,9):
            if numbers[x,y] == 0:
                return x,y

    for x in range(0,9):
        for y in range(0,9):
            if numbers[x,y] == 0:
                return x,y
    return -1,-1

def solveCell(x,y):
    global solutions
    x,y = findNextCell(x,y)

    if x == -1:
        #drawSudoku()
        #print('\n')
        solutions += 1
        if solutions > 1:
            #print("Multiple Solutions")
            return True
        return False

    if y > 8:
        x+=1
        y=0

    for candidate in range(1,10):
        if ifValid(x,y,candidate):
            numbers[x,y] = candidate

            if solveCell(x,y):
                return True
            else:
                numbers[x,y] = 0
    return False

def removeCells(number):
    for x in range(9):
        for y in range(9):
            removing[x,y] = numbers[x,y]
    removeCount = 0
    failedCount = 0

    while removeCount < number:
        #if time.time() - start > 2:
            #print("Generating took too long")
            #break
        rand_x = random.randrange(9)
        rand_y = random.randrange(9)

        for x in range(9):
            for y in range(9):
                numbers[x,y] = removing[x,y]
        
        if removing[rand_x,rand_y] != 0:
            numbers[rand_x,rand_y] = 0
            if SolveSudoku():
                removeCount+=1
                removing[rand_x,rand_y] = 0
            else:
                for x in range(9):
                    for y in range(9):
                        numbers[x,y] = removing[x,y]
                failedCount+=1
                if failedCount == 20:
                    #print("Too many fails")
                    return False
                    break

    for x in range(9):
        for y in range(9):
            numbers[x,y] = removing[x,y]
    #drawSudoku()


def GenerateSudoku(number, blankCells):
    initSudoku()
    start = time.time()
    for i in range(int(number)):
        if fillCell(0,0):
            pass
    
    removeCells(blankCells)
    end = time.time()
    return numbers
    #print(end - start)

def initSudoku():
    numbers = numpy.zeros((9,9), dtype=int)
    removing = numpy.zeros((9,9), dtype=int)
    mix_numbers = list(range(1,10))
    random.shuffle(mix_numbers)

def SolveSudoku():
    global solutions
    solutions = 0
    #for x in range(9):
        #for y in range(9):
            #numbers[x,y] = solveThis[x][y]
            #numbers[x,y] = solveThis[x][y]
    #drawSudoku()
    if not solveCell(0,0):
        if solutions == 0:
            #print("No solutions for Sudoku")
            return False
        elif solutions == 1:
            #print("Only 1 solutions to Sudoku")
            return True
        else:
            #print(solutions," solutions to Sudoku")
            return False

#if SolveSudoku():
#    drawSudoku()

#GenerateSudoku(1,50)
#print('Row, Column and number. Type 0 to exit')
#incoming = 1
#while incoming != 0:
#    incRow = int(input('Row'))
#    incColumn = int(input('Column'))
#    incNum = int(input('Number'))
#    numbers[incColumn+1,incRow+1] = incNum
#    
#    drawSudoku()