let Person = (function () {
    function Person() {
        this.hello("你好");
        this.init("抽抽抽");
    }
    Person.prototype.init = function (hobby) {
        this.hobby = hobby;
    };
    Person.prototype.echo = function () {
        return '我就喜欢：' + this.hobby;
    };
    Person.prototype.hello = function (hobby) {
        this.hobby = hobby;
    };
    return Person;
}());
let person = new Person();
let hobby = person.echo();
console.log(hobby);
//# sourceMappingURL=main.js.map