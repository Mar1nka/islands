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
        addWater(arr);

        let counterIsland = 0;

        let sizeX = arr[0].length;
        let sizeY = arr.length;

        let bufferRow = [];
        let currentRow = [];

        for(let i = 0; i < sizeX; i++) {
            bufferRow.push(WATER);
            currentRow.push(WATER);
        }

        for(let i = 1; i < sizeY; i++) {

            for(let j = 1; j < sizeX; j++) {
                if(arr[i][j] === ISLAND) {
                    let left = currentRow[j - 1];
                    let top = bufferRow[j];

                    if(left === WATER && top === WATER) {
                        counterIsland++;
                        currentRow[j] = counterIsland;
                    } else if(left !== WATER && top === WATER) {
                        currentRow[j] = left;
                    } else if(left === WATER && top !== WATER) {
                        currentRow[j] = top;
                    } else if(left !== WATER && top !== WATER) {
                        if(left === top) {
                            currentRow[j] = left;
                        } else {
                            counterIsland--;
                            updateBufferRow(bufferRow, top, left);
                        }
                    }
                } else {
                    currentRow[j] = WATER;
                }
            }

            bufferRow = currentRow;
            currentRow = [];

            fillWithWater(currentRow, sizeX);
        }

        return counterIsland;
    }

    function addWater(arr) {
        let zeroArr = [];
        fillWithWater(zeroArr, arr[0].length);

        arr.unshift(zeroArr);

        for(let i = 0; i < arr.length; i++) {
            arr[i].unshift(WATER);
        }
    }

    function fillWithWater(arr, size) {

        for(let i = 0; i < size; i++) {
            arr.push(WATER);
        }
    }

    function updateBufferRow(bufferRow, top, left) {

        for(let i = 0; i < bufferRow.length; i++) {
            if(bufferRow[i] === top) {
                bufferRow[i] = left;
            }
        }
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
