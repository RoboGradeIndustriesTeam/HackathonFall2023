## Запуск сервиса backend
- [Преведущий этап (Клонирование репозиториев)](./3-repo-clone.md)

Перейдём к папке сервиса backend.
```bash
$ cd ~/stateynik/backend
```
Запустим проект одной командой.
```bash
$ docker-compose up -d
```

Пожалуйста в .env укажите VK_CLIENT_ID,VK_CLIENT_SECRET,VK_REDIRECT,YANDEX_CLIENT_ID,YANDEX_CLIENT_SECRET,YANDEX_REDIRECT,JWT_SECRET

Бэкенд будет запущен на порту 3001, продолждим установку.

- [Следующий этап (Запуск сервиса frontend)](./5-frontend.md)
