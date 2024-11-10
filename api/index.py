from flask import Flask, jsonify , request
import pandas as pd
from io import StringIO
from flask_cors import CORS


app = Flask(__name__)
app.debug = True
CORS(app)

# Sample dataset
# df = pd.read_csv("./data/top_100_parties.csv")

# df = pd.read_csv("./data/indian-national-level-election.csv")
df = pd.read_csv("./data/indian_elections_2014.csv")

# df_top_100 = df.sort_values(by="totvotpoll", ascending=False).head(500)

# df_top_100.to_csv("./data/top_100_parties.csv", index=False)

# df_2014 = df[df['year'] == 2014]

# df_2014.to_csv('indian_elections_2014.csv', index=False)

dic_of_state = {
    "Andhra": "Andhra Pradesh",
    "Arunachal": "Arunachal Pradesh",
    "Assam": "Assam",
    "Bihar": "Bihar",
    "Chhattisgarh": "Chhattisgarh",
    "Goa": "Goa",
    "Gujarat": "Gujarat",
    "Haryana": "Haryana",
    "Himachal": "Himachal Pradesh",
    "Jharkhand": "Jharkhand",
    "Karnataka": "Karnataka",
    "Kerala": "Kerala",
    "Madhya": "Madhya Pradesh",
    "Maharashtra": "Maharashtra",
    "Manipur": "Manipur",
    "Meghalaya": "Meghalaya",
    "Mizoram": "Mizoram",
    "Nagaland": "Nagaland",
    "Odisha": "Odisha",
    "Punjab": "Punjab",
    "Rajasthan": "Rajasthan",
    "Sikkim": "Sikkim",
    "Tamil": "Tamil Nadu",
    "Telangana": "Telangana",
    "Tripura": "Tripura",
    "Uttar": "Uttar Pradesh",
    "Uttarakhand": "Uttarakhand",
    "West": "West Bengal",
    "Andaman": "Andaman & Nicobar Islands",
    "Chandigarh": "Chandigarh",
    "Dadra": "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep": "Lakshadweep",
    "Delhi": "Delhi",
    "Puducherry": "Puducherry",
}

@app.route("/")
def hello():
    return "<p>Working Fine</p>"

@app.route("/api/data-analysis")
def data_analysis():
    total_votes = df.groupby('partyname')['totvotpoll'].sum().reset_index()

    result = total_votes.to_dict(orient='records')
    total_parties = len(result)
    max_votes_party  = max(result, key=lambda x: x['totvotpoll'])
    total_votes = sum(x['totvotpoll'] for x in result)
    analysis = {
        "total_parties": total_parties,
        "max_votes_party": max_votes_party,
        "total_votes": total_votes
    }

    return jsonify({
        "analysis": analysis,
        "data": result
    })

@app.route("/api/candidates-by-state", methods=["GET"])
def candidates_by_state():
    state_name = request.args.get('state')
    print(request)
    
    if not state_name:
        return jsonify({"error": "State name is required"}), 400

    print(state_name)
    state_data = df[df['st_name'].str.startswith(dic_of_state[state_name])]


    if state_data.empty:
        return jsonify({"error": f"No candidates found for state: {state_name}"}), 404

    grouped_data = state_data.groupby(['st_name', 'pc_name']).apply(
        lambda x: x[['cand_name', 'partyname', 'totvotpoll', 'electors']].to_dict(orient='records')
    ).reset_index(name='candidates')

    result = []
    for _, row in grouped_data.iterrows():
        result.append({
            'state': row['st_name'],
            'district': row['pc_name'],
            'candidates': row['candidates']
        })

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
