class SliderInput {
    static yoffset = 10;
    constructor(name, min, max, value, step) {
        this.name = name;
        this._value = value;
        this.y = SliderInput.yoffset;

        this.slider = createSlider(min, max, value, step);
        this.input = createInput(String(value), 'number');
        createDiv(name).
            position(10, this.y).
            style('text-align', 'right').
            style('width', '40px');
        this.slider.position(60, this.y);
        this.slider.size(150);
        this.input.position(220, this.y);
        this.input.size(60);

        SliderInput.yoffset += 30;
    }

    set value(value) {
        this._value = value;
        this.slider.value(value);
        this.input.value(value);
    }

    set onchange(callback) {
        let cb = (item) => {
            this._value = item.value();
            this.slider.value(this._value);
            this.input.value(this._value);
            callback(this._value);
        }
        this.slider.input(cb.bind(null, this.slider));
        this.input.elt.onblur = cb.bind(null, this.input);
        this.input.elt.onchange = cb.bind(null, this.input);
    }
}