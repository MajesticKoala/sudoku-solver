import math
import random
import numpy
import time
import sys, os


numbers = numpy.zeros((9,9), dtype=int)
removing = numpy.zeros((9,9), dtype=int)
solved = numpy.zeros((9,9), dtype=int)
prefilled = numpy.zeros((9,9), dtype=int)

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
            solved[x,y] = numbers[x,y]
            removing[x,y] = numbers[x,y]
            
            #Generate prefilled array base on numbers[]
            prefilled[x,y] = 1 if numbers[x,y] > 0 else 0

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
    
    return numbers, solved, prefilled
    #print(end - start)

def initSudoku():
    global numbers, removing, blankCells, solved, prefilled
    blankCells = 0
    numbers = numpy.zeros((9,9), dtype=int)
    removing = numpy.zeros((9,9), dtype=int)
    solved = numpy.zeros((9,9), dtype=int)
    prefilled = numpy.zeros((9,9), dtype=int)
    mix_numbers = list(range(1,10))
    random.shuffle(mix_numbers)

def SolveSudoku():
    global solutions
    solutions = 0
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