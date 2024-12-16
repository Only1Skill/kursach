from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import psycopg2

app = Flask(__name__)
app.secret_key = 'admin'  # Обязательно измените его на более надежный
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Подключение к базе данных PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        host="db",
        database="courses_db",
        user="postgres",
        password="example"
    )
    return conn

class User(UserMixin):
    def __init__(self, id, username):
        self.id = id
        self.username = username

@login_manager.user_loader
def load_user(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE id = %s;', (user_id,))
    user = cursor.fetchone()
    conn.close()
    if user:
        return User(user[0], user[1])
    return None

@app.route('/')
def index():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT name FROM courses;')
    courses = cursor.fetchall()
    conn.close()
    return render_template('index.html', courses=courses, current_user=current_user)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute('INSERT INTO users (username, password) VALUES (%s, %s);', (username, hashed_password))
            conn.commit()
        except Exception as e:
            flash('Ошибка при регистрации. Возможно, пользователь с таким именем уже существует.')
            return redirect(url_for('register'))
        finally:
            conn.close()

        flash('Вы успешно зарегистрированы! Теперь вы можете войти в систему.')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = %s;', (username,))
        user = cursor.fetchone()
        conn.close()

        if user and bcrypt.check_password_hash(user[2], password):
            user_obj = User(user[0], user[1])
            login_user(user_obj)
            return redirect(url_for('index'))
        flash('Неверное имя пользователя или пароль.')

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Вы вышли из системы.')
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
