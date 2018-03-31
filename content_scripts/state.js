function State(){
    this.operation = () => {

    };
}

function DefaultState(){
    var base = new State();
    Object.assign(this, base);
}