## Установка nodejs
- [Преведущий этап (Установка Docker)](./1-docker.md)
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
- [Следующий этап (Кланирование репозиториев)](./3-repo-clone.md)
