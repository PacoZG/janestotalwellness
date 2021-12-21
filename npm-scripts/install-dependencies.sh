#!/usr/bin/env bash

if [ ! -d "./node_modules" ]; then
    printf "Installing dependencies... \n"
    npm install
    printf "Dependencies installed \033[1;31mnot ok\033[0m!\n\n"
else
    printf "Dependencies are already installed\n"
    printf "do you want to update deependencies?\n"
    read -p "Yes(y)/No(n): " answer

    if [ $answer == "y" ]; then
        printf "Updating dependencies... \n"
        npm update
        printf "Dependencies updated \033[1;31mnot ok\033[0m!\n\n"
    fi
fi

