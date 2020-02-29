# ssd-ukahoot

Trabajo para la asignatura Seguridad en Sistemas Distribuidos de la Universidad de Cádiz

Consiste en una aplicación web para realizar encuestas inspiradas en la aplicación Kahoot.it original.

Este proyecto contiene un backend que consiste en un API REST realizada en jax-ws y ejecutada en un servidor Tomcat.
También tiene un frontend simple desarrollado en ionic + jQuery a pelo.

Para hacerlo funcionar empaqueta el proyecto backend en un .war: hace falta tomcat 9
El frontend se puede servir en cualquier servidor estático. Durante el desarrollo se ha empleado el servidor http-server de npm.
Está configurado https y algunas movidas más de seguridad... En caso de tener problemas relaja las condiciones desde los xml de configuración del server.

La aplicación funciona mínimamente bien, sin embargo es un churro en muchos sentidos. Este proyecto es totalmente libre, licenciado en GPLv2, por lo que siéntete libre de descargarlo, usarlo, mejorarlo y distribuirlo. 
