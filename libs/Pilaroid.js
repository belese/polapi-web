var colors=['seagreen','gold','crimson','mediumslateBlue'];
var order=[];
var id=0;
var qrcode;


function addPersonnage() {
    var color = colors.pop();
    if (color != undefined) {
        addBtnPersonnage(color)
        order.push(color);
    }
}

function addBtnPersonnage(color) {
    var dialogue = [];

    var element = document.createElement("span");

    element.className = "fas fa-user-tie fa-2x ";
    element.style.color= color;
    element.onclick = function() {
        addDialogue(dialogue,color);
    };
    element.ondblclick = function() {
        var foo = document.getElementById("personnage");
        foo.removeChild(element);
        var foo = document.getElementById("dialogue");
        dialogue.forEach(function(element, index, array) {
            foo.removeChild(element);
        });
        dialogue = []
        colors.push(color)
        var index = order.indexOf(color);
        if (index !== -1) order.splice(index, 1);
        getDialoge();
    };
    add(element,"personnage");
    getDialoge();
}

function addDialogue(dialogue,color) {
    var li = document.createElement("li");

    id = id +1;
    li.name = color
    var button = document.createElement("span");
    button.className = "fas fa-comment-alt fa-2x";
    button.style.color= color;
    button.onclick = function()  {
        var foo = document.getElementById("dialogue");
        foo.removeChild(li);
        var index = dialogue.indexOf(li);
        if (index !== -1) dialogue.splice(index, 1);
        getDialoge();
    };
    li.appendChild(button);
    //li.appendChild(button);
    var text = document.createElement("input");
    text.type = "text"
    text.oninput = getDialoge
    li.appendChild(text);
    text.id = 'text'+id;
    li.setAttribute('data-id' , color+'|'+text.id);
    dialogue.push(li);
    add(li,"dialogue");
    getDialoge();

}

function refresh() {
    var a = Sortable.create(dialogue, {
        group: 'dialogue',
        animation: 100,
        onSort : getDialoge
    });
    return a.toArray();

}

function getDialoge()  {
    var sorted = refresh();
    var narrator=document.getElementById("narrator");
    texts="n"+narrator.value
    sorted.forEach(function(element, index, array) {
            var data = element.split('|');
            var faceid = order.indexOf(data[0]);
            var foo = document.getElementById(data[1]);
            var text = encodeURI(foo.value);
            console.log(text);
            texts = texts + "|"  + faceid.toString()+text;
        });

    if (qrcode == undefined) {
     qrcode = new QRCode(document.getElementById("qrcode"))
    }
    qrcode.clear(); // clear the code.
    qrcode.makeCode(texts); // make another code
}

function add(element,id) {
  var foo = document.getElementById(id);
  foo.appendChild(element);
}
