# Используем официальный Python образ
FROM python:3.9

# Устанавливаем системные зависимости для сборки пакетов
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем требования для установки зависимостей
COPY requirements.txt /app/

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект в контейнер
COPY . /app/

# Открываем порт для приложения
EXPOSE 5000

# Запуск веб-сервера Flask
CMD ["python", "app.py"]
