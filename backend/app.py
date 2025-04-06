from flask import Flask, request, jsonify, render_template_string
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'  # Replace with your MySQL username
app.config['MYSQL_PASSWORD'] = 'Vanshi@001'  # Replace with your MySQL password
app.config['MYSQL_DB'] = 'unisphere'

mysql = MySQL(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Unisphere API!"})

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO users (username, password, role) VALUES (%s, %s, %s)", 
                       (username, password, role))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "User  registered successfully!"})
    
    # Render a simple HTML form for registration
    return render_template_string('''
        <form method="POST">
            <h2>Register</h2>
            Username: <input type="text" name="username" required><br>
            Password: <input type="password" name="password" required><br>
            Role: <input type="text" name="role" required><br>
            <input type="submit" value="Register">
        </form>
    ''')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get form data
        username = request.form['username']
        password = request.form['password']
        
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", 
                       (username, password))
        user = cursor.fetchone()
        cursor.close()
        if user:
            return jsonify({"message": "Login successful!", "role": user[3]})  # Assuming role is the 4th column
        return jsonify({"message": "Invalid credentials!"}), 401
    
    # Render a simple HTML form for login
    return render_template_string('''
        <form method="POST">
            <h2>Login</h2>
            Username: <input type="text" name="username" required><br>
            Password: <input type="password" name="password" required><br>
            <input type="submit" value="Login">
        </form>
    ''')

@app.route('/marks/<int:user_id>', methods=['GET'])
def get_marks(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT subject, mark FROM exam_marks WHERE user_id = %s", (user_id,))
    marks = cursor.fetchall()
    cursor.close()
    return jsonify([{"subject": mark[0], "mark": mark[1]} for mark in marks])

@app.route('/tasks/<int:user_id>', methods=['GET'])
def get_tasks(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT task, completed FROM todo_tasks WHERE user_id = %s", (user_id,))
    tasks = cursor.fetchall()
    cursor.close()
    return jsonify([{"task": task[0], "completed": task[1]} for task in tasks])

@app.route('/fees/<int:user_id>', methods=['GET'])
def get_fees(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT amount, due_date FROM fee_details WHERE user_id = %s", (user_id,))
    fees = cursor.fetchall()
    cursor.close()
    return jsonify([{"amount": fee[0], "due_date": fee[1]} for fee in fees])

if __name__ == '__main__':
    app.run(debug=True)