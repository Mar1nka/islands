(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    const darkWaterColor = "#3c66a0";
    const darkIslandColor = "#a28a2c";
    const borderColorDefault = "#eee";
    const borderColorCurrentCell = "red";

    let counterElement = null;


    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    async function visualizeSolution(map) {
        // todo: визуализировать работу алгоритма

        let myMapElement = render(map);
        let outerElement = document.querySelector('.outer');
        outerElement.appendChild(myMapElement);

        let arr = map;
        let counterIsland = 0;
        let sizeX = arr[0].length;
        let sizeY = arr.length;

        for (let i = 0; i < sizeY; i++) {
            let topRow = arr[i - 1];
            let currentRow = arr[i];

            let topRowElement = document.getElementById(`row_${i - 1}`);
            changeElementBackground(topRowElement, '#cfead8');
            await makePause();

            let currentRowElement = document.getElementById(`row_${i}`);
            changeElementBackground(currentRowElement, '#82bd96');
            await  makePause();

            for (let j = 0; j < sizeX; j++) {
                let currentCellElement = document.getElementById(`cell_${i}${j}`);
                changeElementBorderColor(currentCellElement, borderColorCurrentCell);

                await  makePause();

                let leftCellElement = document.getElementById(`cell_${i}${j - 1}`);
                let topCellElement = document.getElementById(`cell_${i - 1}${j}`);

                if (arr[i][j] === ISLAND) {
                    let leftCell = currentRow[j - 1] || WATER;
                    let topCell = topRow ? topRow[j] : WATER;


                    if (leftCell === WATER && topCell === WATER) {
                        changeElementBorderColor(leftCellElement, darkWaterColor);
                        await  makePause();

                        changeElementBorderColor(topCellElement, darkWaterColor);
                        await  makePause();

                        counterIsland++;
                        updateCounterElement(counterIsland);

                        currentRow[j] = counterIsland;
                        currentCellElement.textContent = counterIsland;

                    } else if (leftCell !== WATER && topCell === WATER) {
                        changeElementBorderColor(leftCellElement, darkIslandColor);
                        await  makePause();

                        changeElementBorderColor(topCellElement, darkWaterColor);
                        await  makePause();

                        currentRow[j] = leftCell;
                        currentCellElement.textContent = leftCell;

                    } else if (leftCell === WATER && topCell !== WATER) {
                        changeElementBorderColor(leftCellElement, darkWaterColor);
                        await  makePause();

                        changeElementBorderColor(topCellElement, darkIslandColor);
                        await  makePause();

                        currentRow[j] = topCell;
                        currentCellElement.textContent = topCell;

                    } else if (leftCell !== WATER && topCell !== WATER) {
                        changeElementBorderColor(leftCellElement, darkIslandColor);
                        await  makePause();

                        changeElementBorderColor(topCellElement, darkIslandColor);
                        await  makePause();

                        if (leftCell === topCell) {
                            currentRow[j] = leftCell;
                            currentCellElement.textContent = leftCell;
                            await  makePause();
                        } else {
                            counterIsland--;
                            currentRow[j] = leftCell;
                            currentCellElement.textContent = leftCell;
                            await  makePause();

                            updateCounterElement(counterIsland);
                            updateNumberOfIslandCellsElements(i-1, j, sizeX, topCell, leftCell);
                            updateNumberOfIslandCells(topRow, j , topCell, leftCell);
                            await  makePause();
                        }
                    }

                    changeElementBorderColor(leftCellElement, borderColorDefault);
                    changeElementBorderColor(topCellElement, borderColorDefault);
                    changeElementBorderColor(currentCellElement, borderColorDefault);

                    await  makePause();

                } else {
                    changeElementBorderColor(currentCellElement, borderColorDefault);
                    await  makePause();
                    currentRow[j] = WATER;
                }

                changeElementOpacity(topCellElement, 0.5);
                await  makePause();
            }

            changeElementBackground(topRowElement, 'none');
            changeElementBackground(currentRowElement, 'none');
            await  makePause();
            changeElementOpacity(topRowElement, 0.5);
            await  makePause();
        }

        let lastRowElement = document.getElementById(`row_${sizeY-1}`);
        changeElementOpacity(lastRowElement, 0.5);
    }

    function changeElementOpacity(element, value) {
        if(element) {
            element.style.opacity = value;
        }
    }

    function changeElementBackground(element, color) {
        if(element) {
            element.style.background = color;
        }
    }

    function changeElementBorderColor(element, color) {
        if(element) {
            element.style.borderColor = color;
        }
    }

    function makePause() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 500);
        });
    }

    function updateNumberOfIslandCells(row, index, oldValue, newValue) {

        for (let i = index; i < row.length; i++) {
            if (row[i] === oldValue) {
                row[i] = newValue;
            }
        }
    }

    function updateNumberOfIslandCellsElements(i, index, sizeX, top, left) {
        for (let k = index; k < sizeX; k++) {
            let cellElement = document.getElementById(`cell_${i}${k}`);

            if (cellElement.textContent === `${top}`) {
                cellElement.textContent = left;
            }
        }
    }

    function updateCounterElement(counter) {
        counterElement.textContent = `Count: ${counter}`;
    }


    function createElement(type, className, text, id) {
        var element = document.createElement(type);
        element.className = className;

        if (id) {
            element.id = id;
        }

        if (text) {
            element.innerText = text;
        }

        return element;
    }

    /**
     * Создает визуализацию карты по его схеме
     *
     * @param {number[][]} map карта островов
     * @param {number} count кол-во островов
     * @returns {HTMLElement} HTML элемент
     */
    function render(map) {
        let containerElem = createElement('div', 'visualization-map');
        counterElement = createElement('div', 'visualization-map__result', 'Count: 0');
        let rowElem;
        let type;
        let row;
        let cell;
        let x;
        let y;


        containerElem.appendChild(createElement('div', 'visualization-map__title', 'Visualization'));
        containerElem.appendChild(counterElement);

        for (y = 0; y < map.length; y++) {
            row = map[y];
            rowElem = createElement('div', 'visualization-map__row', false, `row_${y}`);

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                if(cell === WATER) {
                    type = 'water';
                } else if(cell >= ISLAND) {
                    type = 'island';
                } else {
                    type = undefined;
                }

                rowElem.appendChild(
                    createElement('div', 'visualization-map__cell' + ' ' + (type ? 'visualization-map__cell_' + type : ''), false, `cell_${y}${x}`)
                );
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;

})(this);



