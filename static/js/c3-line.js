$(function(){var a=c3.generate({bindto:"#line-chart",size:{height:400},point:{r:4},color:{pattern:["#1e88e5","#00acc1"]},data:{columns:[["option1",30,200,100,400,150,250],["option2",30,120,210,40,50,205]]},grid:{y:{show:!0,stroke:"#ff0"}}});setTimeout(function(){a.load({columns:[["option1",200,150,350,250,330,500]]})},1000),setTimeout(function(){a.load({columns:[["option3",180,250,100,350,240,150]]})},1500),setTimeout(function(){a.unload({ids:"option1"})},2000)});