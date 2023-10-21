# Установка

Процесс установки был описан на `Debian 11`, но с некоторыми изменениям может
быть повторён на любом дистрибутиве `linux`, а так же на `windows` и `macos`.

## Установка Docker

### Windows, MacOS

На системах `windows` и `macos` можно установить Docker Desktop c
[официального сайта](https://www.docker.com/get-started/).

### Linux

#### Debian/Ubuntu

```bash
$ apt update
$ apt install docker.io docker-compose
```

#### CentOS

```bash
$ sudo yum install -y yum-utils
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
$ sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### Fedora

```bash
$ sudo dnf -y install dnf-plugins-core
$ sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
$ sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

После установки docker мы можем открыть Docker Desktop на `windows` и `macos`, а
на `linux` системах можем прописать `docker ps`

## Клонирование репозиториев

> На вашей системе должен быть установлен git

```bash
$ mkdir ~/stateynik
$ cd ~/stateynik
$ git clone https://github.com/nosqd/HackathonFall2023.git backend
$ git clone https://github.com/nosqd/HackathonFall2023Web.git frontend
```

## Установка nodejs
### Windows, MacOS
На системах `windows` и `macos` можно установить NodeJS с [официального сайта](https://nodejs.org)

### Linux
Мы рекомендуем использовать [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) для лёгкого управления версиями nodejs

> На вашей системе должен быть установлен curl

Установить nvm можно одной командой
```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Теперь нужно перезапустить bash (или любую вашу shell) для применения изменений 
```bash
$ bash
```

Далее установим LTS (Long Time Support) версию nodejs
```bash
$ nvm install --lts
```

Теперь установим пакетный менеджер `yarn` 
```bash
$ npm i -g yarn
```

Всё вы установили `nodejs`, вы можете приступать к следующему шагу.

## Запуск сервиса backend
Перейдём к папки сервиса backend