## Установка Docker

- [Преведущий этап (Начало установки)](./install.md)

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
- [Следующий этап (Установка nodejs)](./2-node.md)