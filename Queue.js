class Queue {
    constructor() {
        this.storage = {};
        this.front = 0;
        this.rear = 0;
    }

    size() {
        if (this.storage[this.rear] === undefined) {
            return 0;
        } else {
            return this.rear - this.front + 1;
        }
    }

    push(value) {
        if (this.size() === 0) {
            this.storage['0'] = value;
        } else {
            this.rear += 1;
            this.storage[this.rear] = value;
        }
    }

    pop() {
        let temp;
        if (this.front === this.rear) {
            temp = this.storage[this.front];
            delete this.storage[this.front];
            this.front = 0;
            this.rear = 0;
        } else {
            temp = this.storage[this.front];
            delete this.storage[this.front];
            this.front += 1;
        }
        return temp;
    }

    // for debug
    print(){
        console.log("Queue Print");
        for(let i = 0; i < this.size(); i++){
            console.log(this.storage[i]);
        }
        console.log("Queue Print End");
    }
}