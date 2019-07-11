# BrowzOS
## Synopsis
BrowzOS is a collection of HTML, JavaScript, PHP & CSS files, assembled into an online operating system template. The goal of this project is to create the semblance of a feature-rich operating system, accessible from within a modern graphical web browser. BrowzOS is distributed under the terms of the GNU GPL v3 & the GNU AGPL v3. Documentation bundled with BrowzOS is ditributed under the terms of the GNU FDL v1.2.

## Features
* Your choice of password-locked or public-access desktop
* Web scripts for use as word processor, spreadsheet, scientific calculator, game & media player applications
* Desktop icons that can be dragged & dropped across the desktop, as well as executed
* A macOS-like icon dock to execute available applications
* A template to enable your own applications

## Requirements
* Any server operating system that can support any web server, PHP & (optionally) any database system
* Any web server (Apache2, Cherokee, nginx, Grumpy, etc.)
* PHP interpreter
* Optionally, any database system (MySQL, SQLite, NoSQL, MariaDB, etc.)

Database support isn't required, unless the applications you wish to add require them (such as web forum software, better password protection & user registration).

## Installation
* Edit desktop/style.css to change the background scheme of the desktop
* Edit desktop/login.php to use any number of user accounts & change their passwords (optional, if using password-locking)
* Follow the example in the sample_app directory to add your own applications
* For the instant messenger application, follow the installation instructions for phpFreeChat
* For any forum software you wish to install, follow their installation procedures

## Attention
### Though this project is very usable, it still lacks a lot of functionality that was intended to be since the project's inception. Feel free to fork this project & help improve it with server-sided read/write access, automatic server-side file detection & other features to make BrowzOS work better.
