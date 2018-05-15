class Person {
    hobby: string;
    constructor() {
        this.hello("你好");
        this.init("抽抽抽");

    }
    protected init(hobby: string) {
        this.hobby = hobby;
    }
    echo() {
        return '我就喜欢：' + this.hobby;
    }
    protected hello(hobby: string) {
        this.hobby = hobby;
}

}
let person = new Person();
let hobby = person.echo();
console.log(hobby);