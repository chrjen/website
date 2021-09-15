import numpy as np

board = np.zeros((10,10))
pattern = {
    'rows': [[3], [4], [4,1], [9], [7], [8], [2,4], [3], [3], [2]],
    'cols': [[1,3], [2,4], [6], [5], [5], [5], [5], [2,4], [1,4], [1,2]]
}

print(board)
print(pattern)

print(pattern['rows'])

def Test(board, pattern, index, rowDir):
    i = 0
    for pattern['rows'][index]