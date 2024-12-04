from flask import Flask, render_template, request, jsonify

class UserSelection:
    def __init__(self, mood, theme, description):
        self.mood = mood
        self.theme = theme
        self.description = description

# Store selections in memory
user_selections = []

def save_selection(mood, theme, description):
    selection = UserSelection(mood, theme, description)
    user_selections.append(selection)
    return selection

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/transformer')
def transformer():
    return render_template('transformer.html')

@app.route('/knn')
def knn():
    return render_template('knn.html')

@app.route('/results_knn')
def results_knn():
    return render_template('results_knn.html')

@app.route('/save-selection', methods=['POST'])
def handle_selection():
    data = request.json
    mood = data.get('mood')
    theme = data.get('theme')
    description = data.get('description')

    selection = save_selection(mood, theme, description)
    return jsonify({
        'status': 'success',
        'selection': {
            'mood': selection.mood,
            'theme': selection.theme,
            'description': selection.description
        }
    })

@app.route('/generate', methods=['POST'])
def generate():
    # Get the most recent user selection
    if user_selections:
        latest_selection = user_selections[-1]

        # Here you would typically integrate with an AI or recommendation system
        return jsonify({
            "status": "success",
            "message": f"We will generate a song in based on a {latest_selection.mood} mood, in a {latest_selection.theme} theme, described as {latest_selection.description}"
        })
    else:
        return jsonify({
            "status": "error",
            "message": "No selection found"
        })

@app.route('/results')
def results():
    return render_template('results.html')

@app.route('/generate-song', methods=['POST'])
def generate_song():
    data = request.json
    # Here you would typically call your song generation logic
    # For now, we'll just store the data in the session
    session['generated_song'] = {
        'mood': data['mood'],
        'theme': data['theme'],
        'initial_lyrics': data['lyrics'],
        'generated_lyrics': "This is where your generated lyrics would go.\nIt's based on the mood, theme, and initial lyrics provided."
    }
    return jsonify({'success': True})

@app.route('/get-generated-song')
def get_generated_song():
    generated_song = session.get('generated_song', {})
    return jsonify(generated_song)

@app.route('/loader')
def loader():
    return render_template('loader.html')

def get_latest_selection():
    return user_selections[-1] if user_selections else None

if __name__ == '__main__':
    app.run(debug=True)
