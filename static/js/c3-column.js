$(function(){var a=c3.generate({bindto:"#column-chart",size:{height:400},color:{pattern:["#1e88e5","#343a40","#26c6da"]},data:{columns:[["option1",130,-90,170,90,120,250],["option2",90,150,140,-150,150,50]],type:"bar"},bar:{width:{ratio:0.5}},grid:{y:{show:true}}});setTimeout(function(){a.load({columns:[["option3",50,-45,200,300,-95,100]]})},1000)});