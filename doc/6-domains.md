## Настройка доменов

- [Преведущий этап (Запуск сервиса frontend)](./5-frontend.md)

### Настройка DNS записей

В данном случае мы будем рассматривать то что вы создали `A` DNS запись на
домене rgit.nosqd.ru и направили её на ваш сервер, без SSL (от DNS провайдера).

### Установка nginx

#### Debian/Ubuntu

```bash
$ apt install nginx
```

#### Other OSes In Progress

### Установка certbot

> certbot - скрипт от lets encrypt позволяющий быстро настроить SSL сертификат

На вашей системе должен быть установлен snapd
([инструкция по установке](https://snapcraft.io/docs/installing-snapd)).

```bash
$ snap install --classic certbot
$ sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### Создание nginx сайта

Используя nano создадим файл `/etc/nginx/sites-available/rgit.nosqd.ru.conf`

```bash
$ sudo nano /etc/nginx/sites-available/rgit.nosqd.ru.conf
```

Вставим этот конфиг (в случае чего замените rgit.nosqd.ru, на своё доменное имя)

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name rgit.nosqd.ru;
    root /var/www/rgit.nosqd.ru/html;
        
    location /api {
        rewrite /api/(.*) /$1  break;
        proxy_pass         http://127.0.0.1:3001;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location / {
        try_files $uri /index.html;
    }
}
```

> Сохраним и выйдем использую Ctrl+S и Ctrl+X

### Включение nginx сайта
Включим nginx сайт
```bash
$ ln -s /etc/nginx/sites-available/rgit.nosqd.ru.conf /etc/nginx/sites-enabled/rgit.nosqd.ru.conf
```

Далее перезапустим nginx
```bash
sudo systemctl restart nginx
```

### Тест запуска backend
Проверим работоспособность backend выполнив curl запрос
```bash
$ curl http://rgit.nosqd.ru/api
```

Мы должны увидеть что-то похожее на:
```json
{"statusCode":404,"timestamp":"2023-10-21T09:05:11.430Z","path":"/","message":"unknown"}
```

### Установка frontend
Перейдём к папке frontend
```bash
$ cd ~/stateynik/frontend
```

Теперь нам нужно скомпилировать frontend
```bash
$ yarn build
```

Скопируем файлы
```bash
$ mkdir -p /var/www/rgit.nosqd.ru/html
$ cp ./dist/* /var/www/rgit.nosqd.ru/html -R
```

### Тест запуска frontend
IN PROGRESS

### Включение SSL 
Запустим certbot, нас попросит выбрать домен куда мы устанавливаем SSL, выбираем наш (`rgit.nosqd.ru`)
```bash
$ certbot --nginx
```

Нас может запросить наш email, указываем его.

### Тест SSL
Откроем (https://rgit.nosqd.ru)[https://rgit.nosqd.ru], мы увидим наш сайт, а так же увидим благополучный замочек показывающй присутствие ssl сертификата.