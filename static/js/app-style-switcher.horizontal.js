$(function(){function c(){$(".theme-color .theme-item .theme-link").on("click",function(){var i=$(this).attr("data-logobg");$(".topbar .top-navbar .navbar-header").attr("data-logobg",i)})}c();function d(){if($("#main-wrapper").attr("data-navbarbg")=="skin6"){$(".topbar .navbar").addClass("navbar-light");$(".topbar .navbar").removeClass("navbar-dark")}else{}$(".theme-color .theme-item .theme-link").on("click",function(){var i=$(this).attr("data-navbarbg");$("#main-wrapper").attr("data-navbarbg",i);$(".topbar").attr("data-navbarbg",i);$(".topbar .navbar-collapse").attr("data-navbarbg",i);if($("#main-wrapper").attr("data-navbarbg")=="skin6"){$(".topbar .navbar").addClass("navbar-light");$(".topbar .navbar").removeClass("navbar-dark")}else{$(".topbar .navbar").removeClass("navbar-light");$(".topbar .navbar").addClass("navbar-dark")}})}d();function g(){}g();function e(){$(".theme-color .theme-item .theme-link").on("click",function(){var i=$(this).attr("data-sidebarbg");$(".left-sidebar").attr("data-sidebarbg",i)})}e();function f(){$("#sidebar-position").change(function(){if($(this).is(":checked")){$("#main-wrapper").attr("data-sidebar-position","fixed");$(".topbar .top-navbar .navbar-header").attr("data-navheader","fixed")}else{$("#main-wrapper").attr("data-sidebar-position","absolute");$(".topbar .top-navbar .navbar-header").attr("data-navheader","relative")}})}f();function b(){$("#header-position").change(function(){if($(this).is(":checked")){$("#main-wrapper").attr("data-header-position","fixed")}else{$("#main-wrapper").attr("data-header-position","relative")}})}b();function a(){$("#boxed-layout").change(function(){if($(this).is(":checked")){$("#main-wrapper").attr("data-boxed-layout","boxed")}else{$("#main-wrapper").attr("data-boxed-layout","full")}})}a();function h(){$("#theme-view").change(function(){if($(this).is(":checked")){$("body").attr("data-theme","dark")}else{$("body").attr("data-theme","light")}})}h()});