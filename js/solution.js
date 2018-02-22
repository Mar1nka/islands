(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        let arr = map;

        let counterIsland = 0;

        let sizeX = arr[0].length;
        let sizeY = arr.length;

        let topRow = undefined;

        for(let i = 0; i < sizeY; i++) {
            let currentRow = [];
            copyRow(currentRow, arr[i]);

            for(let j = 0; j < sizeX; j++) {

                if(currentRow[j] === ISLAND) {
                    let leftCell = currentRow[j - 1] || WATER;
                    let topCell = topRow ? topRow[j] : WATER;

                    if(leftCell === WATER && topCell === WATER) {
                        // it is start of new island
                        counterIsland++;
                        currentRow[j] = counterIsland;
                    } else if(leftCell !== WATER && topCell === WATER) {
                        // it is continuation of left island
                        currentRow[j] = leftCell;
                    } else if(leftCell === WATER && topCell !== WATER) {
                        // it is continuation of top island
                        currentRow[j] = topCell;
                    } else if(leftCell !== WATER && topCell !== WATER) {
                        // it is intersection of left and top islands

                        if(leftCell === topCell) {
                            // number of left and top islands is the same
                            currentRow[j] = leftCell;
                        } else {
                            // number of left and top islands is not the same
                            // so we should decrease island counter and
                            // update island's numbers
                            counterIsland--;
                            currentRow[j] = leftCell;

                            updateNumberOfIslandCells(topRow, j , topCell, leftCell);
                        }
                    }
                } else {
                    currentRow[j] = WATER;
                }
            }

            topRow = currentRow;
        }

        return counterIsland;
    }

    function copyRow(row, fromRow) {
        for(let k = 0; k < fromRow.length; k++) {
            row[k] = fromRow[k];
        }
    }


    function updateNumberOfIslandCells(row, index, oldValue, newValue) {

        for(let i = index; i < row.length; i++) {
            if(row[i] === oldValue) {
                row[i] = newValue;
            }
        }
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
