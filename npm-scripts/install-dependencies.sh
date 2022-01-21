#!/usr/bin/env bash

if [ ! -d "./node_modules" ]; then
    printf "Installing dependencies...\n"
    npm install
    printf "Dependencies installed \033[1;32mok\033[0m!\n"

else
    printf "Dependencies are already installed\n"
    printf "Would you like to reinstall or update deependencies?\n"
    printf "reinstall: this will remove node_modules folder and reinstall depdendencies\n"
    read -p "r (reinstall) / u (update): " answer

    if [ $answer == "r" ]; then
        printf "Reinstalling dependencies... \n"
        rm -R node_modules
        npm install
        printf "Dependencies have been reinstalled \033[1;32mok\033[0m!\n"
    fi

    if [ $answer == "u" ]; then
        printf "Updating dependencies... \n"
        npm update
        printf "Dependencies have been updated \033[1;32mok\033[0m!\n"
    fi

fi
printf "Would you like to start the project?\n"
read -p "y (yes) / n (no): " start
if [ $start == "y" ]; then
    printf "Initiating local development environment...\n"
    printf "\033[1;32mHappy hacking!\033[0m"
    npm start
fi
