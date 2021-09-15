declare function CodeMirror(html: HTMLElement, options?);

let a: number[];
let myCodeMirror;

function onBodyLoad() {
    let editorContainer = document.getElementById("editor-container");
    myCodeMirror = CodeMirror(editorContainer, {
        value:
`let a = range(0, 60);
shuffleArray(a);
a = addGraph(a);

function sleep(duration) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, duration * 1000)
	})
}

async function k() {
	for (let i = a.length; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			if (a[j] > a[j+1]) {
				swap(a, j, j+1);
				await sleep(0.05);
			}
		}
	}
}

k();`,
        theme: 'monokai',
        indentWithTabs: true,
        indentUnit: 4,
        lineNumbers: true,
    });
}

function runCode() {
    let source = myCodeMirror.getValue();
    console.log("%cExecuting code!", "font-size: 2em; color: red;");
    let retVal = eval(source);
    console.log("%cReturn value: ", "font-size: 1.25em; color: blue;", retVal);
}

// Array helpers
function swap(array: any[], i: number, j: number) {
    [array[i], array[j]] = [array[j], array[i]];
}

function range(start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Graph visualisation

function addGraph(array: number[]): number[] {
    let min = Math.min(...array) - 1;
    let max = Math.max(...array);

    let container = document.createElement("div");
    container.classList.add("graph");
    for (let i = 0; i < array.length; i++) {
        let box = document.createElement("div");
        box.style.height = `${100*(array[i] - min) / (max - min)}%`;
        container.append(box);
    }

    let section = document.getElementById("visualiser-container");
    section.append(container);

    let proxy = new Proxy(array, {
        set: function (array, index, value, receiver): boolean {
            if (typeof(value) !== "number") {
                throw "Value in assignment must be a number.";
            }
            array[index] = value;

            let box = <HTMLElement>container.children[index];
            box.style.height = `${100 * (value - min) / (max - min)}%`;
            
            return true;
        },
        // get: function (target, property, receiver) {
        //     // TODO: Implement this.
        // }
    });

    return proxy;
}