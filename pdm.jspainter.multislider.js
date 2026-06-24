autowatch = 1;

function paint(){
    var sliderColor = box.getattr('slidercolor');
    var trackColor = box.getattr('bgcolor');
    var spacing = box.getattr('spacing');
    var thickness = box.getattr('thickness');
    var orientation = box.getattr('orientation');

    var values = box.getvalueof();
    var size = values.length;
    var range = box.getattr('setminmax');

    for(var i = 0; i < size; i++){
        values[i] = normalize(values[i], range[0], range[1]);
    }
    if(orientation) values = values.map(values = function(values) { return 1 - values;});

    var width = this.box.rect[2] - this.box.rect[0];
    var height = this.box.rect[3] - this.box.rect[1];
    
    var width_ = width;
    var height_ = height;
    if(!orientation){
        var width_ = height;
        var height_ = width;
        mgraphics.translate(0, height);
        mgraphics.rotate(-Math.PI/2);
    }

    post('size', size,'\n');
    post('values', values,'\n');
    post('range', range,'\n');
    post('width', width_,'height',height_,'\n');

    var spaceSlider = width_ / size;

    var handleWidth = spacing / 100 * spaceSlider;
    var handleHeight = thickness / 100 * handleWidth;

    for(var i = 0; i < size; i++){
        var i_ = orientation ? i : size - i -1;
        var x = i * spaceSlider + handleWidth;
        // var y = (1 - values[i_]) * (height_ - handleHeight);
        var y = values[i_] * (height_ - handleHeight);

        //draw underlying tracks
        // mgraphics.set_line_width(3);
        // mgraphics.move_to(x, height);
        // mgraphics.line_to(x, 0);
        // mgraphics.set_source_rgba(trackColor);
        // mgraphics.stroke();

        // draw active tracks
        mgraphics.move_to(x, height / 2);
        mgraphics.line_to(x, y);
        mgraphics.set_source_rgba(sliderColor);
        mgraphics.stroke();

        // draw dot
        x -= handleWidth / 2;
        mgraphics.ellipse(x, y, handleWidth, handleHeight);
        mgraphics.fill();
    }
}

function normalize(x, rlo, rhi){
    rng = rhi - rlo;
    return (x - rlo) / rng;
}